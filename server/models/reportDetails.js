const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reportSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  savedOn: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
