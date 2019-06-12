import React, { useState } from 'react';
import {observer} from 'mobx-react'
import styled from 'styled-components';
import colors from '../../lib/coremedia-colors';
import Setup from './Setup';
import Loader from './Loader';
import deviceState from './state/device';
import Stage from './Stages';
import coremediaLogoWhite from './coremedia-logo-white.svg';
import simplonNormRegular from '../../fonts/simplonnorm-regular-webxl-woff2-data.woff2';

const Body = styled.div`
  @font-face {
    font-family: "Simplon Norm Regular";
    font-weight: 500;
    font-style: normal;
    src: url(${simplonNormRegular}) format("woff2");
  }

  font-family: "Simplon Norm Regular", "Lucida Sans", "Lucida Sans Unicode", "Lucida Grande", Arial, Helvetica, sans-serif;
  font-size: 2rem;
  color: #fff;
  height: 100%;

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

const Logo = styled.div`
  position: fixed;
  left: 12px;
  bottom: 12px;
  background: url(${coremediaLogoWhite}) no-repeat;
  height: 24px;
  width: 100%;
`;

const InStoreStorage = () => {

  const isSetup = deviceState.deviceId && deviceState.clientId && deviceState.deviceIdConfirmed;
  const [isLoadComplete, setLoadComplete] = useState(false);
  const [loaderIsHidden, setLoaderIsHidden] = useState(false);

  const child = isSetup
    ? (
      <>
        <Stage loaderIsHidden={loaderIsHidden}/>
        <Loader isLoadComplete={isLoadComplete} loadComplete={() => setLoadComplete(true)} setLoaderHidden={() => setLoaderIsHidden(true)}/>
      </>
    )
    : <Setup storeDeviceId={deviceState.setDeviceId}/>

  return (
    <Body>
      {child}
      <textarea id="console" name="console" className="hidden" />
      <Logo />
    </Body>
  )
};

export default observer(InStoreStorage);
