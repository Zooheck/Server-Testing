const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const FriendFuncs = require("./friendsModel.js");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.status(200).json({ message: "SERVER WORKS YAY!" });
});

server.get("/friends", async (req, res) => {
  const friends = await FriendFuncs.getAll();

  res.status(200).json(friends);
});

server.post("/friends", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(404)
      .json({ message: "Please include a name for your friend." });
  }
  const newFriend = await FriendFuncs.add(req.body);
  try {
    res.status(201).json(newFriend);
  } catch (error) {
    res.status(500).json({ message: "Error adding friend." });
  }
});

server.delete("/friends/:id", async (req, res) => {
  try {
    const count = await FriendFuncs.deleteFriend(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Friend not found." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = server;
