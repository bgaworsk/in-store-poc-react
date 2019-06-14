import React, { useEffect } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import stageState from '../state/stage';
import deviceState from '../state/device';
import colors from '../../../lib/coremedia-colors';
import Stage from './Stage';
import logo from '../Loader/logo.svg'

const StagesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: no-repeat center url(${logo});
  background-size: 50% 50%;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  will-change: opacity;
`;

const Code = styled.code`
  background-color: ${colors.gray};
  color: ${colors.purple};
  padding: 4px;
  border-radius: 4px;
`;

const Stages = ({ loaderIsHidden }) => {

  const playlistId = stageState.playlistId;

  /*const transitions = useTransition(
    stageState.availableStages.length > 0 && stageState.availableStages[index],
    item => item && item.id,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses,
    }
  );*/

  // Fetch playlist, if required
  useEffect(() => {
    if (stageState.playlistId === null) {
      stageState.fetchPlaylist(deviceState.deviceId, deviceState.clientId);
    }
  }, [playlistId]);

  //const nextStage = () => void setIndex(index => (index+1) % stageState.availableStages.length);

  if (stageState.playlistId && stageState.availableStages.length === 0) {
    return <p>No stages for device ID <Code>{deviceState.deviceId}</Code></p>;
  }

  else if (stageState.playlistId) {
      return (
        <StagesWrapper>
          {stageState.availableStages.map((stage, key) => <Stage key={key} stage={stage} />)}
        </StagesWrapper>
      )
  }

  else return <p>Loading stage …</p>;
};

export default observer(Stages);