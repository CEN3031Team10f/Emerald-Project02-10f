import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";
import SearchBar from './Search';
import FilterComponent from './FilterComponent';
//testing GalleryItems
import testings from "./testing";

const Gallery = () => {

    const [filterText, setFilterText] = useState("");

    function filterUpdate(value) {
        setFilterText(value);
    }

    let testing = testings;


    testing = testing.filter((records) => {
        return records.User_name.toLowerCase().includes(filterText.toLowerCase()) || records.Title.toLowerCase().includes(filterText.toLowerCase());
    });




    //Detect if the project is clicked. 
    //should change the red block to the img of galleryItem in the future.
    const recordList = testing.map((directory) => {
        return (
            <div key={directory.Id}>
                <GalleryItem item={directory}
                    Id={directory.Id}
                />
            </div>
        );
    });




    return (
        <>
            <NavBar />
            <div className='container nav-padding'>
                <h1>Gallery</h1>
                <SearchBar filterUpdate={filterUpdate} />
                <div className='flex flex-row'>
                    <FilterComponent />
                    {recordList}
                </div>
            </div>
        </>
    );
}

export default Gallery;