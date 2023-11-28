import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
//import { Route, Routes } from 'react-router-dom';
//import BlocklyPage from '../BlocklyPage/BlocklyPage';
//import PrivateRoute from '../../Utils/PrivateRoute'


function Fork({ props }) {


	//This can navigate page to /sandbox 
	const navigate = useNavigate();

	function handleFork(e) {
		//navigate to  /sandbox
		//Should pass xml to the sandbox
		navigate('/sandbox');
	}

	/*
	//form Student.jsx probably not useful 
	  const [learningStandard, setLessonModule] = useState({});
	
	useEffect(() => {
	const fetchData = async () => {
	  try {
		const res = await getStudentClassroom();
		if (res.data) {
		  if (res.data.lesson_module) {
			setLessonModule(res.data.lesson_module);
		  }
		} else {
		  message.error(res.err);
		}
	  } catch {}
	};
	fetchData();
  }, []);
	*/
	return (

		<button className="fork-button" onClick={(e) => { handleFork(e) }}>
			<i className='fa fa-code-branch' />
		</button>

	);
} export default Fork;