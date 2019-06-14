import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { ENDPOINT } from "../../lib/stage-client";

const DEFAULT_TIMEOUT_IN_MS = 3000;
const DEFAULT_TIMEOUT_FIRST_DATA_IN_MS = 2000;
const DEFAULT_TIMEOUT_DATA_IN_MS = 5000;
const QUICK_INFO_WIDTH = "20vw";

const StageWrapper = styled.div`
  position: absolute;
  background-size: 50% 50%;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  top: 0;
`;

const ImgWrapper = styled(animated.div)`
  position: relative;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  will-change: left;
`;

const Img = styled.img`
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const OverlayText = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

const Box = styled(animated.div)`
  position: absolute;
  box-sizing: border-box;
  color: #000;
  top: 0;
  width: ${QUICK_INFO_WIDTH};
  height: 100vh;
  padding: 48px;
  background-color: #fff;
  text-align: ${props => props.align}
  left: ${props => props.left}
  will-change: left;
`;
/*
const QuickInfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const QuickInfoText = styled.p`
  
`;

const QuickInfoPrice = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
`;

const QuickInfoPriceOld = styled.p`
  font-weight: 700;
  margin-bottom: 0;
  text-decoration: line-through;
  color: #FF0100;
  font-size: 1.2rem;
  margin-top: 0;
`;

const QuickInfoSku = styled.span`
  font-size: 13px;
  color: #666;
`;*/

const Stage = ({ stage, stageCompleted }) => {

  const [index, setIndex] = useState(-1);

  const scheduleNextData = useCallback(() => {
    // If index is greater than length, then the last box has just left
    if (index >= stage.data.length) {
      console.log('All data displayed');
    }
    // Else schedule switch to next data in constant amount of time
    else {
      setTimeout(() => {
        setIndex(value => (value+1));
      }, index < 0 ? DEFAULT_TIMEOUT_FIRST_DATA_IN_MS : DEFAULT_TIMEOUT_DATA_IN_MS);
    }
  }, [stage.data.length, index]);

  const transitions = useTransition(index, null, {
    from: {left: (index % 2 === 0) ? '-20vw' : '100vw'}, // Even elements are shown left, odd right
    initial: () => {
      // Start the first transition on initial transition
      scheduleNextData();
    },
    enter: {left: (index % 2 === 0) ? '0vw' : '80vw'},
    leave: () => {
      // Then schedule the switch on the leave of each box
      scheduleNextData();
      return {left: (index % 2 === 0) ? '100vw' : '-20vw'} // On leave index is already at the new box, so we need to reverse the odd/even rule
    }
  });

  // If there's no data, show image for a constant amount of time
  useEffect(() => {
    if (!stage.data || stage.data.length === 0) {
      const timeout = setTimeout(() => {
        stageCompleted();
      }, DEFAULT_TIMEOUT_IN_MS);
      return () => clearTimeout(timeout);
    }
  }, [stageCompleted, stage.data, scheduleNextData]);

  // TODO Support stages without media
  if (!stage.media || !stage.media.src) return'';

  return (
    <StageWrapper>
      <ImgWrapper>
        <Img src={(stage.media.src.indexOf("http") === 0 ? '' : ENDPOINT ) + stage.media.src}/>
        {stage.media.overlay && (
          <OverlayText top={stage.media.overlay.positionX} left={stage.media.overlay.positionY}>
            <div>
              <h1>{stage.media.overlay.title}</h1>
              <div dangerouslySetInnerHTML={{__html:stage.media.overlay.text}} />
            </div>
          </OverlayText>
        )}
      </ImgWrapper>
      {transitions.map(({ item, key, props}) => {
        if (item !== null && item > -1 && item < stage.data.length) return (
          <Box
            key={key}
            style={props}>
            {stage.data[item].title}
          </Box>
        );
        else return '';
      })};
    </StageWrapper>
  )
};

export default Stage;