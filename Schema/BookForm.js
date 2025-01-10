const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], 
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], // 10 digit phone number validation
  },
  companyname: {
    type: String,
    trim: true, 
  },
  service: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfEnquiry: {
    type: Date,
    default: Date.now(),
  },
});

// BookSchema.index({ email: 1, phone: 1 });

const BookForm = mongoose.model("BookForm", BookSchema);

module.exports = BookForm;
