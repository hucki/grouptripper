export type CommentDTO = {
  _id: string;
  picture: string;
  username: string;
  comment: string;
  createdAt: Date;
  tripId: string;
};

export type CommentInput = Omit<CommentDTO, '_id' | 'createdAt'>;
