import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from './Image';
import Video from './Video';

const MEDIA_TYPE_MAPPING = {
  IMAGE: Image,
  VIDEO: Video
};

const StageWrapper = styled.div`
  position: absolute;
  background-size: 50% 50%;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  overflow: hidden;
`;

const Stage = ({ stage, stageCompleted }) => {

  const Media = MEDIA_TYPE_MAPPING[stage.media.type];

  useEffect(() => {
    if (!Media) {
      const timeout = setTimeout(() => stageCompleted(), 1000);
      return () => clearTimeout(timeout);
    }
  }, [Media, stageCompleted]);

  if (!Media) {
    console.error('Could not load stage for media type', stage.media.type);
    return '';
  }

  return (
    <StageWrapper onClick={() => stageCompleted()}>
      <Media stage={stage} stageCompleted={stageCompleted} />
    </StageWrapper>
  );

};

export default Stage;