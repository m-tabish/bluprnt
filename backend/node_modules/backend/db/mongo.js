const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.CONNECTION_URL, {
  serverSelectionTimeoutMS: 30000 // 30 seconds
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Connection error', err));

const projectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true,
  },

  technologies: {
    type: [String],
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  steps: {
    type: Object,
    required: true,
  },

});


const waitlistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  twitterHandle: {
    type: String,
    required: false,
  },
  pay: {
    type: Boolean,
    required: false,
  },
});

const Project = mongoose.model('Project', projectSchema);
const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = { Project, Waitlist };
