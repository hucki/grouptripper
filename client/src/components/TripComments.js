import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import InputComment from './InputComment';

// const dummyComments = [
//   {
//     username: 'mohmed',
//     pictureURL:
//       'https://lh3.googleusercontent.com/a-/AOh14GjITz9CQ0DeLGfnFi_-VgniwZZ0sYjwF36mX5Bl',
//     comment: 'This is a great comment',
//     createdAt: '2020-11-14T00:00:00.000Z',
//     tripId: '5f438f427331b41754c77838',
//   },
//   {
//     username: 'alex',
//     pictureURL:
//       'https://lh3.googleusercontent.com/a-/AOh14GjITz9CQ0DeLGfnFi_-VgniwZZ0sYjwF36mX5Bl',
//     comment: 'This is a great comment',
//     createdAt: '2020-11-14T00:00:00.000Z',
//     tripId: '5f438f427331b41754c77838',
//   },
//   {
//     username: 'stefan',
//     pictureURL:
//       'https://lh3.googleusercontent.com/a-/AOh14GjITz9CQ0DeLGfnFi_-VgniwZZ0sYjwF36mX5Bl',
//     comment: 'This is a great comment',
//     createdAt: '2020-11-14T00:00:00.000Z',
//     tripId: '5f438f427331b41754c77838',
//   },
// ];

export default function TripComments({ tripId }) {
  const { user } = useAuth0();
  const { name, picture } = user;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getDataAxios = async () => {
      const { data: comments } = await axios.get(
        `http://localhost:3001/comments/${tripId}`
      );
      setComments(comments);
    };
    getDataAxios(); //calling the above created function
  }, [tripId]);
  console.log(comments);

  const handleCreateComment = async ({ comment }) => {
    const { data: newComment } = await axios.post(
      'http://localhost:3001/comments/',
      {
        username: name,
        picture,
        comment,
        tripId,
      }
    );
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <h1>Trip comments</h1>
      {comments &&
        comments.map((comment, index) => {
          return (
            <div className="flex items-center mb-2" key={index}>
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={comment.picture}
              />
              <div className="text-sm">
                <div className="flex justify-between items-center ">
                  <p className="text-black leading-none bg-gray-200 text-center mr-10">
                    {comment.username}
                  </p>
                  <p className="text-grey-dark text-center">
                    {comment.createdAt}
                  </p>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          );
        })}
      <InputComment onSubmit={handleCreateComment} user={user} />
    </div>
  );
}
