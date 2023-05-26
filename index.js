import express from "express";
import mongoose from "mongoose";

import PostUser from "./models/postUser.js";

const app = express();
app.use(express.json());

// get all contacts
app.get("/api/users", async (req, res) => {
  try {
    const postUser = await PostUser.find();
    res.status(200).json(postUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  console.log("THE REQUEST BODY IS :", req.body);
  const { name, email, phone_number } = req.body;
  if (!name || !email || !phone_number) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const user = await PostUser.create({
    name,
    email,
    phone_number,
  });
  res.status(201).json(user);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await PostUser.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(user);
});

app.put("/api/users/:id", async (req, res) => {
  const user = await PostUser.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await PostUser.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// delete user
//route DELETE /api/users/:id
app.delete("/api/users/:id", async (req, res) => {
  const user = await PostUser.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await PostUser.remove();

  res.status(200).json(user);
});

const CONNECTION_URL =
  "mongodb+srv://farukmy04:farukmy05@cluster0.rtu1tvn.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
