import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../../lib/coremedia-colors';
import deviceState from '../state/device';

const Code = styled.code`
  background-color: ${colors.gray};
  color: ${colors.purple};
  padding: 4px;
  border-radius: 4px;
`;

const Setup = styled.div` 
  color: #1a1919;

  input {
    font-size: 1.5rem;
    width: 100%;
    border-radius: 10px;
    border-color: #999;
    border-width: 1px;
    border-style: solid;
    padding: 0.5rem;
    text-align: center;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    font-weight: 700;
  }
  
  button {
    font-size: 1.5rem;
    margin-top: 1em;
    padding: 0.3em 0;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    display: block;
    width: 100%;
    color: #fff;
    background-color: #75c4ba;
    background-image: linear-gradient(${colors.lightPurple}, ${colors.purple});
    cursor: pointer;
  }
  
  .wrapper {
    width: 50%;
    margin: 10% auto;
    padding: 1em;
    border: 1px solid #999;
    background-color: #ffffff;
    border-radius: 0.25rem;
  }
  
  label {
    display: block;
    color: #999;
  }
`;

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #999;
  background-color: #ffffff;
  border-radius: 0.25rem;
  text-align: center;
`;

const AlignRight = styled.div`
  text-align: right;
`;

export default ({ storeDeviceId }) => {
  const [deviceId, setDeviceId] = useState('');
  const updateState = event => setDeviceId(event.target.value);
  const keyUp = event => event.keyCode === 13 && storeDeviceId(deviceId);

  return (
    <Setup>
      <Wrapper>
        <h1>Setup</h1>
        <div>
          <p>
            Please enter the device ID that has been set up for the device with
            client ID <Code>{deviceState.clientId}</Code> in CoreMedia Content Cloud.
          </p>
          <label htmlFor="setup_deviceId">Device ID</label>
          <input id="setup_deviceId" type="text" name="deviceId" value={deviceId} onChange={updateState} onKeyUp={keyUp} />
        </div>
        <AlignRight>
          <button className="btn btn-primary btn-block" onClick={() => storeDeviceId(deviceId)}>Save</button>
        </AlignRight>
      </Wrapper>
    </Setup>
  )
};
