import React, { useState } from 'react';
import styled from 'styled-components';
import simplonNormRegular from '../../../fonts/simplonnorm-regular-webxl-woff2-data.woff2';

const Setup = styled.div`
  @font-face {
    font-family: "Simplon Norm Regular";
    font-weight: 500;
    font-style: normal;
    src: url(${simplonNormRegular}) format("woff2");
  }

  font-family: "Simplon Norm Regular", "Lucida Sans", "Lucida Sans Unicode", "Lucida Grande", Arial, Helvetica, sans-serif;
  font-size: 2rem;
  color: #1a1919;
  height: 100%;
  
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
  margin: 10% auto;
  padding: 1em;
  border: 1px solid #999;
  background-color: #ffffff;
  border-radius: 0.25rem;
`;

const AlignRight = styled.div`
  text-align: right;
`;

export default ({ storeDeviceId }) => {
  const [deviceId, setDeviceId] = useState('');
  const updateState = event => setDeviceId(event.target.value);

  return (
    <Setup>
      <Wrapper>
        <h1>Setup</h1>
        <div>
          <p>Enter the device ID that has been set up for this device in CoreMedia Content Cloud.</p>

          <label htmlFor="setup_deviceId">Device ID</label>
          <input id="setup_deviceId" type="text" name="deviceId" value={deviceId} onChange={updateState} />
        </div>
        <AlignRight>
          <button className="btn btn-primary btn-block" onClick={() => storeDeviceId(deviceId)}>Save</button>
        </AlignRight>
      </Wrapper>
    </Setup>
  )
};
