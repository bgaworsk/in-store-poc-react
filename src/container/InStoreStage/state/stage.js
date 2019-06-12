import {configure, observable, action, runInAction} from 'mobx';
import client from '../lib/stage-client'

configure({ enforceActions: "observed" });

const stageState = observable.object({

  currentStage: null,
  currentStageIndex: -1,
  availableStages: [],
  playlistId: null,

  fetchPlaylist(deviceId, clientId) {
    client.fetchPlaylistJSON(deviceId, clientId).then(
      playlist => runInAction(() => {
        if (!playlist) {
          console.warn('Loaded playlist is empty');
          this.playlistId = -1;
          return;
        }
        this.playlistId = playlist.id;
        this.availableStages = playlist.items;

        client.prefetchMedia(playlist.items);

        console.log(`Loaded playlist ${this.playlistId}`, playlist.items);
      }));
  },

  nextStage() {
    if (this.availableStages.length > 0) {
      this.currentStageIndex = ++this.currentStageIndex % this.availableStages.length;
      this.currentStage = this.availableStages[this.currentStageIndex];
      console.log('Transitioning to stage', this.currentStageIndex);
    }
  }

}, {

  fetchPlaylist: action,
  nextStage: action.bound

});

export default stageState;