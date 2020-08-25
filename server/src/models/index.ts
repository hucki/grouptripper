import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_LOCAL = process.env.DB_LOCAL;
const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
const DB_LOCAL_PORT = process.env.DB_LOCAL_PORT;

const DB_NAME = process.env.DB_NAME;
const DB_URI_PROTOCOL = process.env.DB_URI_PROTOCOL;
const DB_URI_HOST = process.env.DB_URI_HOST;
const DB_URI_PARAMS = process.env.DB_URI_PARAMS;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PASS_ENC = encodeURIComponent(DB_PASS ? DB_PASS : '');
const connectionString =
  DB_LOCAL === 'true'
    ? `${DB_LOCAL_URI}:${DB_LOCAL_PORT}/${DB_NAME}`
    : `${DB_URI_PROTOCOL}://${DB_USER}:${DB_PASS_ENC}@${DB_URI_HOST}/${DB_NAME}?${DB_URI_PARAMS}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log(
    `successfully connected to ${
      DB_LOCAL === 'true' ? 'LOCAL ' : 'REMOTE '
    }mongodb`
  );
});

export default mongoose;
