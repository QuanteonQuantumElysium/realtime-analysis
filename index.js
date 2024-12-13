const { getSourceServiceData } = require("./db/mysql/connector");
const fetchRSS = require("./collector/fetchRss");
const parseXML = require("./collector/parseXML");
const processFeed = require("./collector/processFeed");
const saveDataToDb = require("./collector/saveData");

const main = async () => {
  try {
    const services = await getSourceServiceData();

    if (services.length === 0) {
      console.log("No services available.");
      return;
    }

    for (let service of services) {
      console.log(`${service.platform_name}`, "pulling...");

      if (service.access_type_id === 2 || service.data_format_code === "xml") {
        const xmlData = await fetchRSS(service.full_url);
        if (xmlData) {
          const jsonData = await parseXML(xmlData);
          const processedData = processFeed(jsonData);
          const result = await saveDataToDb(processedData, service);
          console.log(`${service.full_url}`, result);
        } else {
          console.error(`Failed to fetch RSS data from ${service.full_url}`);
        }
      }
    }
  } catch (error) {
    console.error("Main error:", error);
  }
};

main();
