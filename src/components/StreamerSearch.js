import React from "react";
import "../styles/StreamerSearch.scss";
import fetchData from "../fetchData";
import sortNonTwitchData from "../sortNonTwitchData";
import StreamCard from "./StreamCard";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

class StreamerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: ""
    };
    this.getSearchedStream = this.getSearchedStream.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.closeStream = this.closeStream.bind(this);
  }

  async getSearchedStream(event) {
  	const searchBar = document.getElementsByTagName("input")[0];
    if (event.target === searchBar && event.keyCode !== 13) {
      return;
    }
    const streamNames = this.state.data.map(x => x.streamName);
    if (streamNames.indexOf(searchBar.value.toLowerCase()) !== -1) {
      this.setState({ input: "" });
      return;
    }
    let search = await fetchData("/streams", "/" + searchBar.value);
    if (search.stream === null) {
      search = await fetchData("/channels", "/" + searchBar.value);
      if (search === false) {
        console.log(searchBar.value + " not found");
        this.setState({ input: "" });
        return;
      }
    }
    let newData = Object.assign([], this.state.data);
    newData.push(sortNonTwitchData(search));
    this.setState({ data: newData, input: "" });
  }

  closeStream(event) {
    const target = event.target;
    let data = Object.assign([], this.state.data);
    data = data.filter(x => x.streamName !== target.classList[0]);
    this.setState({ data });
  }

  constructStreams(data, online) {
    data = online ? data.filter(x => x.online) : data.filter(x => !x.online);
    let streams = data.map(x => (
      <StreamCard
        close={this.closeStream}
        filter={"all"}
        search={"search"}
        key={x.streamName}
        data={x}
        online={x.online}
      />
    ));
    return streams;
  }

  updateInput(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    const searchResults =
      this.state.data.length > 0 ? (
        <div className="streamer-search--search-results">
          {this.constructStreams(this.state.data, true)}
          {this.constructStreams(this.state.data, false)}
        </div>
      ) : null;
    return (
      <section className="streamer-search">
      	<div className = "streamer-search--search-bar-wrapper">
        	<input
          		className="streamer-search--search-bar"
          		onChange={this.updateInput}
          		onKeyUp={this.getSearchedStream}
          		type="search"
          		placeholder="Streamer Name..."
          		value={this.state.input}
        	/>
        	<button onClick = {this.getSearchedStream} className="streamer-search--search-button">
        		<FontAwesomeIcon 
        		icon="search"
        		size = "2x"
        		/>
        	</button>
        </div>
        {searchResults}
      </section>
    );
  }
}

export default StreamerSearch;
