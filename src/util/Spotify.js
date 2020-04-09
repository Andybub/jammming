const clientId = "51e7eb17a15447eea9671c97e3cdbeb9";
const redirectUri = "http://localhost:3000/";

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
};

export default Spotify;
