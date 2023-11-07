import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { createPortal } from 'react-dom';
//import ExpandedGalleryItem from './ExpandedGalleryItem';
import './GalleryItem.less';

//Wrapper item needs to be a useState for it to get dynamically rendered

const GalleryItem = (props) => {
    const [visible, setVisible] = useState(false);
    const title = props.title || 'Title';

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        setVisible(false);
    };

    return (
        <>
            <div className='galleryItem' onClick={() => { showModal() }}>
                <div className='header'><div>{title}</div></div>
                <img style={{ backgroundColor: 'red' }} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator:</p>
                        <p>Creator Name</p>
                        <p>Posted:</p>
                        <p>Posted Date</p>
                    </div>
                    <div className='flex flex-column justify-end'>
                        <p>7  5</p>
                    </div>
                </div>
            </div>
            <div className='gallery-modal-holder'>
                <Modal
                    title={title}
                    open={visible}
                    onCancel={handleCancel}
                    width='50vw'
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img className='ooIMG'></img>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default GalleryItem;