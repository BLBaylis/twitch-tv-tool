import React from 'react';
import OnlineCard from './OnlineCard';
import '../styles/StreamsGallery/StreamsGallery.scss';

class StreamsGallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data : [
				{
					streamName : "ESL_SC2",
					streamTitle : "RERUN: Rogue [Z] vs. Classic [P] - GRAND FINAL - IEM Katowice 2018",
					game : "StarCraft 2",
					screenshotLink : "https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_sc2-320x180.jpg",
					viewerCount : 444,
					online : true

				}
			]
		};
		this.constructStreams = this.constructStreams.bind(this);
	}

	constructStreams(data) {
		console.log("constructStreams ran");
		let streams = data.map(x => <OnlineCard key = {x.streamName} data = {x} />);
		console.log(streams);
		return streams;
	}

	render() {
		return (
			<div className = "streams-gallery">
				<h2 className = "streams-gallery--heading">xxxxxxx's Recommended Streams</h2>
				<div className = "streams-gallery--navbar">
					<a tabIndex = "0" className = "navbar--btn">Online</a>
					<a tabIndex = "0" className = "navbar--btn navbar--btn__active">All</a>
					<a tabIndex = "0" className = "navbar--btn">Offline</a>
				</div>
				<div className = "streams">
					{this.constructStreams(this.state.data)}
				</div>
			</div>
		);
	}
}

export default StreamsGallery;