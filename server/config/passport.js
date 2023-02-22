require("dotenv").config();
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ email: jwt_payload.email });

      if (user) {
        const refreshToken = await RefreshToken.findOne({
          user: user._id,
        });

        if (!refreshToken) {
          return done(null, false);
        }

        // Verify the refresh token
        const refreshPayload = jwt.verify(
          refreshToken.token,
          process.env.REFRESH_SECRET
        );

        if (refreshPayload.email !== jwt_payload.email) {
          return done(null, false);
        }

        // Check if the access token has expired
        const tokenExpiration = new Date(jwt_payload.exp * 1000);
        const now = new Date();
        const timeDifference = tokenExpiration.getTime() - now.getTime();

        if (timeDifference > 0 && timeDifference < 5 * 60 * 1000) {
          // Token is about to expire, issue a new one
          const newToken = jwt.sign({ email: user.email }, process.env.SECRET, {
            expiresIn: "1h",
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

