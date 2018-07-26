import React from 'react';
import '../styles/StreamerSearch.scss';
import fetchData from '../fetchData';
import sortNonTwitchData from '../sortFunctions';
import StreamCard from './StreamCard';

class StreamerSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data : [],
			input : ""
		}
		this.getSearchedStream = this.getSearchedStream.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.closeStream = this.closeStream.bind(this);
	};

	async getSearchedStream(event) {
		const target = event.target;
  		if (event.keyCode !== 13){
 			return;
  		}
  		let search = await fetchData("/streams", "/" + target.value);
  		if (search.stream === null) {
  			search = await fetchData("/channels", "/" + target.value);
  		}
  		let data = this.state.data;
  		data.push(sortNonTwitchData(search));
  		this.setState({data, input : ""});

	}

	closeStream(event) {
		const target = event.target;
		let data = this.state.data;
		data = data.filter(x => x.streamName !== target.classList[0]);
		this.setState({data});
	}

	constructStreams(data, online) {
		data = online ? data.filter(x => x.online) : data.filter(x => !x.online);
		let streams = data.map(x => <StreamCard close = {this.closeStream} search = {true} key = {x.streamName} data = {x} online = {x.online}/>);
		return streams;
	}

	updateInput(event) {
		this.setState({input : event.target.value});
	}

	render(){
		const searchResults = this.state.data.length > 0 ? (
			<div className = "streamer-search--search-results">
				<div className = "search-result-section__online">
					{this.constructStreams(this.state.data, true)}
				</div>
				<div className = "search-result-section__offline">
					{this.constructStreams(this.state.data, false)}
				</div>
			</div>) : null;
		return (
			<section className = "streamer-search">
				<input 
				className = "streamer-search--search-bar" 
				onChange = {this.updateInput}
				onKeyUp = {this.getSearchedStream} 
				type = "text" 
				placeholder = "Search"
				value = {this.state.input}
				/>
				{searchResults}
			</section>
		);
	}
}

export default StreamerSearch;