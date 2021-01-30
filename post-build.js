const path = require('path');
const replace = require('replace-in-file');

replace.sync({
  files: path.join(__dirname, 'dist/api/schema.js'),
  from: [/nexus-typegen\.ts/g, /context\.ts/g],
  to: ['nexus-typegen.js', 'context.js'],
});
