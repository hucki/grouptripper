import mongoose from './index';

// import { Document } from 'mongoose';

const commentSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
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
