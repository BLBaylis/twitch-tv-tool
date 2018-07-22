import React from 'react';
import StreamCard from './StreamCard';
import NavbarButton from './NavbarButton';
import '../styles/StreamsGallery/StreamsGallery.scss';

class StreamsGallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters : {
				online: true, 
				offline : true
			}
		};
		this.constructStreams = this.constructStreams.bind(this);
		this.navbarActivation = this.navbarActivation.bind(this);
		this.updateFilters = this.updateFilters.bind(this);
	}

	updateFilters(streamType){
		const filterUpdater = this.state.filters;
		if (streamType === "All") {
			filterUpdater.online = true;
			filterUpdater.offline = true;
		} else if (streamType === "Online"){
			filterUpdater.online = true;
			filterUpdater.offline = false;
		} else {
			filterUpdater.online = false;
			filterUpdater.offline = true;
		}	
		this.setState({filters : filterUpdater});
	}

	constructStreams(data, online) {
		data = online ? data.filter(x => x.online) : data.filter(x => !x.online);
		let streams = data.map(x => <StreamCard key = {x.streamName} data = {x} online = {x.online}/>);
		return streams;
	}

	navbarActivation(event) {
		const target = event.target;
		document.getElementsByClassName("navbar--btn__active")[0].classList.remove("navbar--btn__active");
		target.classList.add("navbar--btn__active");
		this.updateFilters(target.innerText);
	}

	render() {
		let renderOnlineStreams = this.state.filters.online ? this.constructStreams(this.props.data, true) : null;
		let renderOfflineStreams = this.state.filters.offline ? this.constructStreams(this.props.data, false) : null;
		console.log(renderOnlineStreams, renderOfflineStreams);
		return (
			<div className = "streams-gallery">
				<h2 className = "streams-gallery--heading">xxxxxxx's Recommended Streams</h2>
				<div className = "streams-gallery--navbar">
					<NavbarButton buttonText = "Online" handler = {this.navbarActivation} className = "navbar--btn"/>
					<NavbarButton buttonText = "All" handler = {this.navbarActivation} className = "navbar--btn navbar--btn__active"/>
					<NavbarButton buttonText = "Offline" handler = {this.navbarActivation} className = "navbar--btn"/>
				</div>
				<div className = "streams-gallery--streams">
					<div className = "streams--stream__online">
						{renderOnlineStreams}
					</div>
					<div className = "streams--stream__offline">
						{renderOfflineStreams}
					</div>
				</div>
			</div>
		);
	}
}

export default StreamsGallery;