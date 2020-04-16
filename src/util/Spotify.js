const clientId = "51e7eb17a15447eea9671c97e3cdbeb9";
// const redirectUri = "http://localhost:3000/";
const redirectUri = "http://asdfghjk.surge.sh/";

let accessToken;

const Spotify = {
  // This method will get a user's access token, so that they can make requests to the Spotify API.
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check for access token match.
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);

      // Set the access token to expire at the value for expiration Time.
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

      // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired.
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return (
      fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        // .then((response) => {
        //   return response.json();
        // })
        .then(
          (response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Request failed!");
          },
          (networkError) => {
            console.log(networkError.message);
          }
        )
        .then((jsonResponse) => {
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        })
    );
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;

    // Get current user's profile: user ID.
    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        // Create a playlist in user's account.
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            // Add tracks to a playlist in user's account.
            return fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackURIs }),
              }
            );
          });
      });
  },
};

export default Spotify;
