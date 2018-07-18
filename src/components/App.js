import React from 'react';
/*import logo from './logo.svg';*/
import '../styles/App.scss';

class App extends React.Component {
  	render() {
    	return (
      	<div className="App">
        	<header className="App-header">
          		{/*<img src={logo} className="App-logo" alt="logo" />*/}
          		<h1 className="App-title">Brad's Twitch Tool</h1>
        	</header>
      	</div>
    	);
  	}
}

export default App;
