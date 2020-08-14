import express from 'express';
// import * as cors from 'cors';
// import * as morgan from 'morgan';
// import dotenv from 'dotenv';

const tripsRouter = require('./router.ts');

const port = process.env.PORT || 3001;

// dotenv.config();

const app: express.Application = express();
// app.use(cors());
app.use(express.json());
// app.use(morgan('tiny'));

app.use('/', tripsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
