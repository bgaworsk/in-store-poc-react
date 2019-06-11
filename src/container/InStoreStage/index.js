import React, { useState } from 'react';
import {observer} from 'mobx-react'
import styled from 'styled-components';
import colors from '../../lib/coremedia-colors';
import Setup from './Setup';
import Loader from './Loader';
import deviceState from './state/device';
import Stage from './Stage';

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(${colors.lightBlue}, ${colors.blue});
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  
  .hidden {
    display: none;
  }
`;

const InStoreStorage = () => {

  const isSetup = deviceState.deviceId && deviceState.clientId;
  const [isLoadComplete, setLoadComplete] = useState(false);
  const [loader, setLoader] = useState(null);

  const loadIsCompleted = () => {
    //TweenMax.to(loader, 0.5, {y: -loader.offsetHeight, onComplete: () => setLoadComplete(true)});
    setLoadComplete(true);
  }

  return (
    <Body>
      {isSetup
        ? isLoadComplete
          ? <Stage />
          : <Loader loadComplete={loadIsCompleted} forwardRef={element => setLoader(element)}/>
        : <Setup storeDeviceId={deviceState.setDeviceId}/>}
      <textarea id="console" name="console" className="hidden" />
      <div id="logo"/>
    </Body>
  )
};

export default observer(InStoreStorage);
