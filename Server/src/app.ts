import express from 'express';
import router from './routes';

const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json())
app.use('/api/v1/', router);
app.use(cors)


export default app;