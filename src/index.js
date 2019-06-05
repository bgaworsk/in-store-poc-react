import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.coreMediaWidget = rootNode => {
  const node = document.getElementById(rootNode);
  if (node) {
    console.log('Replacing node with id "%s" with CoreMedia Widget ', rootNode);
    ReactDOM.render(<App />, node);
  } else {
    console.log('Could not find node with id "%s", CoreMedia Widget could not be added to the page', rootNode);
  }
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
