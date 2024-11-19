const amqp = require('amqplib');
require('dotenv').config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = process.env.QUEUE;

async function sendToHistoryService(data) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE, { durable: true });
        const message = JSON.stringify({ data });
        channel.sendToQueue(QUEUE, Buffer.from(message), { persistent: true });
        console.log('Отправка сообщения в History Service:', message);
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (err) {
        console.error('Ошибка с отправкой сообщения:', err);
    }
}

module.exports = sendToHistoryService;