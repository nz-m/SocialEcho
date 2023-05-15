require("dotenv").config();
const mongoose = require("mongoose");
const Community = require("../models/community.model");
const ModerationRule = require("../models/rule.model");
const communities = require("../data/communities.json");
const rules = require("../data/moderationRules.json");
const kleur = require("kleur");
const LOG = console.log;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    LOG(kleur.green().bold("✅ Connected to MongoDB"));

    const existingRules = await ModerationRule.find({}, { rule: 1 });

    const existingRuleNames = existingRules.map((r) => r.rule);

    const newRules = rules.filter(
      (rule) => !existingRuleNames.includes(rule.rule)
    );

    const newRulesCount = newRules.length;
    if (newRulesCount > 0) {
      await ModerationRule.insertMany(newRules);
      LOG(
        kleur
          .green()
          .bold(
            `✅ Done! Added ${kleur
              .yellow()
              .bold(newRulesCount)} new rules to the database`
          )
      );
    } else {
      LOG(
        kleur
          .yellow()
          .bold(
            `⚠️ Warning: All moderation rules already exist in the database`
          )
      );
    }

    const existingCommunities = await Community.find({}, { name: 1 });

    const existingCommunityNames = existingCommunities.map((c) => c.name);

    const newCommunities = communities.filter(
      (community) => !existingCommunityNames.includes(community.name)
    );

    const newCommunitiesCount = newCommunities.length;
    if (newCommunitiesCount > 0) {
      await Community.insertMany(newCommunities);
      LOG(
        kleur
          .green()
          .bold(
            `✅ Done! Added ${kleur
              .yellow()
              .bold(newCommunitiesCount)} new communities to the database`
          )
      );
    } else {
      LOG(
        kleur
          .yellow()
          .bold(`⚠️ Warning: All communities already exist in the database`)
      );
    }

    mongoose.connection.close();
  } catch (error) {
    LOG(kleur.red().bold(`Error! ${error.message}`));
    process.exit(1);
  }
};

connectDB();
