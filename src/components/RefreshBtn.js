import React from 'react';
import '../styles/RefreshBtn.scss';

const RefreshBtn = (props) => {
	return <button className = "refresh-btn" onClick = {props.refresh}>Refresh Streams</button>;
};

export default RefreshBtn;