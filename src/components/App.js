import React from 'react';
import twitch from '../twitch.svg';
import StreamerSearch from './StreamerSearch';
import RecommendedStreams from './RecommendedStreams';
import '../styles/App.scss';

class App extends React.Component {
  	render() {
    	return (
      	<div className="app">
        	<header className="app--header">
          		<h1 className="app--title">Brad's <img src={twitch} className="app--title__logo" alt="Twitch logo" /> Tool</h1>
        	</header>
        	<StreamerSearch/>
        	<RecommendedStreams/>
      	</div>
    	);
  	}
}

export default App;
