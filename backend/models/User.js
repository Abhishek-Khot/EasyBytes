const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // User's name
  },
  email: {
    type: String,
    required: true,
    unique: true, // User's email (unique identifier)
  },
  password: {
    type: String,
    required: true, // Hashed password
  },
  homepage: {
    portfolioName: {
      type: String,
      default: '',
      // required: true, // Name for the portfolio website
    },
    userName: {
      type: String,
      default: '',
      // required: true, // User's name
    },
    expertise: {
      type: [String], // Areas of expertise (e.g., Full Stack, Frontend, Backend)
      default: [],
    },
  },
  
  profilePhoto: {
    type: String, // Path to the profile photo
    default: null,
  },
  about: {
    description: {
      type: String, // Description and other activities
      default: '',
    },
    skillset: {
      type: [String], // Skills (e.g., Go, Golang, Java)
      default: [],
    },
    tools: {
      type: [String], // Tools used
      default: [],
    },
  },
  projects: [
    {
      photo: {
        type: String, // Path to project photo (stored via Multer)
        required: true,
      },
      name: {
        type: String, // Project name
        required: true,
      },
      description: {
        type: String, // Project description
        required: true,
      },
      githubLink: {
        type: String, // Link to GitHub repository
        required: true,
      },
    },
  ],
  blogs: [
    {
      topic: {
        type: String, // Blog topic
        required: true,
      },
      technology: {
        type: String, // Technology related to the blog
        required: true,
      },
      title: {
        type: String, // Blog title
        required: true,
      },
      description: {
        type: String, // Blog description
        required: true,
      },
    },
  ],
  resume: {
    photoPath: { type: String, default: "" },
  },
  socialLinks: {
    type: [String], // Array of social links
    default: [],    // Default to an empty array
  },
  reputation: {
    type: Number, // Field to store the user's reputation as an integer
    default: 0,   // Default reputation value is 0
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
