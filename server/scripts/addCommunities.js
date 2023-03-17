const mongoose = require("mongoose");
const Community = require("../models/Community");
const ModerationRules = require("../models/ModerationRules");
const communities = require("../data/communities.json");
const rules = require("../data/moderationRules.json");
const kleur = require("kleur");
const LOG = console.log;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/db_socialecho", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", async () => {
  LOG(kleur.green().bold("✅ Connected to MongoDB"));

  try {
    // Insert communities
    const savedCommunities = await Community.insertMany(communities);
    LOG(
      kleur
        .green()
        .bold(
          `✅ Done! ${savedCommunities.length} communities have been saved to database`
        )
    );

    // Insert moderation rules
    const savedRules = await ModerationRules.insertMany(rules);
    console.log(
      `✅ Done! ${savedRules.length} moderation rules have been saved to database`
    );

    db.close();
  } catch (error) {
    if (error.code === 11000) {
      LOG(kleur.yellow().bold("⚠️ Warning: Community already exists"));
    } else {
      LOG(kleur.red().bold("❌ Error! " + error.message));
    }

    db.close();
  }
});
