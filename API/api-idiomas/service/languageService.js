class languageService {

    static async getIdiomas() {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT nombre FROM idiomas GROUP BY nombre'
        );

        return rows;
    }

    static async getIdioma(id) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT nombre, nivel FROM idiomas WHERE ID=?',
            [id]
        );

        return rows;
    }

    static async getNiveles(idioma) {
        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT ID, Nivel FROM idiomas WHERE Nombre=?',
            [idioma]
        );

        return rows;
    }
}

module.exports = languageService;