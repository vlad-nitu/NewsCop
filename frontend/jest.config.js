const esModules = ['@react-leaflet', 'react-leaflet'].join('|');

const config = {
    verbose: true,
    transformIgnorePatterns: [`/node_modules/(?!${esModules}|(?!axios))`],
    testEnvironment: 'jsdom',
  };
  
module.exports = config;