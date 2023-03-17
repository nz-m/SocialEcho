const readline = require("readline");
const mongoose = require("mongoose");
const User = require("./models/User");
const Community = require("./models/Community");

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
    // Get the community names from the database
    const communities = await Community.find({}, { name: 1, _id: 0 });
    const communityNames = communities.map((community) => community.name);

    // Prompt the user to choose a community to remove the moderator from
    const communityName = await promptUserInput(
      "Which community would you like to remove the moderator from?",
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

    // Check if the community has any moderators
    if (chosenCommunity.moderators.length === 0) {
      console.error(`Error: There are no moderators in ${communityName}`);
      process.exit(1);
    }

    // Get the moderators of the community
    const moderators = await User.find(
      { _id: { $in: chosenCommunity.moderators } },
      { email: 1, _id: 0 }
    );

    // Prompt the user to choose a moderator to remove
    const modChoice = await promptUserChoice(
      "Which moderator would you like to remove? (enter the number)",
      moderators.map((mod, index) => `${index + 1}. ${mod.email}`)
    );

    const moderatorToRemove = moderators[modChoice - 1];
    if (!moderatorToRemove) {
      console.error("Error: Moderator not found.");
      return;
    }

    // Remove the moderator from the community
    await Community.findOneAndUpdate(
      { name: communityName },
      {
        $pull: {
          moderators: moderatorToRemove._id,
          members: moderatorToRemove._id,
        },
      },
      { new: true }
    );

    console.log(
      `${moderatorToRemove.email} removed as a moderator and member of ${communityName}`
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
    rl.question(`${promptText}>`, (input) => {
      if (options && options.length > 0) {
        const index = parseInt(input) - 1;
        if (isNaN(index) || index < 0 || index >= options.length) {
          console.error("Invalid choice. Please try again.");
          promptUserInput(promptText, options).then(resolve);
        } else {
          resolve(options[index]);
        }
      } else {
        resolve(input);
      }
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
