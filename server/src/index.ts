import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import tripsRouter from './routerAuthenticated';
dotenv.config();

const port = process.env.PORT || 3001;

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', tripsRouter);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.message, err);
  return res.status(500).json({
    message: err.message,
    // we only add a `stack` property in non-production environments
    ...(process.env.NODE_ENV === 'production' ? null : { stack: err.stack }),
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
