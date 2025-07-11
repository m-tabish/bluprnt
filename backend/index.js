const express = require("express");
const cors = require("cors");
const app = express();
const { generateContent } = require("./gemini/index");
const { Project, Waitlist } = require("./db/mongo");


// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// // Logging middleware
// app.use(morgan('dev'));

// // Rate Limiting middleware
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute window
//     max: 10, // limit each IP to 10 requests per minute
//     message: 'Too many requests, please try again later.',
// });
// app.use(limiter);

app.use(cors());


app.use(express.json({ limit: '10mb' })); // Adjust '10mb' as needed

app.get("/", (req, res) => {
    console.log("home");
    res.send("Server running");
});

app.get('/api', (req, res) => {
    res.json({ message: 'CORS is enabled for all origins!' });
});

//------------------------------Waitlist Users-----------------------------------------//

app.post("/newUser", async (req, res) => {
    try {
        const userDetails = req.body;
        console.log(userDetails);

        const waitlist = await Waitlist.create({ ...userDetails })
        if (!waitlist) {
            throw new Error(error.message || "Failed to create waitlist user");
        }
        res.status(201).json(waitlist);
    } catch (error) {
        res.status(500).send({ msg: "Error in user in waitlist: " + (error.message || error), error });
    }
})

//------------------------------GenAI API-----------------------------------------//

app.post("/create-project", async (req, res) => {
    try {
        // Generate content using your GenAI API
        const result = await generateContent(req.body);

        // Parse the response
        const response = JSON.parse(result);

        var { projectname, projectDescription, language } = req.body;
        const technologies = response.technologies;
        projectDescription = response.description;
        const steps = response.steps;

        // console.log(JSON.stringify(response));

        // Create the project with all necessary fields
        const project = await Project.create({ projectname, technologies, projectDescription, language, steps });
        res.status(201).json(project);
    } catch (e) {
        res.status(500).send({ msg: "Response not generated server index :" + e });
    }
});


//---------------------------------GET---------------------------------------//

app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({})
        if (!projects) {

            throw new Error("Could not fetch projects")
        }

        res.send(projects)
    }
    catch (e) {
        res.status(500).send({ msg: e })
    }
})



app.get("/projects/:id", async (req, res) => {
    try {
        const projectId = req.params['id']
        const project = await Project.find({ _id: projectId })
        if (project)
            res.send(project)
        else
            res.status(404).send("Not found")
    }
    catch (e) {
        res.status(500).send({ msg: e })
    }
})

//---------------------------DELETE----------------------------------
app.delete('/delete-project/:id', async (req, res) => {
    try {
        const id = req.params["id"];

        // Find and delete the item by ID
        const deletedItem = await Project.findOneAndDelete({ _id: id });

        if (!deletedItem) {
            // Return early to avoid multiple response attempts
            return res.json({ msg: "Item not found" })
        }

        // If item is found and deleted, send success response
        return res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        // Handle any unexpected errors
        return res.sendStatus(500).json({ message: 'Server error', error });
    }
});

//---------------------------------LISTEN---------------------------------------//

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} `);
});
// module.exports = app;
