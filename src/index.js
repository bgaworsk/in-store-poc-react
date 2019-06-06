import React from 'react';
import ReactDOM from 'react-dom';
import components from './components';
import * as serviceWorker from './serviceWorker';

window.coreMediaWidget = (rootNode, componentName) => {
  // Assume root node is an ID
  let node = undefined;
  if (typeof rootNode !== 'object') {
    node = document.getElementById(rootNode);
  } else {
    node = rootNode;
  }

  // Attach component to node
  if (node) {
    const Component = components[componentName];
    if (Component) {
      console.log('Replacing DOM node "%s" with CoreMedia component %s', node, componentName);
      ReactDOM.render(<Component />, node);
    } else {
      console.error('Unknown component %s', componentName);
    }
  } else {
    console.error('Unknown DOM node "%s", CoreMedia Widget could not be added to the page', node);
  }
};

// In DEV mode, attach app to node with ID 'root'
if (process.env.NODE_ENV === 'development') {
  window.coreMediaWidget('root', 'App');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
