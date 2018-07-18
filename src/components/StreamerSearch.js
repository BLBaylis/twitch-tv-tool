import React from 'react';
import '../styles/StreamerSearch.scss';

class StreamerSearch extends React.Component {
	render(){
		return (
			<section className = "streamer-search">
				<input className = "streamer-search--search-bar" type = "text" placeholder = "Search"/>
				<div className = "streamer-search--search-result-section"></div>
			</section>
		);
	}
}

export default StreamerSearch;