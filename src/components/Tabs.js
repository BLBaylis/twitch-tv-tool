import React from 'react';
import '../styles/Tabs.scss';

const Tabs = (props) => {
	return (
		<div className = "tab-navbar">
			<button className = "tab-navbar--tab__active">FCC Streams</button>
			<button className = "tab-navbar--tab">Twitch Featured</button>
			<button className = "tab-navbar--tab">Brad's Streams</button>
		</div>
	);
}

export default Tabs;