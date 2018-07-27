import React from 'react';
import '../styles/StreamCard.scss'

const StreamCard = (props) => {
	if (props.online === false){
		return (
			<div className = "offline-card--outer">
				{props.search === true ? <button onClick = {props.close} className = {props.data.streamName + " offline-card--close"}>&times;</button> : null}
				<div className = "offline-card--inner">
					<h3 className = "offline-card--status">
						<a target = "_blank" rel = "noopener noreferrer" href = {props.data.streamURL}>{props.data.streamName}</a> is offline!
     				</h3>
     				<a className = "offline-card--logo-anchor" target = "_blank" rel = "noopener noreferrer" href = {props.data.streamURL}>
     					<img className = "offline-card--logo" alt = "logo" src = {props.data.logo}/>
     				</a>
     			</div>
     		</div>
		);
	} else {
		return (
			<div className = "online-card--outer">
				{props.search === true ? <button onClick = {props.close} className = {props.data.streamName + " online-card--close"}>&times;</button> : null}
				<div className = "online-card--inner">
					<a className = "online-card--status" href = {props.data.streamURL}>
	        			<h3 className = "status--link">{props.data.streamTitle}</h3>
	        		</a>
	        		<h4>Currently playing : 
	        			<a href = {props.data.streamURL}>{" " + props.data.game}</a>
	        		</h4>
	          		<a className = "online-card--img-link" href = {props.data.streamURL}>
	          			<img className = "online-card--img" src = {props.data.screenshotLink} alt = "Screenshot of stream"></img>
	          		</a>
	          		<h4 className = "online-card--viewers">{props.data.viewerCount} viewers on 
	          			<a href = {props.data.streamURL}> {props.data.streamName}</a>
	          		</h4>
	        	 </div>
	         </div>
		);
	}
};

export default StreamCard;