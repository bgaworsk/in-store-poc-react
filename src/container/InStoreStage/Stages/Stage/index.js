import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { ENDPOINT } from "../../lib/stage-client";

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
`;

const Stage = ({ stage, opacity, visibility, stageCompleted }) => {
  useEffect(() => {
    // If no data is to be displayed, show stage for 3 seconds
    //if (!data || data.length === 0) {
    const timeout = setTimeout(() => {
      console.log('Completed stage', stage);
      stageCompleted();
    }, 3000);
    return () => clearTimeout(timeout);
    /*}
    // Else show data box for each
    else {
      console.log('I have', data.length);
      //const timeout = setTimeout(() => onComplete(), 3000);
      //return () => clearTimeout(timeout);
    }*/
  }, [stageCompleted]);

  // TODO Support stages without media
  if (!stage.media || !stage.media.src) return'';

  /*
  const props = useSpring({
    from: {left: '-20px'},
    to: async next => {
      while(1){
        await next({left: '0px'});
        await next({left: '-20px'});
      }
    },
    //onRest: onComplete
  });*/

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

    </StageWrapper>
  )
};

export default Stage;