const mongoose = require('mongoose');

const roleSchame = new mongoose.Schema({
  title: String,
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date 
}, { timestamps: true});

const Role = mongoose.model("Role", roleSchame, "roles");

module.exports = Role;
