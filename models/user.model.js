const mongoose = require('mongoose');
const generate = require('../helpers/generateToken');

const UserSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  tokenUser: {
    type: String,
    default: generate.generateToken(20)
  },
  phone: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;