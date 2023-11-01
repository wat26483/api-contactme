const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let contact = new Schema({
    Name: {
      type: String
    },
    Email: {
      type: String
    },
    Phone: {
      type: Number
    },Messeage: {
      type: String
    }
  }, {
    collection: "contact"
  })

module.exports = mongoose.model('User',contact)