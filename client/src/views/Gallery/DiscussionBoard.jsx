import React, { useState } from 'react';
import './DiscussionBoard.less';

const DiscussionBoard = (props) => {
  const fakeComments = [
    'Wow this project is life changing',
    'Id endorse this project',
    'This project is good',
  ];

  return (
    <div className='discussion-board'>
      <h3>Discussion</h3>
      <div className='comments'>
        {fakeComments.map((comment, index) => (
          <div key={index} className='comment'>
            <textarea
              rows='4'
              cols='50'
              value={comment}
              readOnly // Make the textarea read-only to prevent user editing
            />
          </div>
        ))}
      </div>
      <div className='comment-input'>
        <input
          type='text'
          placeholder='Add a comment...'
        />
        <button>Add Comment</button>
      </div>
    </div>
  );
};

export default DiscussionBoard;