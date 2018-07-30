import React from 'react';
import sortNonTwitchData from '../sortNonTwitchData';
import fetchData from '../fetchData';
import twitch from '../twitch.svg';
import StreamerSearch from './StreamerSearch';
import RefreshBtn from './RefreshBtn';
import StreamsGallery from './StreamsGallery';
import Tabs from './Tabs';
import '../styles/App.scss';
import {throttle, debouncer} from 'lodash-es';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			streams : {
				brad: ["foggedftw2", "boxerpete", "neace", "imaqtpie", "loltyler1", "tobiasfate", "karnrs", "hashinshin", "IWillDominate"],
				fcc : ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
			},
			data : {      
				brad  : [],
				twitch: [], 
				fcc   : []
			},
			currentData : "FCC",
		};
		this.getTwitchData       = this.getTwitchData.bind(this);
		this.getNonTwitchData    = this.getNonTwitchData.bind(this);
		this.getAllData          = this.getAllData.bind(this);
		this.getAllNonTwitchData = this.getAllNonTwitchData.bind(this);
		this.tabsHandler         = this.tabsHandler.bind(this);
		this.dataThrottle        = throttle(this.getAllData.bind(this), 1000);
	}

	componentDidMount(){
		this.getAllData();
	}

	tabsHandler(event) {
		const target = event.target;
		document.getElementsByClassName("tab-navbar--tab__active")[0].classList.remove("tab-navbar--tab__active");
		target.classList.add("tab-navbar--tab__active");
		this.setState({currentData : target.classList[0]});
		if (target.classList[0] === "Twitch"){
			this.setState({hideNavbar : true});
		} else {
			this.setState({hideNavbar : false});
		}
	}

	async getTwitchData() {
		let data = await fetchData("/streams", "/featured");
		const extractedData = data.featured.map(x => ({
				streamName : x.stream.channel.display_name,
				streamTitle : x.stream.channel.status,
				game : x.stream.channel.game,
				screenshotLink : x.stream.preview.medium,
				streamURL: x.stream.channel.url,
				viewerCount : x.stream.viewers,
				online : true
			})
		);
		const newData = Object.assign({}, this.state.data);
		newData["twitch"] = extractedData;
		this.setState({data : newData});
	};

	async getNonTwitchData(streamerName, recommendedBy) {
		let data =  await fetchData("/streams", "/" + streamerName);
		if (data.stream === null) {
      		data = await fetchData("/channels", "/" + streamerName);
      		if (data === false) {
      			console.log(streamerName + " not found");
      			return;
      		}   		
      	}
      	const sortedData = sortNonTwitchData(data);
        const newData = Object.assign({}, this.state.data);
        newData[recommendedBy].push(sortedData);
        this.setState({data : newData});
	}

	getAllNonTwitchData(recommendedBy) {
		for (let i = 0; i < this.state.streams[recommendedBy].length; i++){
			this.getNonTwitchData(this.state.streams[recommendedBy][i], recommendedBy);
		}
	}

	async getAllData() {
		this.setState({data : {      
				brad  : [],
				twitch: [], 
				fcc   : []
			},
		});
		this.getAllNonTwitchData("fcc");
		this.getAllNonTwitchData("brad");
		this.getTwitchData();
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
        		<RefreshBtn refresh = {this.dataThrottle}/>
        		<section className = "recommended-streams">
        			<Tabs handler = {this.tabsHandler}/>
        			<StreamsGallery 
        				navbar = {this.state.hideNavbar} 
        				data = {this.state.data[this.state.currentData.toLowerCase()]}
        				currentData = {this.state.currentData}
        			/>
        		</section>
        	</div>
    	);
  	}
}

export default App;
