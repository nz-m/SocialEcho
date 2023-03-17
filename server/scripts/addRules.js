const readline = require("readline");
const mongoose = require("mongoose");
const Community = require("../models/Community");
const ModerationRules = require("../models/ModerationRules");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/db_socialecho", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const getCommunityNames = async () => {
  try {
    const communities = await Community.find({}, { name: 1 });
    return communities.map((c) => c.name);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const getModerationRules = async () => {
  try {
    const rules = await ModerationRules.find();
    return rules;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const promptCommunityName = async () => {
  const communityNames = await getCommunityNames();
  return new Promise((resolve) => {
    rl.question(
      `Enter a community name (${communityNames.join("/")}/all): `,
      (answer) => {
        if (answer === "all" || communityNames.includes(answer)) {
          resolve(answer);
        } else {
          console.log(
            `Invalid community name. Please enter one of the following: ${communityNames.join(
              "/"
            )}/all`
          );
          promptCommunityName();
        }
      }
    );
  });
};

const promptConfirmation = async (communityName, rules) => {
  const ruleIds = rules.map((r) => r._id);
  return new Promise((resolve) => {
    rl.question(
      `Do you want to add the following rules to ${communityName}? (y/n)\n${JSON.stringify(
        ruleIds,
        null,
        2
      )}\n`,
      (answer) => {
        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "n") {
          resolve(answer);
        } else {
          console.log(`Invalid input. Please enter either y or n.`);
          promptConfirmation(communityName, rules);
        }
      }
    );
  });
};

const addRulesToCommunity = async (communityName, rules) => {
  try {
    if (communityName === "all") {
      const communities = await Community.find();
      for (let i = 0; i < communities.length; i++) {
        const community = communities[i];
        await Community.findByIdAndUpdate(
          community._id,
          {
            $addToSet: {
              rules: { $each: rules },
            },
          },
          { new: true }
        );
      }
    } else {
      const community = await Community.findOneAndUpdate(
        {
          name: communityName,
        },
        {
          $addToSet: {
            rules: { $each: rules },
          },
        },
        {
          new: true,
        }
      );
      console.log(`Added rules to ${communityName}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const main = async () => {
  const communityName = await promptCommunityName();
  const rules = await getModerationRules();
  const confirmation = await promptConfirmation(communityName, rules);
  if (confirmation.toLowerCase() === "y") {
    await addRulesToCommunity(communityName, rules);
    console.log("Rules added successfully!");
  } else {
    console.log("Rules not added.");
  }
  process.exit(0);
};

main();