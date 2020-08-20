import mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOSTL || 'mongodb://localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'grouptripper';

mongoose.connect(`${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('successfully connected mongodb');
});

export default mongoose;
