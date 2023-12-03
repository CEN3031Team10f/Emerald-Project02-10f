import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getGalleryObject, updateViewCount, updateLikeCount } from '../../Utils/requests';
import Like from '../../components/Gallery/like';
import Share from '../../components/Gallery/Share';
import Fork from '../../components/Gallery/Fork';
import DiscussionBoard from '../../components/Gallery/DiscussionBoard';
import './GalleryItemExpanded.less';
import UpdateVisibilityForm from '../../components/Gallery/UpdateVisibilityForm';
import GalleryCanvas from '../../components/ActivityPanels/BlocklyCanvasPanel/canvas/GalleryCanvas';
import { Button } from 'antd';


const GalleryItemExpanded = () => {
    const path = window.location.pathname;
    const galleryId = path.substring(path.lastIndexOf("/item/") + 6).replace(/\D/g, '');
    const [galleryObject, setGalleryObject] = useState({});
    const [render, setRender] = useState(<p>Loading...</p>);
    const [titleHeading, setTitleHeading] = useState("Gallery Item Expanded");
    const [expand, setExpand] = useState(false);


    const notFoundMessage = (
        <div className='flex flex-row'>
            <div className='flex flex-column discussion-col'>
                <p id='notFound'>Could not find that item. Why not <a href="/gallery/">return to Gallery</a>?</p>
            </div>
        </div>);

    async function fetchObject() {
        const response = await getGalleryObject(galleryId);
        if (!response.data || response.data === null) {
            setRender(notFoundMessage);
            return;
        }
        setGalleryObject(response.data);
        setTitleHeading(response.data.Title);
        localStorage.setItem('gallery-xml', (response.data.xml_text));
        await updateViewCount(response.data.id, response.data.view_count + 1);
        setRender(
            <div className='flex flex-row'>
                <div className='flex flex-column'>
                    <div className={(expand ? "exp " : "") + "ooIMG"}><GalleryCanvas editing={expand} /></div>
                </div>
                <div className={(expand ? "exp " : "") + 'flex flex-column discussion-col'}>
                    {<Button className='close-fork' onClick={() => setExpand(false)}>Close Fork Editor</Button>}
                    <div className='flex flex-row' style={{ height: 80 + "%" }}>
                        <div className='flex flex-column'>
                            <DiscussionBoard post={response.data} />
                            <UpdateVisibilityForm />
                        </div>
                    </div>
                    <div className='flex flex-row justify-end buttons-row'>
                        <div className='flex flex-column'>
                            <Fork galleryObject={response.data} setExpand={setExpand} />
                            <Share title={response.data.Title} />
                            <Like likeCount={response.data} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function handleGalleryEscape(event) {
        if (event.keyCode === 27) {
            window.location.href = '/gallery/';
        }
    }

    //this will run once, on page load, to fetch the gallery object
    useEffect(() => {
        if (galleryId === null || galleryId === undefined || galleryId === "") {
            setRender(notFoundMessage)
        }
        else {
            fetchObject();
        }
        //bind listener to escape key to return to gallery
        document.addEventListener('keydown', handleGalleryEscape);
        return () => {
            document.removeEventListener('keydown', handleGalleryEscape);
        };
    }, [expand]);

    return (
        <>
            <NavBar />
            <div onKeyDown={handleGalleryEscape} className='flex flex-row'>
                <div className='flex flex-column justify-center'>
                    <button tabIndex={0} onClick={() => { window.location.href = "/gallery" }} className='return-button'>
                        <p>Return to Gallery ⬇️</p>
                    </button>
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
