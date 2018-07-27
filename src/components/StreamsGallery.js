import React from 'react';
import StreamCard from './StreamCard';
import NavbarButton from './NavbarButton';
import '../styles/StreamsGallery/StreamsGallery.scss';

class StreamsGallery extends React.Component {
	constructor(props) {
		super(props);
		this.constructStreams = this.constructStreams.bind(this);
		this.navbarHandler = this.navbarHandler.bind(this);
	}

	constructStreams(data, online) {
		data = online ? data.filter(x => x.online) : data.filter(x => !x.online);
		let streams = data.map(x => <StreamCard filter = {this.props.filterObj.filter.toLowerCase()} search = {false} key = {x.streamName} data = {x} online = {x.online}/>);
		return streams;
	}

	navbarHandler(event) {
		const target = event.target;
		document.getElementsByClassName("navbar--btn__active")[0].classList.remove("navbar--btn__active");
		target.classList.add("navbar--btn__active");
		this.props.filterObj.updateFilter(target.innerText);
	}

	render() {
		let twitchTest = this.props.currentData === "Twitch";
		let renderNavbar = this.props.navbar ? null : 
		(<div className = "streams-gallery--navbar">
			<NavbarButton buttonText = "Online" handler = {this.navbarHandler} className = "navbar--btn"/>
			<NavbarButton buttonText = "All" handler = {this.navbarHandler} className = "navbar--btn navbar--btn__active"/>
			<NavbarButton buttonText = "Offline" handler = {this.navbarHandler} className = "navbar--btn"/>
		</div>);
		return (
			<div className = "streams-gallery">
				<h2 className = "streams-gallery--heading">{this.props.currentData + "'s Recommended Streams"}</h2>
				{renderNavbar}
				<div className = "streams-gallery--streams">
					{(!twitchTest && this.props.filterObj.filter === "All") && <div className = "streams--stream__all">
						{this.constructStreams(this.props.data, true)}
						{this.constructStreams(this.props.data, false)}
					</div>}
				{(this.props.filterObj.filter === "Online" || twitchTest) && <div className = "streams--stream__online">
					{this.constructStreams(this.props.data, true)}
				</div>}
					{this.props.filterObj.filter === "Offline" && <div className = "streams--stream__offline">
						{this.constructStreams(this.props.data, false)}
					</div>}
				</div>
			</div>
		);
	}
}

export default StreamsGallery;