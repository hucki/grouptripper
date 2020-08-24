import mongoose from './index';

// import { Document } from 'mongoose';

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    value: Date.now(),
    required: false,
  },
  tripId: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
