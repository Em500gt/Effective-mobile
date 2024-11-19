import express, { Application } from 'express';
import dotenv from 'dotenv';
import router from './routes/index'
import processMessage from './services/rabbitmq.Service';

dotenv.config();
const app: Application = express();
app.use(express.json());
app.use('/app', router);
const PORT = process.env.PORT;

processMessage()
    .then(() => console.log('RabbitMQ Consumer started'))
    .catch(err => console.error('Error starting RabbitMQ consumer:', err));;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})