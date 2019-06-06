# Standalone CoreMedia Widgets Proof-of-concept

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and 
ejected to take full control over the Webpack configuration. 

## Usage

The workspace builds a single JS file that includes everything that is necessary to render
a standalone component into an existing page.

To do so, the JS must be loaded by the browser, it will attach a `coreMediaWidget` function
to the `window` object, which can then be called to inject a standalone component into
the page.

To load the script you can

  * Append it to the end of the HTML code and load it via the `<script>` tag
  * Use a browser plugin like Tampermonkey to inject the script on the client-side

Once the script is loadded, it can be used by calling

    window.coreMediaWidget( <node> );
    
`node` is either the ID of a DOM element, or the element itself.

### Examples

Replace DOM node with ID `standalone` with standalone component:

    window.coreMediaWidget( 'standalone' );
    
Replace first DOM node with class 'cm-details' with standalone component:

    window.coreMediaWidget( document.getElementsByClassName('cm-details')[0] );
    
### Loading the Script via `<script>` Tag

    <script src="main.js"></script>
    <script>
        window.coreMediaWidget(document.getElementById('poc-integration'));
    </script>
    
### Loading the Script via Tampermonkey

Create a new script for the site that you want to inject the component to.
Then load the JS from GitHub by requiring it and call the widget function.

The following example replaces the first hero element on the CoreMedia website
with a standalone component.

      // ==UserScript==
      // @name         CoreMedia Widget
      // @namespace    http://tampermonkey.net/
      // @version      0.1
      // @description  try to take over the world!
      // @author       You
      // @match        https://www.coremedia.com/
      // @grant        none
      // @require      https://bgaworsk.github.io/in-store-poc-react/main.js
      // ==/UserScript==
      
      (function() {
          'use strict';
          let className = 'cm-details';
          window.coreMediaWidget(document.getElementsByClassName(className)[0]);
      })();

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#yarn-run-build-fails-to-minify

### `yarn run copy-js-to-poc`

Copies bundled JS built by `yarn run build` into demo HTML site at `./docs`.