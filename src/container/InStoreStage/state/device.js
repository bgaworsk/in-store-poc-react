import {configure, observable, action} from 'mobx';
import uuidv4 from 'uuid/v4';

configure({ enforceActions: "observed" });

const CM_PWA_ID = 'cm-pwa-id';
const DEVICE_ID = "deviceId";

const deviceState = observable.object({

  clientId: '',
  deviceId: '',

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
    console.log(`Device ID: ${this.deviceId}`);
  },
  setDeviceId(id) {
    console.log(`Saving device id '${id}' to local storage.`);
    window.localStorage.setItem(DEVICE_ID, id);
    this.deviceId = id;
  }

}, {

  setDeviceId: action.bound

});

deviceState.initialiseClientId();
deviceState.initialiseDeviceId();

export default deviceState;