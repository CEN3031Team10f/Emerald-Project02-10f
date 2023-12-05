import React, { useState } from 'react';
import thumbnailImage from './thumbnail.png';
//Wrapper item needs to be a useState for it to get dynamically rendered
const GalleryItem = (props) => {
    const title = props.Title || 'Title';
    const creator = props.User_name || 'Creator Name';
    const likeCount = props.like_count || 0;
    const viewCount = props.view_count || 0;
    const posted = props.posted?.substr(0, 10) || 'Posted Date';
    const id = props.id || 0;
    const [viewCounts, setViewCounts] = useState(viewCount);
    const type = props.type || 'Type';
    const showModal = () => {
        window.location.href = `/gallery/item/${id}`;
    };
    function handleItemEnterKeydown(event) {
        if (event.keyCode === 13) {
            showModal();
        }
    }
    return (
        <>
            <div className='galleryItem' tabIndex={0} onKeyDown={handleItemEnterKeydown} onClick={() => { showModal() }}>
                <div className='header'><div>{title}</div></div>
                <img src={thumbnailImage} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator: {creator}</p>
                        <p>Posted: {posted}</p>
                        <p>Views: {viewCounts}</p>
                        <p></p>
                    </div>
                    <div className='flex flex-column justify-end'>
                    </div>
                </div>
            </div>
        </>
    );
}
export default GalleryItem;