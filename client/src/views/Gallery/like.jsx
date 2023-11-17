import React, { useState } from 'react';
import likeImage from './like.png';
import unlikedImage from './unlike.png';

const Like = (props) => {
    const inital_like_count = props.like_count || 0;
    const [like_count, set_like_count] = useState(inital_like_count);
    const [liked, set_liked] = useState(false);

    function like_feature(e) {
        e.stopPropagation();

        if (!liked) {
            set_like_count(like_count + 1);
        } else {
            set_like_count(like_count - 1);
        }
        set_liked(!liked); // Toggle the liked state
    }

    return (
		    <>
            <button className="like-button" onClick={(e) => { like_feature(e) }}>
                <img src={liked ? likeImage : unlikedImage} alt="Like" />
            </button> 
			<p>Likes: {like_count}</p>
			</>
    );
}

export default Like;