import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';
import client from '../../../lib/stage-client'

const VideoPlayer = styled.video`
  min-width: 100%;
  min-height: 100%;
  width: 100%;
`;

const Video = ({ stage, stageCompleted }) => {

  const videoPlayer = useRef(null);
  useEffect(() => videoPlayer.current.play() && undefined, [videoPlayer]);

  return (
    <VideoPlayer
      autoPlay={false}
      loop={false}
      controls={false}
      onEnded={() => stageCompleted()}
      ref={videoPlayer}
      src={client.formatMediaUrl(stage.media.src)}/>
  );
}

export default Video;