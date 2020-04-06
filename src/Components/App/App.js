import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: "name 1", artist: "artist 1", album: "album 1", id: "1" },
        { name: "name 2", artist: "artist 2", album: "album 2", id: "2" },
        { name: "name 3", artist: "artist 3", album: "album 3", id: "3" },
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        { name: "name 4", artist: "artist 4", album: "album 4", id: "4" },
        { name: "name 5", artist: "artist 5", album: "album 5", id: "5" },
        { name: "name 6", artist: "artist 6", album: "album 6", id: "6" },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }

    this.state.playlistTracks.push(track);

    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
