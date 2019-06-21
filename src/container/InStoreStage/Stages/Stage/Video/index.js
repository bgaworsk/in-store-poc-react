import React from 'react'
import styled from 'styled-components';
import client from '../../../lib/stage-client'

const VideoPlayer = styled.video`
  min-width: 100vw;
  min-height: 100vh;
`;

const Video = ({ stage, stageCompleted }) => (
  <VideoPlayer
    autoPlay={true}
    loop={false}
    controls={false}
    onEnded={() => stageCompleted()}
    src={client.formatMediaUrl(stage.media.src)}/>
);

export default Video;