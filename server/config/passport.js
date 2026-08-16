require("dotenv").config();
const User = require("../models/user.model");
const Token = require("../models/token.model");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ email: jwt_payload.email });

      if (user) {
        const refreshTokenFromDB = await Token.findOne({
          user: user._id,
        });

        if (!refreshTokenFromDB) {
          return done(null, false);
        }

        const refreshPayload = jwt.verify(
          refreshTokenFromDB.refreshToken,
          process.env.REFRESH_SECRET
        );

        if (refreshPayload.email !== jwt_payload.email) {
          return done(null, false);
        }

        const tokenExpiration = new Date(jwt_payload.exp * 1000);
        const now = new Date();
        const timeDifference = tokenExpiration.getTime() - now.getTime();

        if (timeDifference > 0 && timeDifference < 30 * 60 * 1000) {
          const payloadNew = {
            _id: user._id,
            email: user.email,
          };
          const newToken = jwt.sign(payloadNew, process.env.SECRET, {
            expiresIn: "6h",
          });

          return done(null, { user, newToken });
        }
        return done(null, { user });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google account email not available"), false);
        }

        let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

        if (!user) {
          const defaultAvatar =
            "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";

          user = await new User({
            name: profile.displayName || "Google User",
            email,
            password: "",
            avatar: profile.photos?.[0]?.value || defaultAvatar,
            googleId: profile.id,
            authProvider: "google",
            role: email.endsWith("mod.socialecho.com") ? "moderator" : "general",
            isEmailVerified: true,
          }).save();
        } else {
          const needsUpdate =
            !user.googleId ||
            user.authProvider !== "google" ||
            !user.isEmailVerified ||
            (!user.avatar && profile.photos?.[0]?.value);

          if (needsUpdate) {
            user.googleId = user.googleId || profile.id;
            user.authProvider = "google";
            user.isEmailVerified = true;
            if (profile.photos?.[0]?.value) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
