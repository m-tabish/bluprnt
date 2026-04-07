const amqp = require("amqplib")
let channel
async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.connectRabbitMQ_URL || 'amqp://localhost')
        channel = await connection.createChannel();
        await channel.assertQueue('roadmap_queue', { durable: true })
        console.log("✅ Connected to RabbitMQ");
        return channel;
    } catch (err) {
        console.error("❌ RabbitMQ Connection Error", err);
    }
}
module.exports = connectRabbitMQ