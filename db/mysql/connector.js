// 1. Gerekli modüller
const mysql = require('mysql2');

// 2. MySQL bağlantı ayarlarını almak
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // .env dosyasından host alınır
  user: process.env.MYSQL_USER, // .env dosyasından user alınır
  password: process.env.MYSQL_PASSWORD, // .env dosyasından password alınır
  database: process.env.MYSQL_DATABASE, // .env dosyasından database alınır
});

console.log(connection)

// 3. Bağlantıyı başlatma
connection.connect((err) => {
  if (err) {
    console.error('MySQL bağlantısı başarısız oldu:', err);
    return;
  }
  console.log('MySQL veritabanına başarıyla bağlanıldı!');
});

// 4. Bağlantı objesini dışa aktar
module.exports = connection;
