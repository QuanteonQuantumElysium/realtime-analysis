// processFeed.js

function parseTraffic(traffic) {
  // Eğer trafik verisi "100+" gibi bir ifade içeriyorsa, "+" işaretini kaldırıp sayısal değeri elde edebiliriz
  if (traffic.includes('+')) {
    const number = parseInt(traffic.split('+')[0], 10); // "+"dan önceki sayıyı al
    return number; // Burada sayısal değeri döndürüyoruz
  }
  
  // Eğer trafik değeri yalnızca bir sayıysa, olduğu gibi döndürebiliriz
  return parseInt(traffic, 10);
}

function processFeed(feed) {
  const channel = feed.rss.channel[0];
  const items = channel.item.map((entry) => {
    const processedEntry = {
      title: entry.title[0],
      link: entry.link[0],
      pubDate: entry.pubDate[0],
      traffic: entry['ht:approx_traffic'] ? parseTraffic(entry['ht:approx_traffic'][0]) : 'N/A',
      picture: entry['ht:picture'] ? entry['ht:picture'][0] : null,
      newsItems: entry['ht:news_item'] ? entry['ht:news_item'].map(newsItem => ({
        title: newsItem['ht:news_item_title'][0],
        url: newsItem['ht:news_item_url'][0],
        source: newsItem['ht:news_item_source'][0],
        picture: newsItem['ht:news_item_picture'] ? newsItem['ht:news_item_picture'][0] : null,
      })) : []
    };
    return processedEntry;
  });

  return {
    channelTitle: channel.title[0],
    channelDescription: channel.description[0],
    channelLink: channel.link[0],
    items: items,
  };
}

module.exports = processFeed;
