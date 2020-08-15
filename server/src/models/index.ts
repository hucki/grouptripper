import mongoose from 'mongoose';

const uri = process.env.mongo_uri || 'mongodb://localhost/group_tripper';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('successfully connected mongodb');
});

module.exports = mongoose;
