const mongoose = require("mongoose");
const path = require("path");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const MONGOURL = process.env.MONGO_CONNECTION_URL;

const connectDB = async () => {
  // Debugging log: This will help you see EXACTLY what the worker sees
  if (!MONGOURL) {
    console.error("❌ Worker Error: MONGO_CONNECTION_URL is undefined.");
    console.error("Looked in:", path.resolve(__dirname, '../.env'));
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGOURL);
    console.log('✅ MongoDB connected...');
  } catch (err) {
    console.error('❌ Connection error', err);
  }
};

const projectSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    trim: true
  },
  projectname: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', "ERROR"],
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
    unique: true,
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
