import React from 'react';
import StreamCard from './StreamCard';
import '../styles/StreamsGallery/StreamsGallery.scss';

class StreamsGallery extends React.Component {
	constructor(props) {
		super(props);
		this.constructStreams = this.constructStreams.bind(this);
	}

	constructStreams(data, online) {
		data = online ? data.filter(x => x.online) : data.filter(x => !x.online);
		let streams = data.map(x => <StreamCard key = {x.streamName} data = {x} online = {x.online}/>);
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
				<div className = "streams-gallery--streams">
					<div className = "streams--stream__online">
						{this.constructStreams(this.props.data, true)}
					</div>
					<div className = "streams--stream__offline">
						{this.constructStreams(this.props.data, false)}
					</div>

				</div>
			</div>
		);
	}
}

export default StreamsGallery;