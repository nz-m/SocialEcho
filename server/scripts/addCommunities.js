const mongoose = require("mongoose");
const Community = require("../models/Community");
const ModerationRules = require("../models/ModerationRules");
const communities = require("../data/communities.json");
const rules = require("../data/moderationRules.json");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/db_socialecho", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Insert communities
    const savedCommunities = await Community.insertMany(communities);
    console.log(`${savedCommunities.length} communities saved to database`);

    // Insert moderation rules
    const savedRules = await ModerationRules.insertMany(rules);
    console.log(`${savedRules.length} moderation rules saved to database`);

    // Close the database connection
    db.close();
  } catch (error) {
    console.error(error.message);
    db.close();
  }
});
