class resultService {

    static async getAll(user) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT * FROM resultados WHERE Usuario = ?',
            [user]
        );

        return rows;
    }

    static async getAllFilter(user) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            "SELECT i.Nombre AS Idioma, i.Nivel, ROUND(AVG(r.Nota), 2) AS Promedio FROM resultados r JOIN test t ON r.Test = t.ID JOIN idiomas i ON t.Idioma = i.ID WHERE r.Usuario = ? GROUP BY i.Nombre, i.Nivel;",
            [user]
        );

        return rows;
    }

    static async getOne(user, test) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT * FROM resultados WHERE Usuario = ? AND Test = ?',
            [user, test]
        );

        return rows;
    }
}

module.exports = resultService;