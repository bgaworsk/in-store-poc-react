import React,{ useEffect }  from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import logo from './logo.svg';

const Loader = styled.div`
  position: absolute;
  background-color: #000;
  color: #fff;
  width: 100vw;
  height: 100vh;
`;

const Logo = styled(animated.div)`
  width: 0;
  height: 0;
  opacity: 0;
  background-image: url(${logo});
  background-size: cover;
  margin: 20% auto 20px auto;
`;

const LoadingIndicator = styled(animated.div)`
  width: 250px;
  height: 5px;
  margin: 10px auto;
  background-color: white;
  border-radius: 50px;
  transform-origin: 0 0;
  transform: scaleX(0);
`;

export default ({ isLoadComplete, loadComplete, setLoaderHidden }) => {

  const logoStyle = useSpring({
    from: {opacity: 0, width: '0px', height: '0px'},
    to: {opacity: 1, width: '100px', height: '100px'},
  });

  const loadingIndicatorStyle = useSpring({
    from: { x: 0 },
    to: { x: 1 },
    config: config.molasses
  });

  useEffect(() => {
    // Do not render animation, if load is already completed
    if (isLoadComplete) return;

    // Else animate logo (grow)


    /*const updateLoadingIndicatorFn = () =>
      TweenMax.set(loadingIndicator, {scaleX:loaderTimeline.progress(), transformOrigin:"0px 0px"});
    ;

    loaderTimeline = new TimelineMax({onUpdate: updateLoadingIndicatorFn});
    loaderTimeline.add(TweenMax.fromTo(logo, 2, {scale: 0, top: "100%", opacity: 0}, {scale: 1, top: "50%", opacity: 1, onComplete: loadComplete}));
  }, [loadingIndicator, logo, loadComplete, isLoadComplete])

  useEffect(() => {
    if (isLoadComplete && loader) {
      TweenMax.to(loader, 0.5, {y: -loader.offsetHeight, onComplete: setLoaderHidden});
    }
  }, [isLoadComplete, loader, setLoaderHidden]);*/
  });

  return (
    <Loader>
      <Logo style={logoStyle}/>
      <LoadingIndicator style={{ transform: `scaleX(${loadingIndicatorStyle.x})`, color: 'gray' }}/>
      <animated.span>{loadingIndicatorStyle.x}</animated.span>
    </Loader>
  );
}