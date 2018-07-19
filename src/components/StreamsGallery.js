import React from 'react';
import OnlineCard from './OnlineCard';
import '../styles/StreamsGallery/StreamsGallery.scss';

const StreamsGallery = (props) => {
	return (
		<div className = "streams-gallery">
			<h2 className = "streams-gallery--heading">xxxxxxx's Recommended Streams</h2>
			<div className = "streams-gallery--navbar">
				<a tabIndex = "0" className = "navbar--btn">Online</a>
				<a tabIndex = "0" className = "navbar--btn navbar--btn__active">All</a>
				<a tabIndex = "0" className = "navbar--btn">Offline</a>
			</div>
			<div className = "streams">
				<OnlineCard/>
				<OnlineCard/>
				<OnlineCard/>
				<OnlineCard/>
				<OnlineCard/>
			</div>
		</div>
	);
}

export default StreamsGallery;