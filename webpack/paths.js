const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/index.jsx'),
  templatePath: path.resolve(__dirname, '../', 'src/template.html'),
  imagesFolder: path.resolve(__dirname, '../', 'src/images'),
  fontsFolder: path.resolve(__dirname, '../', 'src/fonts'),
  cssFolder: path.resolve(__dirname, '../', 'src/styles'),
  jsFolder: 'js',
};
