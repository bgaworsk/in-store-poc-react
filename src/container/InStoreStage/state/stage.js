import {configure, observable, action, runInAction, computed} from 'mobx';
import client from '../lib/stage-client';
import demoData from './demo.json';

configure({ enforceActions: "observed" });

const stageState = observable.object({

  availableStages: [],
  playlistId: null,

  fetchPlaylist(deviceId, clientId) {
    client.fetchPlaylistJSON(deviceId, clientId).then(
      playlist => runInAction(() => {
        if (!playlist) {
          console.warn('Loaded playlist is empty, falling back to demo date, using', demoData.items);
          this.availableStages = demoData.items;
          this.playlistId = demoData.id;
          return;
        }
        this.availableStages = playlist.items;
        this.playlistId = playlist.id;

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
  },

  get availableStagesWithMedia() {
    return this.availableStages.filter(stage => stage.media && stage.media.src);
  }

}, {

  fetchPlaylist: action,
  nextStage: action.bound,
  availableStagesWithMedia: computed

});

export default stageState;