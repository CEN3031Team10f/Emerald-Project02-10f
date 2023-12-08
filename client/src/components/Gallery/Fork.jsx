//@ts-check

import React from 'react';
import { Button } from 'antd';


/**
 * 
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setExpand setter for boolean which determines to show the fork editor or not
 * @returns 
 */
function Fork({ setExpand }) {


	return (

		<Button title='Fork this Project' className="fork-button" onClick={() => { setExpand(true) }}>
			<i className='fa fa-code-branch' />
		</Button>

	);
} export default Fork;