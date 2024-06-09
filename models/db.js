let Mysql = require('mysql');

function connexion() {
    let connexion = Mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gestion_note'
    });
    return connexion;
}

module.exports = connexion;
