const { getSourceServiceData } = require('./db/mysql/connector');
const fetchRss = require('./fetchRss');
const parseRssData = require('./processData');
const saveDataToDb = require('./saveData');

const main = async () => {
  try {

    const services = await getSourceServiceData();

    if (services.length === 0) {
      console.log('no.');
      return;
    }

    for (let service of services) {
      console.log(`pulling: ${service.platform_name}`);


      if (service.access_type_name === 'RSS') {

        const rssData = await fetchRss(service.full_url);
        if (rssData) {
          const parsedData = await parseRssData(rssData);
          await saveDataToDb(parsedData, service.service_id);
        } else {
          console.error(`RSS: ${service.full_url}`);
        }
      }

      // service.fetch_frequency
    }
  } catch (error) {
    console.error('main:', error);
  }
};

main();
