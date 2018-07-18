import React from 'react';

const OnlineCard = (props) => {
	return (
		<div className = "featured-streamer">
			<a className = "status">
        		<h3>THIS WILL BE A STREAM TITLE</h3>
        	</a>
        	<h4>Currently playing : 
        		<a>THIS WILL BE A GAME NAME</a>
        	</h4>
          	<a className = "img-anchor">
          		<img className = "img" alt = "Screenshot of stream"></img>
          	</a>
          	<br/>
          	<h4>
          		<a>THIS WILL CONTAIN VIEWER COUNT AND STREAMER NAME</a>
          	</h4>
         </div>
	);
};

export default OnlineCard;