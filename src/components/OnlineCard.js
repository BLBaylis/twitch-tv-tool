import React from 'react';
import '../styles/OnlineCard.scss'

const OnlineCard = (props) => {
	return (
		<div className = "online-card">
			<a className = "online-card--status">
        		<h3>THIS WILL BE A STREAM TITLE</h3>
        	</a>
        	<h4>Currently playing : 
        		<a>THIS WILL BE A GAME NAME</a>
        	</h4>
          	<a className = "online-card--img-link">
          		<img className = "online-card--img" alt = "Screenshot of stream"></img>
          	</a>
          	<br/>
          	<h4>
          		<a>THIS WILL CONTAIN VIEWER COUNT AND STREAMER NAME</a>
          	</h4>
         </div>
	);
};

export default OnlineCard;