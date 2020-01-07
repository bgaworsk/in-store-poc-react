import React, { useState, useCallback, useEffect } from 'react'
import {animated, useSpring, useTransition} from 'react-spring'
import ReactResizeDetector from 'react-resize-detector'
import client from '../../../lib/stage-client'
import styled from 'styled-components'

const DEFAULT_TIMEOUT_IN_MS = 10000;
const DEFAULT_TIMEOUT_FIRST_DATA_IN_MS = 2000;
const DEFAULT_TIMEOUT_DATA_IN_MS = 5000;
const QUICK_INFO_WIDTH = "20vw";

const ImgWrapper = styled(animated.div)`
  position: relative;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  will-change: left;
`;

const Img = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const OverlayText = styled.div`
  position: absolute;
  top: ${props => (props.top)}%;
  left: ${props => props.left}%;
  font-size: calc(${props => props.width} * .02);
  text-shadow: 0 0 10px rgba(0,0,0,0.8);
  
  h1 {
    font-size: calc(${props => props.width} * .05);
  }
  .p--heading-1 {
    font-size: calc(${props => props.width} * .05);
  } 
  .align--center {
    text-align: center;
  }
`;

const Box = styled(animated.div)`
  position: absolute;
  box-sizing: border-box;
  color: #000;
  top: 0;
  width: ${QUICK_INFO_WIDTH};
  height: 100%;
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

const Image = ({ stage, stageCompleted }) => {

  const [index, setIndex] = useState(-1);

  const scheduleNextData = useCallback(() => {
    // If index is greater than length, then the last box has just left
    if (index >= stage.data.length) {
      // All data is displayed, call next stage after timeout
      setTimeout(() => stageCompleted(), DEFAULT_TIMEOUT_FIRST_DATA_IN_MS);
    }
    // Else schedule switch to next data in constant amount of time, if data is available
    else if (index >= 0) {
      setTimeout(() => {
        setIndex(value => (value+1));
      }, index < 0 ? DEFAULT_TIMEOUT_FIRST_DATA_IN_MS : DEFAULT_TIMEOUT_DATA_IN_MS);
    }
  }, [stage.data.length, index, stageCompleted]);

  const transitions = useTransition(index, null, {
    // Even elements are shown left, odd right
    from: {left: (index % 2 === 0) ? '-20vw' : '100vw'},
    initial: () => {
      // Start the first transition on initial transition
      scheduleNextData();
    },
    enter: {left: (index % 2 === 0) ? '0vw' : '80vw'},
    leave: () => {
      // Then schedule the switch on the leave of each box
      scheduleNextData();
      // On leave index is already at the new box, so we need to reverse the odd/even rule
      return {left: (index % 2 === 0) ? '100vw' : '-20vw'}
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

  const imgWrapperProps = useSpring({
    from: { left: '0vw' },
    to: {
      left: index < 0 || index >= stage.data.length
        ? '0vw'
        : index % 2 === 0 ? '20vw' : '-20vw'
    }
  });

  return (
    <>
      <ImgWrapper style={imgWrapperProps}>
        <Img src={client.formatMediaUrl(stage.media.src)}/>
        {stage.media.overlay && (
          <ReactResizeDetector handleHeight>
            {({ width }) => (
              <OverlayText top={stage.media.overlay.positionX} left={stage.media.overlay.positionY} width={`${width}px`}>
                <div>
                  {stage.media.overlay.title && <h1>{stage.media.overlay.title}</h1>}
                  <div dangerouslySetInnerHTML={{__html:stage.media.overlay.text}} />
                </div>
              </OverlayText>
            )}
          </ReactResizeDetector>
        )}
      </ImgWrapper>
      {transitions.map(({ item, key, props}) => {
        if (item !== null && item > -1 && item < stage.data.length) return (
          <Box
            key={key}
            style={props}>
            {stage.data[item].title}
          </Box>
        )
        else return '';
      })}
    </>
  )

}

export default Image;