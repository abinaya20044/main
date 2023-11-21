import mongoose from "mongoose";
import { userModel } from "./user.js";
import bcrypt from "bcrypt"
async function connectToDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth");
    console.log("Successfully connected.");
  } catch (error) {
    console.log(error);
  }
}

async function createUserAndPassword(username, password) {
  try {
    await connectToDb();
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new userModel({
      user: username,
      pass: hashedPassword,
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
}


async function checkLogIn(username, password) {
  try {
    await connectToDb();
    const currentUser = await userModel.findOne({ user: username });
    if (!currentUser) {
      console.log("No User found");
      return;
    }
   const userVerfied = await bcrypt.compare(password,currentUser.pass)
   console.log(userVerfied);
  } catch (error) {
    console.log(error);
  }
}