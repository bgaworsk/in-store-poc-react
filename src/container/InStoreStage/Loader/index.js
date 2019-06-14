import React,{ useEffect }  from 'react';
import styled from 'styled-components';
import logo from './logo.svg';

const Loader = styled.div`
  position: absolute;
  background-color: #000;
  color: #fff;
  width: 100vw;
  height: 100vh;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${logo});
  background-size: cover;
  margin: 20% auto 20px auto;
`;

const LoadingIndicator = styled.div`
  width: 250px;
  height: 5px;
  margin: 10px auto;
  background-color: white;
  border-radius: 50px;
`;

export default ({ isLoadComplete, loadComplete, setLoaderHidden }) => {

  useEffect(() => {
    // Do not render animation, if load is already completed
    if (isLoadComplete) return;

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
      <Logo/>
      <LoadingIndicator/>
    </Loader>
  );
}