// saveData.js
const { createConnection } = require("../db/mysql/connector");

const saveDataToDb = async (processedData, service) => {
  let connector;
  try {
    // open
    connector = await createConnection();

    // collect all data
    const values = processedData.items.map((item) => {
      const { title, link, pubDate, traffic, picture, newsItems } = item;
      const interest = traffic;
      const source_timestamp = new Date(pubDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const {
        service_id,
        language_code,
        language_name,
        country_code,
        country_name,
      } = service;

      return [
        service_id,
        language_code,
        language_name,
        country_code,
        country_name,
        title,
        interest,
        source_timestamp,
      ];
    });

    // Insert query
    const query = `
      INSERT INTO source_service_data 
      (service_id, language_code, language_name, country_code, country_name, title, interest, source_timestamp)
      VALUES ?
    `;

    // batch
    return new Promise((resolve, reject) => {
      connector.query(query, [values], (err, result) => {
        if (err) {
          reject({
            success: false,
            message: "Error saving data",
            error: err,
          });
        } else {
          resolve({
            success: true,
            message: `Inserted ${result.affectedRows} rows.`,
            insertedId: result.insertId || null,
          });
        }
      });
    });
  } catch (err) {
    return {
      success: false,
      message: "Connection error",
      error: err,
    };
  } finally {
    // every time close connection
    if (connector) {
      connector.end();
    }
  }
};

module.exports = saveDataToDb;