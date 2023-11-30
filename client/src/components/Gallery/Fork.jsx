import React from 'react';
import { Button } from 'antd';

function Fork({ setExpand }) {


	return (

		<Button title='Fork this Project' className="fork-button" onClick={() => { setExpand(true) }}>
			<i className='fa fa-code-branch' />
		</Button>

	);
} export default Fork;