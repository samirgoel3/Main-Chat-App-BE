const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender:{type: mongoose.Schema.Types.ObjectId, ref: "user"},
    content:{type:JSON, require:true},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readby:[{type: mongoose.Schema.Types.ObjectId, ref: "user"}]
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageModel);

module.exports = Messages;
