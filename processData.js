const xml2js = require('xml2js');

const parseRssData = (rssData) => {
  const parser = new xml2js.Parser();

  return new Promise((resolve, reject) => {
    parser.parseString(rssData, (err, result) => {
      if (err) {
        reject('parseRssData: ' + err);
      } else {
        const items = result.rss.channel[0].item;
        const parsedData = items.map((item) => ({
          title: item.title[0],
          link: item.link[0],
          pub_date: item.pubDate[0],
          description: item.description ? item.description[0] : '',
        }));
        resolve(parsedData);
      }
    });
  });
};

module.exports = parseRssData;
