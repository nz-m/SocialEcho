require("dotenv").config();
const readline = require("readline");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Community = require("../models/community.model");
const kleur = require("kleur");
const LOG = console.log;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    LOG(kleur.green().bold("✅ Connected to MongoDB"));
    start();
  })
  .catch((err) => {
    LOG(kleur.red().bold("Error connecting to database" + err.message));
    process.exit(1);
  });

async function start() {
  try {
    const moderators = await User.find({ role: "moderator" });

    if (moderators.length === 0) {
      LOG(kleur.yellow().bold("No moderators found."));
      process.exit(1);
    }

    const modChoice = await promptUserChoice(
      kleur
        .cyan()
        .bold("Which moderator would you like to add? (Enter the number)"),

      moderators.map((mod, index) => `${index + 1}. ${mod.name} - ${mod.email}`)
    );

    const moderatorToAdd = moderators[modChoice - 1];
    if (!moderatorToAdd) {
      LOG(kleur.red().bold("Error! Moderator not found."));
      return;
    }

    const communities = await Community.find({}, { name: 1, _id: 0 });
    const communityNames = communities.map((community) => community.name);

    const communityName = await promptUserInput(
      kleur
        .cyan()
        .bold(
          "Which community would you like to add the moderator to? (Enter the number)"
        ),

      communityNames
    );

    const chosenCommunity = await Community.findOne({ name: communityName });

    if (!chosenCommunity) {
      LOG(
        kleur
          .yellow()
          .bold(
            `⚠️ Warning: Community does not exist. Please select a valid community.`
          )
      );

      process.exit(1);
    }

    if (
      chosenCommunity.moderators.length > 0 &&
      chosenCommunity.moderators.includes(moderatorToAdd._id)
    ) {
      LOG(
        kleur
          .yellow()
          .bold(
            `⚠️ Warning: ${kleur.white(
              moderatorToAdd.name
            )} is already a moderator of ${kleur.white(
              communityName
            )} community!`
          )
      );

      process.exit(1);
    }
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
    LOG(
      kleur
        .green()
        .bold(
          `✅ Done! ${kleur.white(
            moderatorToAdd.name
          )} has been added as a moderator and member of ${kleur.white(
            communityName
          )} community.`
        )
    );

    rl.close();
    process.exit(0);
  } catch (err) {
    LOG(kleur.red().bold("Error: " + err.message));
    process.exit(1);
  }
}

function promptUserInput(promptText, options) {
  return new Promise((resolve) => {
    if (options && options.length > 0) {
      LOG(kleur.cyan().bold("Select an option:"));
      options.forEach((option, index) =>
        LOG(kleur.cyan().bold(`${index + 1}. ${option}`))
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
        reject(new Error(kleur.red().bold("Invalid choice")));
      } else {
        resolve(choices[choiceIndex].split(". ")[0]);
      }
    });
  });
}
