const mysql = require('mysql');

const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api_rest_imgupload',
    port: 8889
});

mysqlConnect.connect(function(error) {
    if (error) {
        console.error(error);
    } else {
        console.log('Data base is connect');
    }
});

module.exports = mysqlConnect;