import amqp from "amqplib";

let connection = null;
let channel = null;

export default async function getRabbitMQChannel() {
    // If channel is already established, reuse it
    if (channel) return channel;

    try {
        const url = process.env.RABBITMQ_URL || 'amqp://localhost';
        connection = await amqp.connect(url);
        channel = await connection.createConfirmChannel();
        await channel.assertQueue('roadmap_queue', { durable: true });

        console.log("✅ Connected to RabbitMQ (Singleton)");
        return channel;
    } catch (err) {
        console.error("❌ RabbitMQ Connection Error", err);
        throw err;
    }
}
