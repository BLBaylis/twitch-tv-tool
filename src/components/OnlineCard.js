import React from 'react';
import '../styles/OnlineCard.scss'

const OnlineCard = (props) => {
	return (
		<div className = "online-card">
			<a className = "online-card--status">
        		<h3>{props.data.streamTitle}</h3>
        	</a>
        	<h4>Currently playing : 
        		<a>{props.data.game}</a>
        	</h4>
          	<a className = "online-card--img-link">
          		<img className = "online-card--img" src = {props.data.screenshotLink} alt = "Screenshot of stream"></img>
          	</a>
          	<br/>
          	<h4>
          		<a>{props.data.viewerCount + " viewers on " + props.data.streamName}</a>
          	</h4>
         </div>
	);
};

export default OnlineCard;