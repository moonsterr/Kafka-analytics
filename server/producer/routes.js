import { producer } from './kafka.js';
import express from 'express';
import client from '../consumer/redis.js';

const router = express.Router();
router.get('/analytics', async (req, res) => {
  try {
    const data = await client.json.get('analytics');
    console.log('Fetched from Redis:', data);
    if (!data) return res.status(200).json({ views: {}, clicks: {} });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).send('Something went wrong', error);
  }
});

router.post('/view', async (req, res) => {
  try {
    console.log('hello world');
    console.log('connected');
    await producer.send({
      topic: 'view-topic',
      messages: [{ value: '' }],
    });
    console.log('sent');
    return res.status(200).send('hellooo');
  } catch (error) {
    console.log(error);
    return res.status(404).send('Something went wrong', error);
  }
});
router.post('/click', async (req, res) => {
  try {
    await producer.send({
      topic: 'clicks-topic',
      messages: [{ value: '' }],
    });
    console.log('hello world');

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(404).send('Something went wrong', error);
  }
});

export default router;
