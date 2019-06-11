import React, { useEffect } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import stageState from '../state/stage';
import deviceState from '../state/device';
import colors from '../../../lib/coremedia-colors';
import Stage from './Stage';

const Code = styled.code`
  background-color: ${colors.gray};
  color: ${colors.purple};
  padding: 4px;
  border-radius: 4px;
`;

const Stages = ({ loaderIsHidden }) => {

  const playlistId = stageState.playlistId;

  useEffect(() => {
    if (stageState.playlistId === null) {
      stageState.fetchPlaylist(deviceState.deviceId);
    }
  }, [playlistId]);

  if (stageState.playlistId && stageState.availableStages.length === 0) {
    return <p>No stages for device ID <Code>{deviceState.deviceId}</Code></p>;
  }

  else if (stageState.playlistId) {
    // Load first stage
    if (stageState.currentStageIndex < 0) {
      stageState.nextStage();
    }
    const media = stageState.currentStage.media;
    const data = stageState.currentStage.data;

    if (!media.src) return'';

    return (
      <Stage
        mediaSrc={media.src}
        overlay={media.overlay}
        data={data}
        duration={stageState.currentStage.duration}
        transitionToNextStage={() => stageState.nextStage()}/>
    )
  }

  else return <p>Loading stage …</p>;
};

export default observer(Stages);