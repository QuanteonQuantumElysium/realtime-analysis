// index.js

const { getSourceServiceData } = require("../db/mysql/connector");
const { saveData, updateService } = require("./saveDataToDb");
const fetchRSS = require("./fetchRss");
const parseXML = require("./parseXML");
const processFeed = require("./processFeed");
const collectorEmitter = require("./collectorEmitter");

const collector = async () => {
  try {
    const services = await getSourceServiceData();

    if (services.length === 0) {
      collectorEmitter.emit("step", {
        timestamp: new Date().toISOString(),
        step: "collector",
        message: "No services available",
      });
      return;
    }
    const results = [];
    for (let service of services) {
      if (service.access_type_id === 2 || service.data_format_code === "xml") {
        const xmlData = await fetchRSS(service.full_url);
        if (xmlData) {
          const jsonData = await parseXML(xmlData);
          const processedData = processFeed(jsonData);
          const result = await saveData(processedData, service);

          if (result.success) {
            await updateService(service.service_id);
          }

          results.push({
            serviceUrl: service.full_url,
            result: result,
          });
        } else {
          results.push({
            serviceUrl: service.full_url,
            result: { success: false, message: "Failed to fetch RSS data" },
          });
        }
      }
    }

    collectorEmitter.emit("step", {
      timestamp: new Date().toISOString(),
      type: "info",
      step: "collector",
      message: "All services processed",
      data: results,
    });
    return { success: true, results };
  } catch (error) {
    collectorEmitter.emit("step", {
      timestamp: new Date().toISOString(),
      type: "error",
      step: "collector",
      message: `Error in collector`,
      error,
    });
    return { success: false, message: error.message };
  }
};

module.exports = { collector, collectorEmitter };
