const amqp = require('amqplib');
const mongoose = require('mongoose'); // 1. ADD THIS
const { generateContent } = require("../gemini/nindex");
const { updateProject } = require('../services/projectService');
require('dotenv').config();
const { connectDB } = require("../db/mongo")
const mock_data = require("./mock_data")
connectDB().then()

async function startWorker() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'roadmap_queue';

        await channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);

        console.log("👷 Worker waiting for tasks...");

        channel.consume(queue, async (msg) => {
            if (msg === null) return;

            const { projectId, body } = JSON.parse(msg.content.toString());

            try {
                console.log(`🚀 Processing: ${projectId}`);

                // 3. The REAL Gemini call

                // const result = await generateContent(body);
                // const parsedResult = JSON.parse(result);

                // 4. Update the DB
                await updateProject(projectId, mock_data);

                console.log(`✅ Finished: ${projectId}`);
                channel.ack(msg);

            } catch (error) {
                console.error(`❌ Error on Project ${projectId}:`, error.message);
                // If it fails, put it back in the queue to try again
                channel.nack(msg, false, true);
            }
        });
    } catch (err) {
        console.error("Worker failed to start", err);
    }
}

startWorker();