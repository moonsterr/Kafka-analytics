import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './producer/routes.js';
import { connectConsumer } from './consumer/kafka.js';
import { connectProducer } from './producer/kafka.js';
import startConsumers from './consumer/index.js';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://kafka-analytics.vercel.app/'], // your frontend URL
  })
);

// Connect Kafka
async function initKafka() {
  await connectConsumer();
  await connectProducer();
  await startConsumers();
}
initKafka();

// Routes
app.use('/api', routes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
