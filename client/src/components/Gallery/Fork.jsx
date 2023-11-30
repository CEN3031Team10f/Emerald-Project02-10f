import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

function Fork({ galleryObject }) {


	//This can navigate page to /sandbox 
	const navigate = useNavigate();

	function handleFork(e) {
		//navigate to  /workspace
		//Should pass xml to the workspace
		localStorage.setItem('gallery-xml', (galleryObject.xml_text));
		localStorage.setItem('gallery-item-name', (galleryObject.Title));
		navigate('/gallery/canvas');
	}

	return (

		<button className="fork-button" onClick={(e) => { handleFork(e) }}>
			<i className='fa fa-code-branch' />
		</button>

	);
} export default Fork;