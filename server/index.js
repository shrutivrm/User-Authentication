import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/UserModel.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/users");

app.listen(3001, () => {
  console.log("Server is listening");
});

app.post("/", async (req, res) => {
  const email = req.body.email;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      res.json("User Already registered");
    } else {
      UserModel.create(req.body)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => res.json(err));
    }
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ email: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json(" Incorrect Password");
      }
    } else {
      res.json("No Record Existed");
    }
  });
});
