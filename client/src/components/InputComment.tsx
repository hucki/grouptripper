import React, { useState } from 'react';

const InputComment: React.FC<{
  onSubmit: ({ comment }: { comment: string }) => void;
}> = ({ onSubmit }) => {
  //eslint-disable-line
  const [comment, setComment] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    //eslint-disable-line
    setComment(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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
};

export default InputComment;
