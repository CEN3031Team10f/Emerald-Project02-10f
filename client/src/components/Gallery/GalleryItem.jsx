import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './GalleryItem.less';
import Like from './like';
import DiscussionBoard from './DiscussionBoard';
import { updateViewCount } from '../../Utils/requests';

//Wrapper item needs to be a useState for it to get dynamically rendered

const GalleryItem = (props) => {
    const [visible, setVisible] = useState(false);
    const title = props.Title || 'Title';
    const creator = props.User_name || 'Creator Name';
    const viewCount = props.view_count || 0;
    const posted = props.posted?.substr(0, 10) || 'Posted Date';

    const [viewCounts, setViewCounts] = useState(viewCount);

    const showModal = () => {
        setVisible(true);
        updateViewCount(props.id, viewCount + 1)
        setViewCounts(props.view_count + 1);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        setVisible(false);
    };

    return (
        <>
            <div className='galleryItem' tabIndex={0} onClick={() => { showModal() }}>
                <div className='header'><div>{title}</div></div>
                <img style={{ backgroundColor: 'red' }} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator: {creator}</p>
                        <p>Posted: {posted}</p>
                        <p>Views: {viewCounts}</p>
                    </div>
                    <div className='flex flex-column justify-end'>
                    </div>
                </div>
            </div>
            <div className='gallery-modal-holder'>
                <Modal
                    className='galleryItem-expanded'
                    title={title}
                    open={visible}
                    onCancel={handleCancel}
                    width='90vw'
                    maskClosable={false}
                    cancelText='Close'
                    footer={null}
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img className='ooIMG'></img>
                        </div>
                        <div className='flex flex-column'>
                            <DiscussionBoard />
                            <Like likeCount={props}> </Like>
                        </div>

                    </div>
                </Modal>
            </div>
        </>
    );
}

export default GalleryItem;