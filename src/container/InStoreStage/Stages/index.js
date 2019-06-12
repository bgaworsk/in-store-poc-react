import React, { useEffect } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import { TimelineMax } from 'gsap/all';
import stageState from '../state/stage';
import deviceState from '../state/device';
import colors from '../../../lib/coremedia-colors';
import Stage from './Stage';
import logo from '../Loader/logo.svg'

const StageWrapper = styled.div`
  position: relative;
  background: no-repeat center url(${logo});
  background-size: 50% 50%;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const Code = styled.code`
  background-color: ${colors.gray};
  color: ${colors.purple};
  padding: 4px;
  border-radius: 4px;
`;

const Stages = ({ loaderIsHidden }) => {

  const playlistId = stageState.playlistId;



  // Fetch playlist, if required
  useEffect(() => {
    if (stageState.playlistId === null) {
      stageState.fetchPlaylist(deviceState.deviceId, deviceState.clientId);
    }
  }, [playlistId]);

  if (stageState.playlistId && stageState.availableStages.length === 0) {
    return <p>No stages for device ID <Code>{deviceState.deviceId}</Code></p>;
  }

  else if (stageState.playlistId) {
    const mainTimeline = new TimelineMax({
      repeat: 0,
      delay: .7,
      paused: true,
      yoyo: true,
      autoRemoveChildren: true
    });

    let timelineCallbackCount = 0;

    const addToMainTimeline = (label, timeline) => {
      console.log('Adding to main timeline', label, timeline);
      mainTimeline.addLabel(label);
      mainTimeline.add(timeline);
      if (++timelineCallbackCount === stageState.availableStages.length) {
        console.log('Starting main timeline');
      }
    }

    // Render each state to the DOM and add their timeline to the main timeline
    return (
      <StageWrapper>
        {stageState.availableStages.map((stage, index) => {
          const media = stage.media;
          const data = stage.data;

          if (!media.src) return'';

          return (
            <Stage
              key={index}
              mediaSrc={media.src}
              overlay={media.overlay}
              data={data}
              duration={stage.duration}
              addToMainTimeline={addToMainTimeline}/>
          )
        })}
        </StageWrapper>
    )
  }

  else return <p>Loading stage …</p>;
};

export default observer(Stages);