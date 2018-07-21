import React from 'react';
import twitch from '../twitch.svg';
import StreamerSearch from './StreamerSearch';
import RefreshBtn from './RefreshBtn';
import StreamsGallery from './StreamsGallery';
import Tabs from './Tabs';
import '../styles/App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			streams : ["ESL_SC2", "foggedftw2", "loltyler1"],
			data : []
		};
		this.getData = this.getData.bind(this);
		this.sortData = this.sortData.bind(this);
	}

	componentDidMount(){
		this.getData(this.state.streams[0]);
		this.getData(this.state.streams[1]);
		this.getData(this.state.streams[2]);
	}

	async getData(streamerName){
		let response = await fetch("https://wind-bow.glitch.me/twitch-api/streams/" + streamerName);
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' + response.status);
        	return;
      	}
      	response = await response.json();
      	if (response.stream === null) {
      		response = await fetch("https://wind-bow.glitch.me/twitch-api/channels/" + streamerName);
      		response = await response.json();
      		if (response.status !== 200 && typeof response.status !== "string"){
      			console.log('Looks like there was a problem. Status Code: ' + response.status);
        		return;
      		}
      		
      	}
      	const sortedData = this.sortData(response);
        const oldData = this.state.data;
        oldData.push(sortedData);
        const newData = oldData;
        this.setState({data : newData});
	}

	sortData(data) {
		const sortedData = data.stream !== null && data.stream !== undefined ? {
			streamName : data.stream.channel.display_name,
			streamTitle : data.stream.channel.status,
			game : data.stream.channel.game,
			screenshotLink : data.stream.preview.medium,
			streamURL: data.stream.channel.url,
			viewerCount : data.stream.viewers,
			online : true
		} : {
			streamName : data.display_name,
			logo : data.logo,
			streamURL: data.url,
			online : false
		};
		return sortedData;
	}

  	render() {
    	return (
      		<div className="app">
        		<header className="app--header">
          			<h1 className="app--title">Brad's <img src={twitch} className="app--title__logo" alt="Twitch logo" /> Tool</h1>
        		</header>
        		<StreamerSearch/>
        		<RefreshBtn/>
        		<section className = "recommended-streams">
        			<Tabs/>
        			<StreamsGallery data = {this.state.data}/>
        		</section>
        	</div>
    	);
  	}
}

export default App;
