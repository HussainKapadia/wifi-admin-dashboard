const mysql = require('mysql2')
console.log('mysql2 loaded:', typeof mysql.createConnection === 'function')
