const { createConnection, closeConnection } = require('./db/mysql/connector');

const saveDataToDb = async (parsedData, serviceId) => {
  const connection = createConnection();

  if (connection) {
    parsedData.forEach((data) => {
      const query = `
        INSERT INTO source_service_data (service_id, title, link, description, published)
        VALUES (?, ?, ?, ?, ?)`;

      const publishedDate = new Date(data.pub_date);

      connection.query(query, [serviceId, data.title, data.link, data.description, publishedDate], (err, results) => {
        if (err) {
          console.error('parsedData:', err);
        } else {
          console.log(`parsedData: ${data.title}`);
        }
      });
    });
    closeConnection(connection);
  }
};

module.exports = saveDataToDb;
