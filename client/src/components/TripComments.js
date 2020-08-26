import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import InputComment from './InputComment';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

//eslint-disable-next-line
export default function TripComments({ tripId }) {
  const { user } = useAuth0();
  const { name, picture } = user;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    //eslint-disable-next-line
    const getDataAxios = async () => {
      const { data: comments } = await axios.get(
        `${API_URL}/comments/${tripId}`
      );
      setComments(comments);
    };
    getDataAxios(); //calling the above created function
  }, [tripId]);

  //eslint-disable-next-line
  const handleCreateComment = async ({ comment }) => {
    const { data: newComment } = await axios.post(`${API_URL}/comments/`, {
      username: name,
      picture,
      comment,
      tripId,
    });
    setComments((prevComments) => [...prevComments, newComment]);
  };

  //eslint-disable-next-line
  const handleDeleteComment = async (comment) => {
    axios.delete(`${API_URL}/comments/${comment._id}`).then(() => {
      setComments((prevComments) =>
        prevComments.filter((prevComment) => prevComment._id !== comment._id)
      );
    });
  };

  return (
    <div>
      {comments &&
        comments.map((comment, index) => {
          return (
            <div className="flex items-center mt-2 mb-2 md:w-1/2" key={index}>
              <img
                className="w-10 h-10 mr-4 rounded-full"
                src={comment.picture}
                alt="user"
              />
              <div className="flex-col items-center justify-between text-sm">
                <div className="flex items-center justify-between">
                  <p className="mr-10 leading-none text-center text-black bg-gray-200">
                    {comment.username}
                  </p>
                  <p className="mr-5 text-center text-grey-dark">
                    {comment.createdAt
                      ? dayjs(comment.createdAt).format('DD.MM.YYYY')
                      : ''}
                  </p>
                  {comment.username === name && (
                    <button
                      className="px-1 py-1 mb-1 ml-3 text-xs font-bold text-black uppercase bg-red-500 rounded shadow outline-none active:bg-red-600 hover:shadow-md focus:outline-none"
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => handleDeleteComment(comment)} //eslint-disable-line
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
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
