import React, { useState, useEffect } from 'react';
import thumbnailsImage from './thumbnails.png';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';


function Share({ title }) {
	let shareLink = window.location.href;
	const [visible, setVisible] = useState(false);
	const [buttonMessage, setButtonMessage] = useState('Copy the link!');

	const showModal = () => {
		setVisible(true);
	}

	const handleCancel = () => {
		setVisible(false);
		setButtonMessage('Copy the link!');
	};

// browser native share function
	function handleShare(e) {
		const shareData = {
			title: 'Code Sparks: ' + title,
			text: 'Check out this awesome code I made using Code Sparks!',
			url: shareLink,
		};
		if (navigator.canShare(shareData)) {
			navigator.share(shareData);
		}
		else {
			showModal();
		}
	}

//if the users' browsers do not native share function
	function handleCopyClick() {
		  const shareData = `Check out this awesome code I made using Code Sparks!\nCode Sparks: ${title}\n${shareLink}`;
		navigator.clipboard.writeText(shareData)
			.then(() => {
				setButtonMessage('Copied!');
			})
			.catch((error) => {
				setButtonMessage('Failed to copy! Refresh the page and try again.');
			});
	}

	return (
		<>
			<Button title='Share this project' className="share-button" onClick={(e) => { handleShare(e) }}>
				<i className='fa fa-share' />
			</Button>

			<div className='gallery-modal-holder'>
				<Modal
					open={visible}
					width='50vw'
					onCancel={handleCancel}
					maskClosable={true}
					cancelText='Close'
					footer={null}
				>
					<div className='flex flex-row'>
						<div className='flex flex-column'>
							<img src={thumbnailsImage} style={{ height: '200px' }} />
						</div>
						<div className='flex flex-column' style={{ 'margin-left': '30px' }}>
							<h1 style={{ fontSize: '32px' }}>Code Sparks: {title}</h1>
							<p style={{ fontSize: '20px' }}> Share your masterpiece with friends! </p>
							<p>Link: {shareLink}</p>
							<button onClick={handleCopyClick}>{buttonMessage}</button>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
} 
	Share.propTypes = {
  title: PropTypes.string.isRequired, 
};
export default Share;

