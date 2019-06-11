import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimelineMax, Power2 } from 'gsap/all';
import { ENDPOINT } from "../../lib/stage-client";
import logo from "../../Loader/logo.svg";

const QUICK_INFO_WIDTH = "20vw";

const StageWrapper = styled.div`
  position: relative;
  background: no-repeat center url(${logo});
  background-size: 50% 50%;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const ImgWrapper = styled.div`
  position: relative;
  opacity: 0;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
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

const Box = styled.div`
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

const Stage = ({ mediaSrc, overlay, data, transitionToNextStage, duration }) => {
  const [imgWrapper, setImgWrapper] = useState(null);
  const [stageWrapper, setStageWrapper] = useState(null);

  useEffect(() => {
    if (!imgWrapper || !stageWrapper) return;

    // Setup stageTimeline for stage
    const mainTimeline = new TimelineMax({
      repeat: 0,
      delay: .7,
      paused: true,
      onComplete: transitionToNextStage,
      yoyo: true,
      autoRemoveChildren: true
    });

    // Blend in image
    mainTimeline.to(imgWrapper, 2, {opacity: 1, delay: .5});

    // Default timeline, no display data available
    if (data.length < 1) {
      mainTimeline.to(stageWrapper, duration > 0 ? duration : 3, {left: 0, ease: Power2.easeInOut, delay: 2});
    }
    // Else show quick infos
    else {
      mainTimeline.to(stageWrapper, 3, {left: QUICK_INFO_WIDTH, ease: Power2.easeInOut, delay: 2});
      mainTimeline.to(stageWrapper, 3, {left: 0, ease: Power2.easeInOut, delay: 2});
      mainTimeline.to(stageWrapper, 3, {left: `-${QUICK_INFO_WIDTH}`, ease: Power2.easeInOut, delay: 2});
      mainTimeline.to(stageWrapper, 3, {left: 0, ease: Power2.easeInOut, delay: 2});
    }

    // Blend out image
    mainTimeline.to(imgWrapper, .5, {opacity: 0});

    // Start timeline
    mainTimeline.resume();

    // Kill stageTimeline on component detach
    return () => mainTimeline.kill();
  }, [imgWrapper, transitionToNextStage, duration, stageWrapper, mediaSrc, data]);

  return (
    <StageWrapper ref={element => setStageWrapper(element)}>
      <ImgWrapper ref={element => setImgWrapper(element)} >
        <Img src={(mediaSrc.indexOf("http") === 0 ? '' : ENDPOINT ) + mediaSrc}/>
        {overlay && (
          <OverlayText top={overlay.position.top} left={overlay.position.left}>
            <div>
              <h1>{overlay.title}</h1>
              <span>{overlay.text}</span>
            </div>
          </OverlayText>
        )}
      </ImgWrapper>
      {data.map((item, index) => (
        <Box
          key={index}
          align={index % 2 === 0 ? 'left' : 'right'}
          left={index % 2 === 0 ? `-${QUICK_INFO_WIDTH}` : '100vw'}
        >
          <QuickInfoTitle>{item.title}</QuickInfoTitle>
          <QuickInfoText>{item.text}</QuickInfoText>
          <QuickInfoPrice>{item.offerPrice}</QuickInfoPrice>
          {item.offerPrice !== item.listPrice && <QuickInfoPriceOld>{item.listPrice}</QuickInfoPriceOld>}
          <p><QuickInfoSku>{item.sku}</QuickInfoSku></p>
          <p><span style={{color: '#efefef99'}}>{index}</span></p>
        </Box>
      ))};
    </StageWrapper>
  )
};

export default Stage;