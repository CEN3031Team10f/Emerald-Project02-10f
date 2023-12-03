import React, { useState, useEffect } from 'react';
import './DiscussionBoard.less';
import { deletePinnedComment, deleteUnpinnedComment, postPinnedComment, postUnpinnedComment, updateDiscussionBoard } from '../../Utils/requests';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';

const DiscussionBoard = ({ post }) => {

  // State to hold comments
  const [sortedComments, setSortedComments] = useState([]);
  const [commentInput, setCommentInput] = useState(''); // Define commentInput state 
  const maxPinCount = 3;

  useEffect(() => {
    // Fetch comments when the component mounts
    const fetchComments = async () => {
      try {
        await refreshComments();
      }
      catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };
    fetchComments();
  }, [post]);

  const handleCommentSubmit = async () => {
    console.log(post)
    try {
      // Check if the comment input is not empty
      if (commentInput.trim() !== '') {
        // Post an unpinned comment
        const response = await postUnpinnedComment({
          User_name: 'test student', // Replace with the actual username or get it from your authentication system
          comment: commentInput,
          is_pinned: false,
        });

        // Check the response status and handle accordingly
        if (response.err === null) {
          console.log('Comment posted successfully:', response.data);

          // Remove the "Username" attribute
          const { Username, ...commentData } = response.data;

          // Post to gallery-post attribute backend
          const updatedDiscussionBoard = post.discussion_board || [];
          console.log('please');
          updatedDiscussionBoard.push(commentData);
          console.log('post hello', post.id);
          await updateDiscussionBoard(post.id, updatedDiscussionBoard); //THIS IS NOT WORKING PROPERLY

          refreshComments();

          // Clear the comment input after submission
          setCommentInput('');
        } else {
          console.error('Failed to post comment:', response.err);
          throw new Error('Failed to post comment');
        }
      } else {
        // Handle the case where the comment is empty
        console.warn('Comment cannot be empty.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };
  //these props is the actual comment object
  const handlePinning = async (props) => {
    console.log("handle pinning: ", props)
    try {
      if (props.is_pinned === true) {
        // Post an unpinned comment
        const response = await postUnpinnedComment({
          User_name: props.User_name, // Replace with the actual username or get it from your authentication system
          comment: props.comment_string,
          is_pinned: false,
        });

        //delete the pinned comment from pinned comment backend and from gallery-post attribute backend
        await deletePinnedComment(props.id);
        const discussionBoard = post.discussion_board || [];
        const updatedDiscussionBoard = discussionBoard.filter(comment => comment.id !== props.id);
        updatedDiscussionBoard.push(response.data);
        await updateDiscussionBoard(post.id, updatedDiscussionBoard);
        message.success('Unpinned comment successfully!');
        console.log(props);
      }

      else {
        // Post a pinned comment
        const discussionBoard0 = post.discussion_board || [];
        const updatedDiscussionBoard0 = discussionBoard0.filter(comment => comment.is_pinned == true);
        let x = updatedDiscussionBoard0.length;
        console.log(x);
        if (x + 1 <= maxPinCount) {
          const response = await postPinnedComment({
            User_name: props.User_name,
            comment: props.comment_string,
            is_pinned: true,
          });
          //delete the unpinned comment from unpinned comment backend and from gallery-post attribute backend
          await deleteUnpinnedComment(props.id);
          const discussionBoard = post.discussion_board || [];
          const updatedDiscussionBoard = discussionBoard.filter(comment => comment.id !== props.id);
          updatedDiscussionBoard.push(response.data);
          await updateDiscussionBoard(post.id, updatedDiscussionBoard);
          message.success('Pinned comment successfully!');
        }
        else {
          message.error('Cannot pin more than 3 comments!');
        }
      }

      await refreshComments();

    }
    catch (error) {
      console.error('Error pinning comment:', error.message);
    }
  };

  const handleDelete = async (post, props) => {
    try {
      //delete the comment
      if (props.is_pinned == true) {
        deletePinnedComment(props.id);
      }
      else {
        deleteUnpinnedComment(props.id)
      }
      const discussionBoard = post.discussion_board || [];
      const updatedDiscussionBoard = discussionBoard.filter(comment => comment.id !== props.id);
      await updateDiscussionBoard(post.id, updatedDiscussionBoard);
      await refreshComments();
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const refreshComments = async () => {
    const discussionBoard = post.discussion_board || [];
    const pinnedComments = discussionBoard.filter(comment => comment.is_pinned === true);
    const unpinnedComments = discussionBoard.filter(comment => comment.is_pinned !== true);
    const updatedSortedComments = [...pinnedComments, ...unpinnedComments];
    setSortedComments(updatedSortedComments);
  };

  const handleUpdateComment = async (post, props) => {
    try {
      //update the comment
      const discussionBoard = post.discussion_board || [];
      const updatedDiscussionBoard = discussionBoard.map(comment => {
        if (comment.id === props.id) {
          comment.comment_string = props.comment_string;
        }
        return comment;
      }
      );
      await updateDiscussionBoard(post.id, updatedDiscussionBoard);
      await refreshComments();
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  }

  return (
    <div className='discussion-board'>
      <h3>Discussion</h3>
      <div className='comments'>
        {sortedComments.map((comment, index) => (
          <div key={index} className='comment-box'>
            <label className='comment-username'>{comment.User_name}</label>
            <textarea className='comment-textarea' rows='4' cols='50' value={comment.comment_string} readOnly />
            <div className='comment-buttons'>
              <Button onClick={() => handleUpdateComment(post, comment)}><i className='fa fa-pencil-alt' /></Button>
              <Button onClick={() => handleDelete(post, comment)}><i className='fa fa-trash' /></Button>
              <Button onClick={() => handlePinning(comment)}>{comment.is_pinned ? <i className='fa fa-thumbtack' /> : <i style={{ color: 'red' }} className='fa fa-thumbtack' />}</Button>
            </div>
          </div>
        ))}
      </div>
      <div className='comment-input'>
        <TextArea
          type='text'
          placeholder='Add a comment...'
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button onClick={handleCommentSubmit}>Add Comment</Button>
      </div>
    </div>
  );
};

export default DiscussionBoard;
// NEED TO ADD PINNING BUTTON IN THIS FILE TO REDO THE COMMENTS, I HAVE ADDED A FUNCTION TO HANDLE PINNING AND UNPINNING FOR NOW
// NEED TO ADD COMPLETE DELETE BUTTON
// NEED TO ADD EDIT BUTTON AND FUNCTIONALITY