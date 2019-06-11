import React, { useState, useEffect } from 'react';
import {observer} from 'mobx-react';
import stageState from '../state/stage';
import deviceState from '../state/device';

const Stage = () => {

  useEffect(() => {
    if (stageState.playlist.length === 0) {
      stageState.fetchPlaylist(deviceState.deviceId);
    }
  }, [])

  return <p>Stage</p>
}

export default observer(Stage);