import React, { useState, useEffect } from 'react';
import thumbnailsImage from './thumbnails.png';
import { Modal, Button } from 'antd';

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

	/**
	 * Opens the native share dialog if the browser supports it, otherwise opens a modal
	 */
	function handleShare() {
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

	/**
	 * Copies the share link to the user's clipboard and update button message
	 */
	function handleCopyClick() {
		navigator.clipboard.writeText(shareLink)
			.then(() => {
				setButtonMessage('Copied!');
			})
			.catch((error) => {
				setButtonMessage('Failed to copy! Refresh the page and try again.');
			});
	}

	return (
		<>
			<Button title='Share this project' className="share-button" onClick={() => { handleShare() }}>
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
							<h1 style={{ fontSize: '32px' }}>CASMM: {title}</h1>
							<p style={{ fontSize: '20px' }}> Share your masterpiece with friends! </p>
							<p>Link: {shareLink}</p>
							<button onClick={handleCopyClick}>{buttonMessage}</button>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
} export default Share;