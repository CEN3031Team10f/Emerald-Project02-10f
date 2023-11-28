import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "../../components/Gallery/GalleryItem";
import SearchBar from '../../components/Gallery/Search';
import FilterComponent from '../../components/Gallery/FilterComponent';
//testing GalleryItems
import { getGalleryObjects } from '../../Utils/requests';
import './Gallery.less';
import { useGlobalState } from '../../Utils/userState';

const Gallery = () => {

    /*The gallery page will need to have lazy loading implemented
    Therefore, we need to store ALL gallery objects, all which have been loaded (for searching), 
    and all which are being rendered currently (for lazy loading)
     */
    const [value] = useGlobalState('currUser');
    const [galleryObjects, setGalleryObjects] = useState(undefined);
    const [renderedGalleryItems, setRenderedGalleryItems] = useState(undefined);
    const [loadedGalleryItems, setLoadedGalleryItems] = useState(undefined);

    function filterUpdate(value, loadedGalleryItems) {
        const filteredGalleryItems = loadedGalleryItems?.filter((item) => {
            return item.props.Title.toLowerCase().includes(value.toLowerCase()) || item.props.User_name.toLowerCase().includes(value.toLowerCase());
        });
        renderInRows(filteredGalleryItems);
    }

    // Check box filters
    function applyFilters(types, visibility, loadedGalleryItems) {
        getGalleryObjects().then((response) => { // Backend

            // Go through all gallery items
            const x = Math.min(12, galleryObjects.length);
            let tempItems = [];
            try {
                for (let i = 0; i < x; i++) {
                    const it = galleryObjects[i];

                    // Logic for getting the filtered items
                    if (
                        ((visibility.Public == true && it.visibility == "Public") ||
                            (visibility.Organization == true && it.visibility == "Organization") ||
                            (visibility.Classroom == true && it.visibility == "Classroom") ||
                            (!visibility.Public && !visibility.Organization && !visibility.Classroom)) &&

                        ((types.Block == true && it.type == "Block") ||
                            (types.Lesson == true && it.type == "Lesson") ||
                            (types.Project == true && it.type == "Project") ||
                            (!types.Block && !types.Lesson && !types.Project))

                    ) {

                            tempItems.push(
                                <GalleryItem 
                                    id={it.id} 
                                    Title={it.Title} 
                                    User_name={it.User_name} 
                                    like_count={it.like_count} 
                                    view_count={it.view_count} 
                                    posted={it.updated_at} 
                                    discussion_board={it.discussion_board} 
                                    visibility={it.visibility} />
                                );
                    }
                }

            } catch (e) {
                console.log("FAILED");
                console.log("Error in gallery objects");
                console.log(e);
                console.log(tempItems);
            }

            renderInRows(tempItems);
        });
    }

    function renderInRows(items) {
        let rows = [];
        let row = [];
        for (let i = 0; i < items.length; i++) {
            if (value.role !== "Default User" || items[i].props.visibility === "Public") {
                //Default user can only access public, others can access all
                row.push(items[i]);
            }
            if (row.length === 4) {
                rows.push(<div key={"row" + i} className="flex flex-row galleryRows">{row}</div>);
                row = [];
            }
        }
        if (row.length > 0) {
            rows.push(<div key={"row" + items.length} className="flex flex-row galleryRows">{row}</div>);
        }
        setRenderedGalleryItems(rows);
    }

    useEffect(() => {
        getGalleryObjects().then((response) => {
            setGalleryObjects(response.data);
            //Convert gallery objects into JSX gallery items
            //x is the max number of gallery items to display on load
            const x = Math.min(12, response.data?.length || 0);
            let tempItems = [];
            try {
                for (let i = 0; i < x; i++) {
                    const it = response.data[i];
                    tempItems.push(<GalleryItem id={it.id} Title={it.Title} User_name={it.User_name} like_count={it.like_count} view_count={it.view_count} posted={it.updated_at} discussion_board={it.discussion_board} visibility={it.visibility} />);
                }
            } catch (e) {
                console.log("Error in gallery objects");
                console.log(e);
                console.log(tempItems);
            }
            setLoadedGalleryItems(tempItems);
            renderInRows(tempItems);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <>
            < NavBar />
            <div className='container nav-padding'>
                <h1>Gallery</h1>
                <SearchBar filterUpdate={filterUpdate} loadedGalleryItems={loadedGalleryItems} />
                <div className='flex flex-row'>
                    <div className='flex flex-column filterCol'>
                        <FilterComponent onFilterChange={applyFilters} loadedGalleryItems={loadedGalleryItems} />
                    </div>
                    <div className='flex flex-column'>
                        {renderedGalleryItems}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Gallery;