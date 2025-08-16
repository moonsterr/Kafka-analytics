import { Kafka } from 'kafkajs';
import { kafkaConfig } from '../config/kafkaConfig.js';

const kafka = new Kafka(kafkaConfig);

export const consumerA = kafka.consumer({ groupId: 'analytics-group-views' });
export const consumerB = kafka.consumer({ groupId: 'analytics-group-clicks' });

export async function connectConsumer() {
  await consumerA.connect();
  console.log('we have connected to consumer A');
  await consumerA.subscribe({ topic: 'view-topic', fromBeginning: false });
  await consumerB.connect();
  console.log('we have connected to consumer B');
  await consumerB.subscribe({ topic: 'clicks-topic', fromBeginning: false });
}
