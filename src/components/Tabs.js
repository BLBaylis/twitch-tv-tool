import React from 'react';
import '../styles/Tabs.scss';

const Tabs = (props) => {
	return (
		<div className = "tab-navbar">
			<button onClick = {props.handler} className = "FCC tab-navbar--tab tab-navbar--tab__active">FCC Streams</button>
			<button onClick = {props.handler} className = "Twitch tab-navbar--tab">Twitch Featured</button>
			<button onClick = {props.handler} className = "Brad tab-navbar--tab">Brad's Streams</button>
		</div>
	);
}

export default Tabs;