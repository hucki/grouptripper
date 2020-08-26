import React, { useState } from 'react';

export default function InputComment({ onSubmit, user }) {
  //eslint-disable-line
  const [comment, setComment] = useState(null);

  const handleChange = (event) => {
    //eslint-disable-line
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    //eslint-disable-line
    event.preventDefault();
    onSubmit({ comment });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        name="new comment"
        value={comment || ''}
        onChange={handleChange}
        placeholder="Add a new comment"
        className="min-w-full p-2 font-light tracking-wide border border-gray-500 rounded text-grey-dark "
      />
    </form>
  );
}
