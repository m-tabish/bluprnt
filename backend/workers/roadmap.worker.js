const amqp = require('amqplib');
const { updateProject } = require('../services/projectService');
const { connectDB } = require("../db/mongo");
require('dotenv').config();
const { generateContent } = require("../gemini/nindex")
const mock_data = require('./mock_data')
async function startWorker() {
    try {
        await connectDB();

        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'roadmap_queue';

        await channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);

        console.log("🚀 Worker waiting for tasks...");

        channel.consume(queue, async (msg) => {
            if (!msg) return;

            const content = JSON.parse(msg.content.toString());
            const { projectId, body } = content;

            try {
                console.log(`[${new Date().toISOString()}] Processing: ${projectId}`);

                // 1. Logic for Gemini
                const result = await generateContent(body);


                await updateProject(projectId, { ...result, status: 'COMPLETED' });

                console.log(`  Finished: ${projectId}`);
                channel.ack(msg);

            } catch (error) {
                console.error(`  Error on Project ${projectId}:`, error.message);

                // Get the current retry count from message headers
                const retryCount = (msg.properties.headers?.['x-death']?.length || 0);
                const MAX_RETRIES = 3;

                // If max retries exceeded, mark as FAILED and acknowledge the message
                if (retryCount >= MAX_RETRIES) {
                    console.error(`  Max retries (${MAX_RETRIES}) exceeded for ${projectId}. Marking as FAILED.`);
                    await updateProject(projectId, {
                        status: 'FAILED',
                        error: error.message
                    });
                    channel.ack(msg);
                } else {
                    // Requeue if it's a temporary error (not a validation error)
                    const shouldRequeue = !error.message.includes("validation failed");
                    channel.nack(msg, false, shouldRequeue);
                }
            }
        }, { noAck: false });

    } catch (err) {
        console.error("FATAL: Worker failed to start", err);
        process.exit(1);
    }
}

startWorker();