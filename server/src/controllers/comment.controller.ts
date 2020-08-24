import Comment from '../models/comment.model';
import { Request, Response } from 'express';
// eslint-disable-next-line
export const getComments = async (
  req:Request,
  res: Response) => {
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
export const addComment = async (
  req:Request,
  res: Response) => {
  const { username, picture, comment, tripId } = req.body;

  Comment.create(
    { username, picture, comment, tripId, createdAt: Date.now() },
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
