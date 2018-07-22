import React from 'react';
import '../styles/StreamsGallery/StreamsGallery.scss';

const NavbarButton = (props) => {
	return <a tabIndex = "0" onClick = {props.handler} className = {props.className}>{props.buttonText}</a>;
}

export default NavbarButton;