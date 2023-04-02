const readline = require("readline");
const mongoose = require("mongoose");
const User = require("../models/User");
const Community = require("../models/Community");
const kleur = require("kleur");
const LOG = console.log;

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
    LOG(kleur.green().bold("✅ Connected to MongoDB"));
    start();
  })
  .catch((err) => {
    LOG(kleur.red().bold("❌ Error connecting to database" + err.message));
    process.exit(1);
  });

async function start() {
  try {
    // Get the community names from the database
    const communities = await Community.find({}, { name: 1, _id: 0 });
    const communityNames = communities.map((community) => community.name);

    // Prompt the user to choose a community to remove the moderator from
    const communityName = await promptUserInput(
      kleur
        .yellow()
        .bold("Which community would you like to remove the moderator from?"),

      communityNames
    );

    const chosenCommunity = await Community.findOne({ name: communityName });

    // Check if the community exists
    if (!chosenCommunity) {
      LOG(kleur.red().bold("❌ Error! Community does not exist."));
      process.exit(1);
    }

    // Check if the community has any moderators
    if (chosenCommunity.moderators.length === 0) {
      LOG(kleur.red().bold("❌ Error! Community has no moderators."));
      process.exit(1);
    }

    // Get the moderators of the community
    const moderators = await User.find(
      { _id: { $in: chosenCommunity.moderators } },
      { email: 1, name: 1 }
    );

    // Prompt the user to choose a moderator to remove
    const modChoice = await promptUserChoice(
      kleur
        .white()
        .bold("Which moderator would you like to remove? (Enter the number)"),
      moderators.map((mod, index) => `${index + 1}-${mod.name} ${mod.email}`)
    );

    const moderatorToRemove = moderators[modChoice - 1];

    if (!moderatorToRemove) {
      LOG(kleur.red().bold("❌ Error! Moderator not found."));
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
    LOG(kleur.green().bold("✅ Done! Moderator removed successfully!"));
    rl.close();
    process.exit(0);
  } catch (err) {
    LOG(kleur.red().bold(err.message));
    process.exit(1);
  }
}

// Prompt the user for input
function promptUserInput(promptText, options) {
  return new Promise((resolve) => {
    if (options && options.length > 0) {
      LOG(kleur.yellow().bold(promptText));
      options.forEach((option, index) =>
        LOG(kleur.yellow().bold(`${index + 1}. ${option}`))
      );
    }
    rl.question(`${promptText}>`, (input) => {
      if (options && options.length > 0) {
        const index = parseInt(input) - 1;
        if (isNaN(index) || index < 0 || index >= options.length) {
          LOG(kleur.red().bold("❌ Error! Invalid choice. Please try again."));
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
        reject(new Error("❌ Error! Invalid choice"));
      } else {
        resolve(choices[choiceIndex].split("-")[0]);
      }
    });
  });
}
