import axios from 'axios'

export const ENDPOINT = "https://preview-1901.livecontext.coremedia.com";

// Default request options
const axiosConfig = {
  headers: {
    'Content-type': 'application/json'
  }
};

const addClientHeader = clientId => { return { ...axiosConfig, headers: { ...axiosConfig.headers, 'X-CM-CLIENT': clientId } } };

export default {

  fetchPlaylistJSON(deviceId, clientId) {

    return axios.get(
      `${ENDPOINT}/instore/${deviceId}/playlist`,
      addClientHeader(clientId)
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.warn("Unable to reach endpoint", error);
        return null;
      });

  },

  prefetchMedia(items) {
    items.map(item => {
      const mediaSrc = item.media && item.media.src;
      if (mediaSrc) {
        let uri = (mediaSrc.indexOf("http") === 0 ? '' : ENDPOINT ) + mediaSrc;
        axios.get(uri).then(() => {
          console.info(`Prefetched media for uri ${uri}`);
        });
      }
      return '';
    });
  },

  formatMediaUrl(url) {
    return (url.indexOf("http") === 0 ? '' : ENDPOINT ) + url;
  }

}