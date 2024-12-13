const { getSourceServiceData } = require('./db/mysql/connector');
const fetchRSS = require('./fetchRSS');
const parseXML = require('./parseXML');
const processFeed = require('./processFeed');
const saveDataToDb = require('./saveData');

const main = async () => {
  try {
    const services = await getSourceServiceData();

    if (services.length === 0) {
      console.log('No services available.');
      return;
    }

    for (let service of services) {
      console.log(`Pulling: ${service.platform_name}`);

      if (service.access_type_id === 2 || service.data_format_code === 'xml') {
        const xmlData = await fetchRSS(service.full_url);
        if (xmlData) {
          console.log(`received: ${service.full_url}`);
          const jsonData = await parseXML(xmlData);
          const processedData = processFeed(jsonData);

          await saveDataToDb(processedData, service);

        } else {
          console.error(`Failed to fetch RSS data from ${service.full_url}`);
        }
      }
    }
  } catch (error) {
    console.error('Main error:', error);
  }
};

main();
