import React from 'react';
import ReactDOM from 'react-dom';
import components from './components';
import App from './App';
import * as serviceWorker from './serviceWorker';
import InStoreStage from '../src/container/InStoreStage';

const augmentedComponents = {...components, InStoreStage };

window.coreMediaWidget = (rootNode, component) => {
  // Assume root node is an ID
  let node = undefined;
  if (typeof rootNode !== 'object') {
    node = document.getElementById(rootNode);
  } else {
    node = rootNode;
  }

  // Attach component to node
  if (node) {
    const Component = typeof component === 'string' ? augmentedComponents[component] : component;
    if (Component) {
      console.log('Replacing DOM node "%s" with CoreMedia component %s', node, component);
      ReactDOM.render(<App><Component /></App>, node);
    } else {
      console.error('Unknown component %s', component);
    }
  } else {
    console.error('Unknown DOM node "%s", CoreMedia Widget could not be added to the page', node);
  }
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
