const axios = require('axios');

const fetchRss = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(`failure: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('RSS failure:', error);
    return null;
  }
};

module.exports = fetchRss;
