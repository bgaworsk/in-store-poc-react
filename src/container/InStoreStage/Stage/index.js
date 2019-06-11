import React, { useEffect } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import stageState from '../state/stage';
import deviceState from '../state/device';
import colors from '../../../lib/coremedia-colors';

const Code = styled.code`
  background-color: ${colors.gray};
  color: ${colors.purple};
  padding: 4px;
  border-radius: 4px;
`;

const Stage = ({ loaderIsHidden }) => {

  useEffect(() => {
    if (stageState.playlist.length === 0) {
      stageState.fetchPlaylist(deviceState.deviceId);
    }
  }, [])

  if (stageState.playlist && stageState.playlist.items && stageState.playlist.items.length === 0) {
    return <p>Stage for device ID <Code>{deviceState.deviceId}</Code> is empty</p>;
  }

  else if (stageState.playlist && stageState.playlist.items) {
    return <p>Stage has {stageState.playlist.items.length} elements and the is hidden: {loaderIsHidden ? 'true' : 'false'}</p>
  }

  else return '';
}

export default observer(Stage);