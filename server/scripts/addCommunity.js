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
    for (let community of communities) {
      // Check if community already exists with the same name
      const existingCommunity = await Community.findOne({
        name: community.name,
      });
      if (existingCommunity) {
        LOG(
          kleur
            .yellow()
            .bold(
              `⚠️ Warning: The community ${kleur
                .white()
                .bold(community.name)} already exists`
            )
        );
      } else {
        // Insert new community
        const savedCommunity = await Community.create(community);
        LOG(
          kleur
            .green()
            .bold(
              `✅ Done! The community ${kleur
                .yellow()
                .bold(savedCommunity.name)} has been saved to database`
            )
        );
      }
    }

    for (let eachRule of rules) {
      // Check if rule already exists with the same name
      const existingRule = await ModerationRules.findOne({
        rule: eachRule.rule,
      });
      if (existingRule) {
        LOG(
          kleur
            .yellow()
            .bold(
              `⚠️ Warning: Rule ${kleur
                .white()
                .bold(eachRule.rule)} already exists`
            )
        );
      } else {
        // Insert new rule
        const savedRule = await ModerationRules.create(eachRule);
        LOG(
          kleur
            .green()
            .bold(
              `✅ Done! The rule ${kleur
                .yellow()
                .bold(savedRule.rule)} has been saved to database`
            )
        );
      }
    }
    db.close();
  } catch (error) {
    LOG(kleur.red().bold(`❌ Error! ${error.message}`));
    db.close();
  }
});
