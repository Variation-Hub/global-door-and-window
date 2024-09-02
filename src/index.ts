import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import MainRoutes from './routes/main';
import cors from 'cors';
dotenv.config()

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())
app.use(morgan('tiny'))

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
    console.log('Connected to database');
}).catch((err: Error) => console.log(err));

app.use('/api/v1', MainRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running at Port :: ${port} `);
});
