const express = require("express");
const cors = require("cors");
const app = express();
let channel;

const { Project, Waitlist } = require("./db/mongo.js");
const { getRepoStars } = require('./lib/githubStars.js');
const { connectDB } = require("./db/mongo.js")
const PORT = process.env.PORT || 3000;
const connectRabbitMQ = require("./lib/connectRabbitMQ.js");



app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: '10mb' })); // Adjust '10mb' as needed

// Connecting to Rabbit MQ
connectRabbitMQ()
    .then((ch) => {
        channel = ch; // Assign the returned channel to our global variable
        console.log("  Channel assigned to global variable");
    })
    .catch(err => console.error("Failed to init RabbitMQ:", err));

// Connect to DB
connectDB().then().catch((err) => { console.error("Failed to connnect MongoDB") })


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
    let project; // Declare outside the try block so the catch block can access it for rollbacks

    try {
        if (!channel) {
            throw new Error("RabbitMQ channel not ready");
        }
        // 1. Create the project in the DB
        project = await Project.create({ ...req.body, status: "PENDING" });

        const taskData = {
            projectId: project._id,
            body: req.body
        };

        // 2. Wrap sendToQueue in a Promise to catch network/broker failures
        await new Promise((resolve, reject) => {
            // CRITICAL: 'channel' MUST be created using connection.createConfirmChannel()
            // Standard channels do not support this callback signature.
            channel.sendToQueue(
                'roadmap_queue',
                Buffer.from(JSON.stringify(taskData)),
                { persistent: true },
                (err, ok) => {
                    if (err) {
                        reject(new Error("Broker rejected or failed to receive the message"));
                    } else {
                        resolve(ok);
                    }
                }
            );
        });

        // 3. Send success response ONLY if both DB and MQ succeeded
        res.status(202).json({
            msg: "Project generation started",
            projectId: project._id,
            projectStatus: project.status
        });

    } catch (e) {
        // 4. Rollback: If the DB creation succeeded but RabbitMQ failed,
        // we must clean up the stranded database record.
        if (project && project._id) {
            try {
                // You can either delete it
                await Project.findByIdAndDelete(project._id);

                console.warn(`Rolled back project ${project._id} due to RabbitMQ failure.`);
            } catch (rollbackError) {
                // Log this heavily - you now have an inconsistent state requiring manual intervention
                console.error("CRITICAL: Failed to rollback database after MQ failure:", rollbackError);

            }
        }

        // 5. Send appropriate error response to the client
        res.status(500).json({
            msg: "Failed to initialize project generation",
            error: e.message
        });
    }
});

//---------------------------------GET---------------------------------------//

app.get("/projects", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skipIndex = (page - 1) * limit;

        const projects = await Project.find({})
            .sort({ _id: -1 }) // Get newest first
            .skip(skipIndex)
            .limit(limit);

        const totalProjects = await Project.countDocuments();

        if (!projects) {
            throw new Error("Could not fetch projects")
        }

        res.json({
            projects,
            currentPage: page,
            totalPages: Math.ceil(totalProjects / limit),
            totalProjects
        });
    }
    catch (e) {
        res.status(500).json({ msg: e.message || "Error fetching projects" });
    }
})



app.get("/projects/:id", async (req, res) => {
    try {
        const projectId = req.params['id']
        const project = await Project.find({ _id: projectId })
        if (project && project.length > 0)
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
app.get("/github-stars", async (req, res) => {

    try {
        const stars = await getRepoStars();

        res.json({ stars });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
// ______________________________________________________
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} `);
});
// module.exports = app;
