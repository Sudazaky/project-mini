const mongoose = require('mongoose');

const chatSchame = new mongoose.Schema({
  userId: String,
  room_chat_id: String,
  content: String,
  images: Array,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date 
}, { timestamps: true});

const Chat = mongoose.model("Chat", chatSchame, "chats");

module.exports = Chat;
