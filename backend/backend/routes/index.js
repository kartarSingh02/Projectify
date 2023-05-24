const express = require("express");
const router = express.Router();
const Project = require("../models/model");
const { spawn } = require('child_process');

// python script may run after this
router.post('/extract', (req, res) => {
  const filePath = req.body.filePath;
  
  // Call the Python script with the file path as an argument
  const pythonProcess = spawn('python', ['ExtractionScript.py', filePath]);
  
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send({ message: 'Extraction complete' });
  });
});

// GET route to search for projects based on any keyword
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const projects = await Project.find({
      $or: [
        // Number.isNaN(Number(keyword)) ? null : { projectID: { $eq: Number(keyword) } },
        { clientName: { $regex: keyword, $options: 'i' } },
        { projectName: { $regex: keyword, $options: 'i' } },
        { projectDescription: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
        { country: { $regex: keyword, $options: 'i' } },
        { 'techstack.skill': { $regex: keyword, $options: 'i' } },
        { 'toolUsed.tools': { $regex: keyword, $options: 'i' } },
        { 'team.membername': { $regex: keyword, $options: 'i' } },
        { 'team.role': { $regex: keyword, $options: 'i' } },
        { techstack: { $elemMatch: { skill: { $regex: keyword, $options: 'i' } } } },
        { toolUsed: { $elemMatch: { tools: { $regex: keyword, $options: 'i' } } } },
        { team: { $elemMatch: { membername: { $regex: keyword, $options: 'i' } } } },
        { team: { $elemMatch: { role: { $regex: keyword, $options: 'i' } } } },
        { budget: { $regex: keyword, $options: 'i' } }
      ],
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET route to search for active projects based on any keyword

router.get('/activesearch/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const projects = await Project.find({
      $and: [
        { endDate: { $gte: new Date() } }, // Check if project end date is in the future (i.e. active)
        {
          $or: [
            // Number.isNaN(Number(keyword)) ? null : { projectID: { $eq: Number(keyword) } },
            { clientName: { $regex: keyword, $options: 'i' } },
            { projectName: { $regex: keyword, $options: 'i' } },
            // { projectDescription: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } },
            { country: { $regex: keyword, $options: 'i' } },
            { 'techstack.skill': { $regex: keyword, $options: 'i' } },
            { 'toolUsed.tools': { $regex: keyword, $options: 'i' } },
            { 'tagUsed.tags': { $regex: keyword, $options: 'i' } },
            { 'team.membername': { $regex: keyword, $options: 'i' } },
            { 'team.role': { $regex: keyword, $options: 'i' } },
            { techstack: { $elemMatch: { skill: { $regex: keyword, $options: 'i' } } } },
            { toolUsed: { $elemMatch: { tools: { $regex: keyword, $options: 'i' } } } },
            { tagUsed: { $elemMatch: { tags: { $regex: keyword, $options: 'i' } } } },
            { team: { $elemMatch: { membername: { $regex: keyword, $options: 'i' } } } },
            { team: { $elemMatch: { role: { $regex: keyword, $options: 'i' } } } },
            { budget: { $regex: keyword, $options: 'i' } }
          ],
        },
      ],
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET route to search for completed projects based on any keyword


router.get('/completedsearch/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const projects = await Project.find({
      $and: [
        { endDate: { $lt: new Date() } }, // Check if project end date is in the past (i.e. completed)
        {
          $or: [
            // Number.isNaN(Number(keyword)) ? null : { projectID: { $eq: Number(keyword) } },
            { clientName: { $regex: keyword, $options: 'i' } },
            { projectName: { $regex: keyword, $options: 'i' } },
            // { projectDescription: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } },
            { country: { $regex: keyword, $options: 'i' } },
            { 'techstack.skill': { $regex: keyword, $options: 'i' } },
            { 'toolUsed.tools': { $regex: keyword, $options: 'i' } },
            { 'tagUsed.tags': { $regex: keyword, $options: 'i' } },
            { 'team.membername': { $regex: keyword, $options: 'i' } },
            { 'team.role': { $regex: keyword, $options: 'i' } },
            { techstack: { $elemMatch: { skill: { $regex: keyword, $options: 'i' } } } },
            { toolUsed: { $elemMatch: { tools: { $regex: keyword, $options: 'i' } } } },
            { tagUsed: { $elemMatch: { tags: { $regex: keyword, $options: 'i' } } } },
            { team: { $elemMatch: { membername: { $regex: keyword, $options: 'i' } } } },
            { team: { $elemMatch: { role: { $regex: keyword, $options: 'i' } } } },
            { budget: { $regex: keyword, $options: 'i' } }
          ],
        },
      ],
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


// ---------------------------------------------------------------------------------------------------------------------------
// PATCH route to update an existing project
router.patch("/updateproject/:id", (req, res) => {
  const { id } = req.params;

  Project.findOne({ projectID: id })
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const {
        clientName,
        projectName,
        projectDescription,
        category,
        startDate,
        endDate,
        country,
        techstack,
        toolUsed,
        budget,
        team,
        status,
        webAddress,
        tagUsed,
        documentUrl
      } = req.body;

      project.clientName = clientName || project.clientName;
      project.projectName = projectName || project.projectName;
      project.projectDescription = projectDescription || project.projectDescription;
      project.category = category || project.category;
      project.startDate = startDate || project.startDate;
      project.endDate = endDate || project.endDate;
      project.country = country || project.country;
      project.techstack = techstack || project.techstack;
      project.toolUsed = toolUsed || project.toolUsed;
      project.budget = budget || project.budget;
      project.team = team || project.team;
      project.status = status || project.status;
      project.webAddress= webAddress || project.webAddress;
      project.tagUsed = tagUsed || project.tagUsed;
      project.documentUrl=documentUrl || project.documentUrl;

      project.save()
        .then((updatedProject) => {
          return res.json({ message: "Project updated successfully", updatedProject });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// -------------------------------------------------------------------------------------------------------------------------------

// GET route to retrieve all projects
router.get("/getprojects", (req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// --------------------------------------------------------------------------------------------------------------------------
// Get For active projects api
router.get("/getactiveprojects", (req, res) => {
  const currentDate = new Date();
  Project.find({
    $or: [{ endDate: { $gt: currentDate } }, { endDate: null }]
  })
    .then((activeProjects) => res.json(activeProjects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ------------------------------------------------------------------------------------------------------------------------------
// GET COMPLETED PROJECTS api
router.get("/getcompletedprojects", (req, res) => {
  const currentDate = new Date();
  Project.find({ endDate: { $lt: currentDate } })
    .then((completedProjects) => res.json(completedProjects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// -------------------------------------------------------------------------------------------------------------------------------
// POST route to add a new project
router.post("/addprojects", (req, res) => {
  const {
    clientName,
    projectName,
    projectDescription,
    category,
    startDate,
    endDate,
    country,
    techstack,
    toolUsed,
    budget,
    team,
    status,
    webAddress,
    tagUsed,
    documentUrl
  } = req.body;

  Project.findOne().sort({ projectID: -1 }).limit(1)
  .then((latestProject) => {
    let newID;
    if (latestProject && typeof latestProject.projectID === 'number') {
      newID = latestProject.projectID + 1;
    } else {
      newID = 1;
    }
  

  const newProject = new Project({
    projectID: newID,
    clientName,
    projectName,
    projectDescription,
    category,
    startDate,
    endDate,
    country,
    techstack,
    toolUsed,
    budget,
    team,
    status,
    webAddress,
    tagUsed,
    documentUrl
  });
    newProject.save()
        .then(() => res.json({projectID: newID,message:"Project added!"}))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));

});

module.exports = router;
