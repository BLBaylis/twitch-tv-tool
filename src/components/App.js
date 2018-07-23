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
			streams : {
				brad : ["foggedftw2", "boxerpete", "neace", "imaqtpie", "loltyler1", "tobiasfate", "karnrs", "hashinshin", "IWillDominate"],
				fcc : ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
			},
			data : {
				brad : [],
				twitch : [], 
				fcc : []
			},
			currentData : "fcc",
			hideNavbar : false,
			filters : {
				online: true, 
				offline : true
			}
		};
		this.getSingleStreamData = this.getSingleStreamData.bind(this);
		this.sortData = this.sortData.bind(this);
		this.getAllData = this.getAllData.bind(this);
		this.tabsHandler = this.tabsHandler.bind(this);
		this.getTwitchData = this.getTwitchData.bind(this);
		this.sortIndividualTwitchData = this.sortIndividualTwitchData.bind(this);
		this.updateFilters = this.updateFilters.bind(this);
	}

	componentDidMount(){
		this.getAllData("fcc");
		this.getAllData("brad");
		this.getTwitchData();
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

	tabsHandler(event) {
		const target = event.target;
		document.getElementsByClassName("tab-navbar--tab__active")[0].classList.remove("tab-navbar--tab__active");
		target.classList.add("tab-navbar--tab__active");
		this.setState({currentData : target.classList[0]});
		if (target.classList[0] === "twitch"){
			this.setState({hideNavbar : true});
			this.updateFilters("All");
		} else {
			this.setState({hideNavbar : false});
		}
	}

	async getTwitchData() {
		let response = await fetch("https://wind-bow.glitch.me/twitch-api/streams/featured");
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' + response.status + ' for Twitch Featured data');
        	return;
      	}
      	response = await response.json();
      	response = response.featured;
      	for (let i = 0; i < response.length; i++){
      		let sortedData = this.sortIndividualTwitchData(response[i]);
      		const oldData = this.state.data;
        	oldData["twitch"].push(sortedData);
        	const newData = oldData;
        	this.setState({data : newData});
      	}
	}

	sortIndividualTwitchData(data) {
		return {
			streamName : data.stream.channel.display_name,
			streamTitle : data.stream.channel.status,
			game : data.stream.channel.game,
			screenshotLink : data.stream.preview.medium,
			streamURL: data.stream.channel.url,
			viewerCount : data.stream.viewers,
			online : true
		}
	}

	getAllData(recommendedBy) {
		for (let i = 0; i < this.state.streams[recommendedBy].length; i++){
			this.getSingleStreamData(this.state.streams[recommendedBy][i], recommendedBy);
		}
	}

	async getSingleStreamData(streamerName, recommendedBy){
		let response = await fetch("https://wind-bow.glitch.me/twitch-api/streams/" + streamerName);
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' + response.status + ' for ' + streamerName + ' data');
        	return;
      	}
      	response = await response.json();
      	if (response.stream === null) {
      		response = await fetch("https://wind-bow.glitch.me/twitch-api/channels/" + streamerName);
      		response = await response.json();
      		if (response.status !== 200 && typeof response.status !== "string"){
      			console.log('Looks like there was a problem. Status Code: ' + response.status + ' for ' + streamerName + ' data');
        		return;
      		}
      		
      	}
      	const sortedData = this.sortData(response);
        const oldData = this.state.data;
        oldData[recommendedBy].push(sortedData);
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
          			<h1 className="app--title">
          			Brad's <img src={twitch} className="app--title__logo" alt="Twitch logo" /> Tool
          			</h1>
        		</header>
        		<StreamerSearch/>
        		<RefreshBtn/>
        		<section className = "recommended-streams">
        			<Tabs handler = {this.tabsHandler}/>
        			<StreamsGallery 
        				filterObj = {{updateFilters : this.updateFilters,
        					filters : this.state.filters
        				}} 
        				navbar = {this.state.hideNavbar} 
        				data = {this.state.data[this.state.currentData]}
        			/>
        		</section>
        	</div>
    	);
  	}
}

export default App;
