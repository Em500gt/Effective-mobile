import amqp from 'amqplib';
import actionService from './actionServices';
import dotenv from 'dotenv';
dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const QUEUE = process.env.QUEUE as string;

async function processMessage() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    console.log('Ожидание сообщений в очереди:', QUEUE);
    channel.consume(QUEUE, async (msg: any) => {
        if (msg) {
            const message = JSON.parse(msg.content.toString());
            await actionService.saveHistory(message.data)
                .catch(error => console.log(error.message));
            channel.ack(msg);
        }
    });
}

export default processMessage;