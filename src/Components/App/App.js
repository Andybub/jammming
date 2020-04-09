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
        {
          name: "name 4",
          artist: "artist 4",
          album: "album 4",
          id: "4",
          uri: "4",
        },
        {
          name: "name 5",
          artist: "artist 5",
          album: "album 5",
          id: "5",
          uri: "5",
        },
        {
          name: "name 6",
          artist: "artist 6",
          album: "album 6",
          id: "6",
          uri: "6",
        },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // 新增歌曲功能
  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }

    this.state.playlistTracks.push(track);

    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  // 移除歌曲功能
  removeTrack(track) {
    let updatedTracks = this.state.playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({ playlistTracks: updatedTracks });
  }

  // 更新歌單名稱
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // 儲存歌單至使用者帳戶
  savePlaylist() {
    alert("This method is linked to the button correctly!");
    let trackURIs = this.state.playlistTracks.map((track) => track.uri);
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
