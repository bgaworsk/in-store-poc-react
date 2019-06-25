import {configure, observable, action} from 'mobx';
import uuidv4 from 'uuid/v4';
import stageState from './stage';

configure({ enforceActions: "observed" });

const CM_PWA_ID = 'cm-pwa-id';
const DEVICE_ID = "deviceId";

const deviceState = observable.object({

  clientId: '',
  deviceId: '',
  deviceIdConfirmed: false,

  initialiseClientId() {
    // Initialise PWA ID, if not set
    let clientId = window.localStorage.getItem(CM_PWA_ID);
    if (!clientId) {
      // Generate clientId
      clientId =  uuidv4();

      console.log(`Generated new client ID: ${clientId}`);

      // Store clientId
      window.localStorage.setItem('cm-pwa-id', clientId);
    } else {
      deviceState.clientId = clientId;
      console.log(`Client ID: ${clientId}`);
    }
  },

  initialiseDeviceId() {
    this.deviceId = window.localStorage.getItem(DEVICE_ID);
    if (!this.deviceId) {
      this.deviceId = uuidv4();
      this.deviceIdConfirmed = false;
    } else {
      this.deviceIdConfirmed = true;
    }
    console.log(`Device ID: ${this.deviceId}, ${this.deviceIdConfirmed ? 'confirmed' : 'unconfirmed'}`);
  },
  setDeviceId(id) {
    console.log(`Saving device id '${id}' to local storage and confirming it.`);
    window.localStorage.setItem(DEVICE_ID, id);
    this.deviceId = id;
    this.deviceIdConfirmed = true;
  },
  resetDeviceId(){
    console.log(`Removing device id ${this.deviceId} from local storage.`);
    window.localStorage.removeItem(DEVICE_ID);
    stageState.resetPlaylist();
    this.initialiseDeviceId();
  }

}, {

  setDeviceId: action.bound,
  resetDeviceId: action.bound,

});

deviceState.initialiseClientId();
deviceState.initialiseDeviceId();

export default deviceState;