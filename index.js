// 1. Connector dosyasını içe aktar
const connection = require('./db/mysql/connector');

// 2. Test sorgusu
const sqlQuery = 'SELECT * FROM source_service';

connection.query(sqlQuery, (error, results, fields) => {
  if (error) {
    console.error('Sorgu hatası:', error);
    return;
  }
  console.log('Sorgu Sonuçları:', results);
});

// 3. Veritabanı bağlantısını kapatma
connection.end((err) => {
  if (err) {
    console.error('Bağlantı kapatılırken hata oluştu:', err);
    return;
  }
  console.log('Bağlantı başarıyla kapatıldı.');
});
