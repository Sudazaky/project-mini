const mongoose = require('mongoose');
const generate = require('../helpers/generateToken');

const AccountSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: {
    type: String,
    default: generate.generateToken(20)
  },
  phone: String,
  role_id: String,
  avatar: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date,
}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema, "accounts");

module.exports = Account;