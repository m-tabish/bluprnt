import cors from "cors";
import "dotenv/config";
import express from "express";
import { deleteProjectController } from "./controllers/project.controller.js";
import { errorHandler } from "./lib/errorHandler.js";
import { getRepoStars } from './lib/githubStars.js';
import { responseMiddleware } from "./middleware/response.middleware.js";
import projectRouter from "./routes/project.route.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(responseMiddleware);

app.get("/", (req, res) => {
    console.log("home");
    res.send("Server running");
});

app.get('/health', (req, res) => {
    res.json({ message: 'CORS is enabled for all origins!' });
});


app.use("/projects", projectRouter)

app.delete('/delete-project/:id', deleteProjectController);

app.get("/github-stars", async (req, res) => {

    try {
        const stars = await getRepoStars();
        res.json({ stars });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} `);
});
