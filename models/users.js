const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 120
  },
  bio:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('users', userSchema);



