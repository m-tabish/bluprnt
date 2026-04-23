const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

async function monitorSystem() {
    await mongoose.connect(process.env.TEST_CONNECTION_URL);
    console.log("  Starting System Monitor...\n");

    const interval = setInterval(async () => {
        try {
            // 1. Check RabbitMQ Queue Depth (Requires RabbitMQ Management Plugin)
            // Default credentials are usually guest:guest
            const rmqAuth = Buffer.from('guest:guest').toString('base64');
            const rmqRes = await axios.get('http://localhost:15672/api/queues/%2F/roadmap_queue', {
                headers: { Authorization: `Basic ${rmqAuth}` }
            });
            const queueDepth = rmqRes.data.messages || 0;

            // 2. Check MongoDB Active Connections & Operations
            const dbStats = await mongoose.connection.db.admin().serverStatus();
            const dbConnections = dbStats.connections.current;
            const dbInserts = dbStats.opcounters.insert;
            const dbUpdates = dbStats.opcounters.update;

            console.log(`[Metrics] Queue Depth: ${queueDepth} | DB Connections: ${dbConnections} | Total DB Inserts: ${dbInserts} | Total DB Updates: ${dbUpdates}`);

            // If the queue is empty and we've processed things, you can stop
            if (queueDepth === 0 && dbUpdates > 0) {
                console.log("\n✅ Queue cleared. Test complete.");
                clearInterval(interval);
                process.exit(0);
            }
        } catch (err) {
            console.error("Monitor error:", err.message);
        }
    }, 2000); // Poll metrics every 2 seconds
}

monitorSystem();