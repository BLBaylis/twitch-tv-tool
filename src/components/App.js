import React from 'react';
import sortNonTwitchData, {sortTwitchData} from '../sortFunctions';
import fetchData from '../fetchData';
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
			currentData : "FCC",
			hideNavbar : false,
			filters : {
				online: true, 
				offline : true
			}
		};
		this.getTwitchData = this.getTwitchData.bind(this);
		this.getNonTwitchData = this.getNonTwitchData.bind(this);
		this.getAllData = this.getAllData.bind(this);
		this.getAllNonTwitchData = this.getAllNonTwitchData.bind(this);
		this.tabsHandler = this.tabsHandler.bind(this);
		this.updateFilters = this.updateFilters.bind(this);
	}

	componentDidMount(){
		this.getAllData();
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
		if (target.classList[0] === "Twitch"){
			this.setState({hideNavbar : true});
			this.updateFilters("All");
		} else {
			this.setState({hideNavbar : false});
		}
	}

	async getTwitchData() {
		let data = await fetchData("/streams", "/featured");
		for (let i = 0; i < data.featured.length; i++){
      		let sortedData = sortTwitchData(data.featured[i]);
      		const oldData = this.state.data;
        	oldData["twitch"].push(sortedData);
        	const newData = oldData;
        	this.setState({data : newData});
      	}
	}

	async getNonTwitchData(streamerName, recommendedBy) {
		let data =  await fetchData("/streams", "/" + streamerName);
		if (data.stream === null) {
      		data = await fetchData("/channels", "/" + streamerName);
      		/*Run a check for if the fetch was successful, maybe status before json()?*/     		
      	}
      	const sortedData = sortNonTwitchData(data);
        const oldData = this.state.data;
        oldData[recommendedBy].push(sortedData);
        const newData = oldData;
        this.setState({data : newData});
	}

	getAllData() {
		this.getAllNonTwitchData("fcc")
		this.getAllNonTwitchData("brad");
		this.getTwitchData();
	}


	getAllNonTwitchData(recommendedBy) {
		for (let i = 0; i < this.state.streams[recommendedBy].length; i++){
			this.getNonTwitchData(this.state.streams[recommendedBy][i], recommendedBy);
		}
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
        				data = {this.state.data[this.state.currentData.toLowerCase()]}
        				currentData = {this.state.currentData}
        			/>
        		</section>
        	</div>
    	);
  	}
}

export default App;
