const mysql = require('mysql2');

// Create connection using Promises to handle async behavior
const createConnection = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    connection.connect((err) => {
      if (err) {
        console.error('Database connection failed:', err);
        reject(err);  // Reject promise if connection fails
      } else {
        console.log('Database connected');
        resolve(connection);  // Resolve with the connection if successful
      }
    });
  });
};

// Close connection properly
const closeConnection = (connection) => {
  if (connection) {
    connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }
};

const getSourceServiceData = async () => {
  try {
    const connection = await createConnection();
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM source_service WHERE service_status_id = 1`;
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching data:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    }).finally(() => {
      closeConnection(connection);
    });
  } catch (error) {
    console.error('Error in getSourceServiceData:', error);
    throw error;
  }
};

module.exports = { createConnection, closeConnection, getSourceServiceData };
