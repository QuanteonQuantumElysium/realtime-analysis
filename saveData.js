// saveData.js
const { createConnection } = require("./db/mysql/connector")
const saveDataToDb = async (processedData, service) => {
  const connector = createConnection();

  connector.then((connection) => {
    processedData.items.forEach((item) => {
      const { title, link, pubDate, traffic, picture, newsItems } = item;
      const interest = traffic;      
      const source_timestamp = new Date(pubDate).toISOString().slice(0, 19).replace('T', ' ');
      const { service_id, language_code, language_name, country_code, country_name } = service;
      const values = [
        service_id, 
        language_code, 
        language_name, 
        country_code, 
        country_name, 
        title, 
        interest, 
        source_timestamp
      ];

      const query = `
        INSERT INTO
          source_service_data
            (service_id, language_code, language_name, country_code, country_name, title, interest, source_timestamp)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(query, values, (err, ResultSetHeader) => {
        if (err) {
          console.error('Error saving data:', err);
        } else {
          const { insertId } = ResultSetHeader;
          console.log(`Data saved`, insertId);
        }
      });

    });
    connection.end();
  });
};

module.exports = saveDataToDb;
