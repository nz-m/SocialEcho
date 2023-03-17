const readline = require("readline");
const mongoose = require("mongoose");
const User = require("../models/User");
const Community = require("../models/Community");

// Set up the readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
mongoose.set("strictQuery", false);
// Connect to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/db_socialecho", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    start();
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
    process.exit(1);
  });

async function start() {
  try {
    // Get the moderators from the database
    const moderators = await User.find({ role: "moderator" });

    // Prompt the user to choose a moderator to add
    const modChoice = await promptUserChoice(
      "Which moderator would you like to add? (enter the number)",
      moderators.map((mod, index) => `${index + 1}. ${mod.email}`)
    );

    const moderatorToAdd = moderators[modChoice - 1];
    if (!moderatorToAdd) {
      console.error("Error: Moderator not found.");
      return;
    }

    // Get the community names from the database
    const communities = await Community.find({}, { name: 1, _id: 0 });
    const communityNames = communities.map((community) => community.name);

    // Prompt the user to choose a community to add the moderator to
    const communityName = await promptUserInput(
      "Which community would you like to add the moderator to?",
      communityNames
    );

    const chosenCommunity = await Community.findOne({ name: communityName });

    // Check if the community exists
    if (!chosenCommunity) {
      console.error(
        `Error: Community does not exist. Choose a valid community.`
      );
      process.exit(1);
    }

    // Check if the chosen moderator is already a moderator of the community
    if (
      chosenCommunity.moderators.length > 0 &&
      chosenCommunity.moderators.includes(moderatorToAdd._id)
    ) {
      console.error(
        `${moderatorToAdd.email} is already a moderator of ${communityName}`
      );
      process.exit(1);
    }
    // Add the moderator to the community
    await Community.findOneAndUpdate(
      { name: communityName },
      {
        $addToSet: {
          moderators: moderatorToAdd._id,
          members: moderatorToAdd._id,
        },
      },
      { new: true }
    );

    console.log(
      `${moderatorToAdd.email} added as a moderator and member of ${communityName}`
    );

    rl.close();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

// Prompt the user for input
function promptUserInput(promptText, options) {
  return new Promise((resolve) => {
    if (options && options.length > 0) {
      console.log("Select an option:");
      options.forEach((option, index) =>
        console.log(`${index + 1}. ${option}`)
      );
    }
    rl.question(`${promptText} `, (answer) => {
      const communityName = options[parseInt(answer) - 1];
      resolve(communityName);
    });
  });
}

async function promptUserChoice(prompt, choices) {
  return new Promise((resolve, reject) => {
    rl.question(`${prompt}\n${choices.join("\n")}\n`, (answer) => {
      const choiceIndex = parseInt(answer, 10) - 1;
      if (
        isNaN(choiceIndex) ||
        choiceIndex < 0 ||
        choiceIndex >= choices.length
      ) {
        reject(new Error("Invalid choice"));
      } else {
        resolve(choices[choiceIndex].split(". ")[0]);
      }
    });
  });
}
