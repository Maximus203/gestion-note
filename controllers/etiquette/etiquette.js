const connexion = require('../../models/db');
let conn = connexion();

/**
 * 
 * @param {string} nomEtiquette 
 * @returns boolean
 */
function creerEtiquette(nomEtiquette) {
    return new Promise((resolve, reject) => {
        conn.connect();
        let sql = "INSERT INTO etiquette(nom_etiquette) VALUES(?)";
        let inserts = [nomEtiquette];
        sql = conn.format(sql, inserts);
        conn.query(sql, async function (error, results, fields) {
            if (error) {
                reject(error);
            }
            conn.end();
            resolve(true);
        });
    });
}

/**
 * 
 * @returns data
 */
function listeEtiquettes() {
    return new Promise((resolve, reject) => {
        conn.connect();
        conn.query("SELECT * FROM etiquette", function (error, results, fields) {
            if (error) reject(error);
            conn.end();
            resolve(results);
        });
    })
}


module.exports = { creerEtiquette, listeEtiquettes };
