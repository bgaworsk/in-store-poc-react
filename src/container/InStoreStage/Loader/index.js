import React,{ useEffect, useState }  from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import { TweenMax, TimelineMax } from "gsap/all";

const Loader = styled.div`
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

export default ({ loadComplete }) => {
  const [loadingIndicator, setLoadingIndicator] = useState(null);
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    if (loadingIndicator === null || loader == null) return;

    let loaderTimeline;

    const updateLoadingIndicatorFn = () =>
      TweenMax.set(loadingIndicator, {scaleX:loaderTimeline.progress(), transformOrigin:"0px 0px"});
    ;

    loaderTimeline = new TimelineMax({onUpdate: updateLoadingIndicatorFn});
    loaderTimeline.add(TweenMax.fromTo(loader, 2, {scale: 0, top: "100%", opacity: 0}, {scale: 1, top: "50%", opacity: 1, onComplete: loadComplete}));
  }, [loadingIndicator, loader, loadComplete])

  return (
    <Loader>
      <Logo ref={element => setLoader(element)}/>
      <LoadingIndicator ref={element => setLoadingIndicator(element)}/>
    </Loader>
  );
}