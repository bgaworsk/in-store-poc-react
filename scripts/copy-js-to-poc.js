'use strict';

const fs = require('fs');
const path = require('path');
const { appPath, appBuild } = require('../config/paths');

const pattern = /^main\.\w+\.js$/;

// Copy file main.*.js to poc folder with name main.js
fs.readdirSync(path.join(appBuild, 'static', 'js')).map(file => {
  if (pattern.test(file)){
    fs.copyFileSync(path.join(appBuild, 'static', 'js', file), path.join(appPath, 'docs', 'main.js'));
  }
});


