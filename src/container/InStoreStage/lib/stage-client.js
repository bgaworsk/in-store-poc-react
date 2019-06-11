export const ENDPOINT = "https://preview-1901.livecontext.coremedia.com";

export default {

  fetchPlaylistJSON(deviceId, clientId) {

    return fetch(`${ENDPOINT}/instore/${deviceId}/playlist?clientId=${clientId}`)
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        console.warn("Unable to reach endpoint");
        return null;
      });

  },

  prefetchMedia(items) {
    items.map(item => {
      const mediaSrc = item.media.src;
      if (mediaSrc) {
        let uri = (mediaSrc.indexOf("http") === 0 ? '' : ENDPOINT ) + mediaSrc;
        fetch(uri).then(() => {
          console.info(`Prefetched media for uri ${uri}`);
        });
      }
      return '';
    });
  }

}