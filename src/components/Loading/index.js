import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import ciColours from '../../lib/coremedia-colors';
import simplonNormRegular from '../../fonts/simplonnorm-regular-webxl-woff2-data.woff2';

const AppWrapper = styled.div`
  @font-face {
    font-family: "Simplon Norm Regular";
    font-weight: 500;
    font-style: normal;
    src: url(${simplonNormRegular}) format("woff2");
  }

  height: 100%;
  text-align: center;
  
  font-family: "Simplon Norm Regular", "Lucida Sans", "Lucida Sans Unicode", "Lucida Grande", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const AppHeader = styled.header`
  background-color: ${ciColours.purple};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 1vmin);
  color: white;
`;

const AppLogo = styled.img`
  animation: App-logo-spin infinite 10s linear;
  pointer-events: none;
  height: 50%;
  
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.div`
  margin-top: 2vh;
`;

function Index() {
  return (
    <AppWrapper>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <Title>Loading …</Title>
      </AppHeader>
    </AppWrapper>
  );
}

export default Index;
