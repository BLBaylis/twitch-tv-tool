import React from 'react';
import '../styles/RefreshBtn.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSyncAlt);



const RefreshBtn = (props) => {
	return (<button className = "refresh-btn" onClick = {props.refresh}>
				<FontAwesomeIcon className = "refresh-icon" icon="sync-alt" spin = {props.refreshSpin}/>Refresh Streams
			</button>);
};

export default RefreshBtn;