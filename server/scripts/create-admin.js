require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Admin = require("../models/admin.model");
const { prompt } = require("enquirer");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    createAdmin();
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

async function createAdmin() {
  const admin = new Admin();

  const questions = [
    { type: "input", name: "username", message: "Enter username: " },
    { type: "password", name: "password", message: "Enter password: " },
  ];

  const answers = await prompt(questions);

  admin.username = answers.username;
  admin.password = answers.password;

  try {
    await admin.save();
    console.log(`Admin user "${admin.username}" created successfully`);
  } catch (error) {
    if (error.message.includes("duplicate key error")) {
      console.log(`Username "${admin.username}" is already taken.`);
    } else console.log(error.message);
  } finally {
    mongoose.connection.close();
  }
}
