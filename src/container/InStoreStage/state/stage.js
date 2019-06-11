import {configure, observable, action, runInAction} from 'mobx';
import client from '../lib/stage-client'

const stageState = observable.object({

  mainTimeline: [],
  currentStage: [],
  playlist: [],

  fetchPlaylist(deviceId) {
    client.fetchPlaylistJSON(deviceId).then(playlist => runInAction(() => {this.playlist = playlist; console.log(playlist)}));
  }

}, {

  fetchPlaylist: action

});

export default stageState;