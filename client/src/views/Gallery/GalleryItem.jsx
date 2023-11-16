import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './GalleryItem.less';
import Like from './like';
import Fork from './Fork';
import thumbnailImage from './thumbnail.png';
import thumbnailsImage from './thumbnails.png';
import DiscussionBoard from './DiscussionBoard';

//Wrapper item needs to be a useState for it to get dynamically rendered

const GalleryItem = (props) => {
    const [visible, setVisible] = useState(false);
    const title = props.item.Title || 'Titlex';


    const temp = "viewCounts" + props.Id ? props.Id : 0;
    const [viewCounts, setViewCounts] = useState(
        JSON.parse(localStorage.getItem(temp)) || 0
    );

    /*const [viewCounts, setViewCounts] = useState(() => {
      const storedViewCounts = JSON.parse(localStorage.getItem('viewCounts'));
      return storedViewCounts || {};
    });*/


    const showModal = () => {
        setVisible(true);
        setViewCounts((prevCount) => prevCount + 1);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        setVisible(false);
    };

    useEffect(() => {
        localStorage.setItem(temp, JSON.stringify(viewCounts));
    }, [viewCounts]);




    return (
        <>
            <div className='galleryItem' tabIndex={0} onClick={() => { showModal() }}>
                <div className='header'><div>{title}</div></div>
<img src={thumbnailsImage} style={{ backgroundColor: 'red' }} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator:</p>
                        <p>{props.item.User_name}</p>
                        <p>Posted:</p>
                        <p>{props.item.PostedTime}</p>
                        <p>Views: {viewCounts}</p>
                    </div>
                    <div className='flex flex-column justify-end'>
                        <p>7  5</p>
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
                            <img src={thumbnailImage} className='ooIMG'></img>
                        </div>
                        <div className='flex flex-column'>
                            <DiscussionBoard />
                            <Like> </Like>
							<Fork props={props} />
                        </div>

                    </div>
                </Modal>
            </div>
        </>
    );
}

export default GalleryItem;
