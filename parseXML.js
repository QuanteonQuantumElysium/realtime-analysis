// parseXML.js

const xml2js = require('xml2js');

function parseXML(xml) {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(xml); 
}

module.exports = parseXML;
