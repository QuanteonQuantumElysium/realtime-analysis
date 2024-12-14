// fetchRss.js

const axios = require("axios");
const collectorEmitter = require("./collectorEmitter");

const fetchRSS = async (url) => {
  try {
    const response = await axios.get(url);
    collectorEmitter.emit("step", {
      timestamp: new Date().toISOString(),
      type: "info",
      step: "fetchRSS",
      message: `RSS data fetched from ${url}`,
    });
    return response.data;
  } catch (error) {
    collectorEmitter.emit("step", {
      timestamp: new Date().toISOString(),
      type: "error",
      step: "fetchRSS",
      message: `Error fetching RSS data from ${url}: ${error.message}`,
    });
    return null;
  }
};

module.exports = fetchRSS;
