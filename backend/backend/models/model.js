const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the data model
const projectSchema = new mongoose.Schema({
  projectID: { type: Number, unique: true },
  clientName: { type: String, required: true },
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date,  },
  endDate: { type: Date,  },
  country: { type: String, required: true },
  budget: { type: String, },
  techstack:[{
    skill:{ type:String }
  }],
  toolUsed:[{
    tools:{ type:String }
  }],
  tagUsed:[{
    tags:{ type:String }
  }],
  team:[{
    membername:{type:String},
    role:{type:String}
  }],
  webAddress: { type: String },
  documentUrl: { type: String }
});


module.exports = mongoose.model("addProject", projectSchema);
