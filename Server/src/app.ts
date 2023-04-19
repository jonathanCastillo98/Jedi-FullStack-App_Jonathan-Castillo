import express from 'express';
import router from './routes';

const cors = require("cors");
const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/v1/', router);


export default app;