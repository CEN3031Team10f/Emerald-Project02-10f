import React, { useState } from 'react';
import { updateLikeCount } from '../../Utils/requests';
import { Button } from 'antd';

const Like = (props) => {
    const inital_like_count = props.likeCount.like_count || 0;
    const [like_count, set_like_count] = useState(inital_like_count);
    const [liked, set_liked] = useState(false);
    const [heart, setHeart] = useState(<i className='fa fa-heart' />);

    const postId = props.likeCount.id

    function like_feature(e) {
        e.stopPropagation();

        if (!liked) {
            updateLikeCount(postId, like_count + 1);
            setHeart(<i style={{ color: "red" }} className='fa fa-heart' />);
        } else {
            updateLikeCount(postId, like_count - 1);
            setHeart(<i className='fa fa-heart' />);
        }

        set_like_count(like_count + (liked ? -1 : 1));
        set_liked(!liked); // Toggle the liked state
    }

    return (
        <>
            <Button title='Like this project' className="like-button" onClick={(e) => { like_feature(e) }}>
                {heart}
            </Button>
            <p>Likes: {like_count}</p>
        </>
    );
}

export default Like;