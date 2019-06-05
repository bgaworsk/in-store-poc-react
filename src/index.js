import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.coreMediaWidget = rootNode => {
  // Assume root node is an ID
  let node = undefined;
  if (typeof rootNode !== 'object') {
    node = document.getElementById(rootNode);
  } else {
    node = rootNode;
  }

  if (node) {
    console.log('Replacing node "%s" with CoreMedia Widget ', node);
    ReactDOM.render(<App />, node);
  } else {
    console.log('Could not find node "%s", CoreMedia Widget could not be added to the page', node);
  }
};

// In DEV mode, attach app to node with ID 'root'
if (process.env.NODE_ENV === 'development') {
  window.coreMediaWidget('root');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
