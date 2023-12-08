import React, { useState, useEffect } from 'react';
import thumbnailImage from './thumbnail.png';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    /** 
     * This used to show a modal, but now it just redirects to the item page
    */
    const showModal = () => {
        navigate(`/gallery/item/${id}`);
    };
    /**
     * If enter key is pressed, open object
     * @param {KeyboardEvent} event 
     */
    function handleItemEnterKeydown(event) {
        if (event.code === "NumpadEnter" || event.code === "Enter") {
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