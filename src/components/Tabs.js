import React from 'react';
import '../styles/Tabs.scss';

const Tabs = (props) => {
	return (
		<div className = "tab-navbar">
			<button onClick = {props.handler} className = "fcc tab-navbar--tab tab-navbar--tab__active">FCC Streams</button>
			<button onClick = {props.handler} className = "twitch tab-navbar--tab">Twitch Featured</button>
			<button onClick = {props.handler} className = "brad tab-navbar--tab">Brad's Streams</button>
		</div>
	);
}

export default Tabs;