import React, { useState } from 'react';

export default function InputComment({ onSubmit, user }) {
  const [comment, setComment] = useState(null);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ comment });
    setComment('');
  };

  return (
    <div className="flex items-center mb-2">
      <img className="w-12 h-12 rounded-full mr-4" src={user.picture} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          name="new comment"
          value={comment || ''}
          onChange={handleChange}
          placeholder="Add a new comment"
          className="text-grey-dark tracking-wide font-light min-w-full px-2 py-2"
        />
      </form>
    </div>
  );
}
