const ENDPOINT = "https://preview-1901.livecontext.coremedia.com";

export default {

  fetchPlaylistJSON(deviceId) {

    return fetch(`${ENDPOINT}/instore/${deviceId}/playlist`)
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        console.warn("Unable to reach endpoint");
        return null;
      });

  }

}