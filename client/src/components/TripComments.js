import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import InputComment from './InputComment';
import dayjs from 'dayjs';

const API_URL = process.env.REACT_APP_API_URL;

export default function TripComments({ tripId }) {//eslint-disable-line

  const { user } = useAuth0();
  const { name, picture } = user;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getDataAxios = async () => {
      //eslint-disable-line
      const { data: comments } = await axios.get(
        `${apiUrl}/comments/${tripId}`
      );
      setComments(comments);
    };
    getDataAxios(); //calling the above created function
  }, [tripId]);

  const handleCreateComment = async ({ comment }) => {//eslint-disable-line
    const { data: newComment } = await axios.post(`${API_URL}/comments/`, {
      username: name,
      picture,
      comment,
      tripId,
    });
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteComment = async (comment) => {//eslint-disable-line
    axios.delete(`${API_URL}/comments/${comment._id}`).then(() => {
      setComments((prevComments) =>
        prevComments.filter((prevComment) => prevComment._id !== comment._id)
      );
    });
  };

  return (
    <div>
      <h1>Trip comments</h1>
      {comments &&
        comments.map((comment, index) => {
          return (
            <div className="flex items-center mb-2" key={index}>
              <img
                className="w-10 h-10 mr-4 rounded-full"
                src={comment.picture}
                alt="user"
              />
              <div className="text-sm">
                <div className="flex items-center justify-between ">
                  <p className="mr-10 leading-none text-center text-black bg-gray-200">
                    {comment.username}
                  </p>
                  <p className="text-grey-dark text-center mr-5">
                    {comment.createdAt
                      ? dayjs(comment.createdAt).format('DD.MM.YYYY')
                      : ''}
                  </p>
                  {comment.username === name && (
                    <button
                      className="px-1 py-1 mb-1 ml-3 text-xs font-bold text-black uppercase bg-red-500 rounded shadow outline-none active:bg-red-600 hover:shadow-md focus:outline-none"
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => handleDeleteComment(comment)}//eslint-disable-line
                    >
                      Delete
                    </button>
                  )}
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
