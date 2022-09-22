const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatname: { type: String, trim: true },
    isgroupchat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    groupadmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    identifier:{ type: String, trim: true }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
