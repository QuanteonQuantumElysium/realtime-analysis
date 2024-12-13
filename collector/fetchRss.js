// fetchRSS.js

const axios = require("axios");

async function fetchRSS(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching RSS data:", error);
    throw error;
  }
}

module.exports = fetchRSS;
