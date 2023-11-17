import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getGalleryObject } from '../../Utils/requests';
import Like from './like';
import Share from './Share';
import Fork from './Fork';
import DiscussionBoard from './DiscussionBoard';
import './GalleryItemExpanded.less';

const GalleryItemExpanded = () => {
    const path = window.location.pathname;
    const galleryId = path.substring(path.lastIndexOf("/item/") + 6).replace(/\D/g, '');
    const [galleryObject, setGalleryObject] = useState(undefined);
    const [render, setRender] = useState(<p>Loading...</p>);
    const [titleHeading, setTitleHeading] = useState("Gallery Item Expanded");
    const notFoundMessage = (
        <div className='flex flex-row'>
            <div className='flex flex-column discussion-col'>
                <p id='notFound'>Could not find that item. Why not <a href="/gallery/">return to Gallery</a>?</p>
            </div>
        </div>);

    async function fetchObject() {
        const response = await getGalleryObject(galleryId);
        if (response.data === undefined || response.data === null) {
            setRender(notFoundMessage);
            return;
        }
        setGalleryObject(response.data);
        setTitleHeading(response.data.Title);
        setRender(
            <div className='flex flex-row'>
                <div className='flex flex-column'>
                    <img className='ooIMG'></img>
                </div>
                <div className='flex flex-column discussion-col'>
                    <div className='flex flex-row' style={{ height: 80 + "%" }}>
                        <div className='flex flex-column'>
                            <DiscussionBoard />
                        </div>
                    </div>
                    <div className='flex flex-row justify-end buttons-row'>
                        <div className='flex flex-column'>
						
							<Fork galleryObject={galleryObject} /> 
							<Share galleryObject={galleryObject} /> 
							<Like likeCount={0} /> 
							
							
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //this will run once, on page load, to fetch the gallery object
    useEffect(() => {
        if (galleryId === null || galleryId === undefined || galleryId === "") {
            setRender(notFoundMessage)
        }
        else {
            fetchObject();
        }
    }, []);

    return (
        <>
            <NavBar />
            <div className='flex flex-row'>
                <div className='flex flex-column justify-center'>
                    <div onClick={() => { window.location.href = "/gallery" }} className='return-button'>
                        <p>Return to Gallery ⬇️</p>
                    </div>
                </div>
                <div className='flex flex-column'>
                    <div className='container nav-padding'>
                        <div className='flex flex-row'>
                            <div className='flex flex-column content-col'>
                                <div className='pageHeader'><h1>{titleHeading}</h1></div>
                                {render}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default GalleryItemExpanded;
