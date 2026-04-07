const mongoose = require("mongoose");
const { date } = require("zod");
const { _enum } = require("zod/v4/core");
require("dotenv").config();

const MONGOURL = process.env.MONGO_TEST_CONNECTION_URL
// const MONGOURL = process.env.MONGO_CONNECTION_URL
const connectDB = async () => {
  mongoose.connect(MONGOURL, {
    serverSelectionTimeoutMS: 30000 // 30 seconds
  })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('Connection error', err));
}

const projectSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  projectname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    _enum: ['PENDING', 'COMPLETED', "ERROR"],
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
    nodes: [
      {
        nodeId: String,
        process: String,
        description: String,
        code: String,
        resources: [String],
        target: [String]
      }
    ],
    edges: [
      {
        source: String,
        target: String,
        label: String
      }
    ]
  }

});


const waitlistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
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

module.exports = { Project, Waitlist, connectDB };
