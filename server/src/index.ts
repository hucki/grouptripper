import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import tripsRouter from './router';
dotenv.config();

const port = process.env.PORT || 3001;

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', tripsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
