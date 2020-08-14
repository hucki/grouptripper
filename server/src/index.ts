import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
