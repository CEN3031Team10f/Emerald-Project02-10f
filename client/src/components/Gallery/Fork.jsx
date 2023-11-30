import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {handleSave} from"../ActivityPanels/Utils/helpers";
import BlocklyCanvasPanel from "../ActivityPanels/BlocklyCanvasPanel/BlocklyCanvasPanel";
import BlocklyPage from "../../views/BlocklyPage/BlocklyPage";
import StudentCanvas from "../ActivityPanels/BlocklyCanvasPanel/canvas/StudentCanvas";

function Fork( props ) {


const workspaceRef = useRef(null);
	let ReplayRef = useRef(null);
	//This can navigate page to /sandbox 
	const navigate = useNavigate();
	const isSandbox = true;
	const showModal = () => {
		setTimeout(() => {
        window.location.href = `/workspaceGallery`;
		}, 2000);
    };
	
	let heads = props;
	let tempID= heads.GO.id *10000;  
	heads.GO.id = tempID;
	
ReplayRef.current ={
      xml: heads.GO.xml_text,
      action: "type",
      blockId: 1,
      blockType: "controls_if",
      timestamp: Date.now(),
      clicks: 1,
    };
	workspaceRef.current = heads.GO;
	
	let localActivity =  handleSave (tempID,  heads.GO, ReplayRef);
			localStorage.setItem('sandbox-activity', JSON.stringify(heads.GO));
	
	function handleFork(e) {

		alert("id:"+tempID);
		alert("forked");
		console.log("XML:"+ props.GO.xml_text);

	
		showModal();
	}
	
	
	
	/*useEffect(() => {
		
	
	
	

		
	},[]);
*/
	return (
		<>
		
		<button className="fork-button" onClick={(e) => { handleFork(e) }}>
			<i className='fa fa-code-branch' />
		</button>
		
		</>

	);
} export default Fork;

