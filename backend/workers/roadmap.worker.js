import amqp from 'amqplib';
import 'dotenv/config';
import { generateContent } from "../gemini/index.js";
import { updateProjectRepo } from '../repository/project.repository.js';



async function connectRabbitMQ() {
    const url = process.env.RABBITMQ_URL;

    console.log("Using RabbitMQ URL:", url);

    while (true) {
        try {
            const connection = await amqp.connect(url);
            console.log("✅ RabbitMQ connected");
            return connection;
        } catch (err) {
            console.log("❌ RabbitMQ not ready, retrying in 5s...", err);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

async function startWorker() {
    try {

        const connection = await connectRabbitMQ();
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

                // const result = mock_data; // for testing
                const result = await generateContent(body);

                await updateProjectRepo(projectId, { ...result, status: 'COMPLETED' });

                console.log(`✅ Finished: ${projectId}`);
                channel.ack(msg);

            } catch (error) {
                console.error(`❌ Error on Project ${projectId}:`, error.message);

                const retryCount = (msg.properties.headers?.['x-death']?.length || 0);
                const MAX_RETRIES = 3;

                if (retryCount >= MAX_RETRIES) {
                    await updateProjectRepo(projectId, {
                        status: 'FAILED',
                        error: error.message
                    });
                    channel.ack(msg);
                } else {
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
