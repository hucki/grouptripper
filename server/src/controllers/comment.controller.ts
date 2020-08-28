import Comment from '../models/comment.model';
import { Request, Response } from 'express';
// eslint-disable-next-line
export const getComments = async (req: Request, res: Response) => {
  try {
    const response = await Comment.find({ tripId: req.params.tripId });
    res.json(response);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
// eslint-disable-next-line
export const addComment = async (req: Request, res: Response) => {
  const { picture, username, comment, tripId } = req.body;

  Comment.create(
    { picture, username, comment, tripId, createdAt: Date.now() },
    (error, newComment) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log('Comment created', newComment);
        res.json(newComment);
        res.status(200);
      }
    }
  );
};

// eslint-disable-next-line
export const deleteComment = async (req: Request, res: Response) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted' });
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
