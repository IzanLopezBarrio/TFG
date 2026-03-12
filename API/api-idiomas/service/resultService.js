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
            [user],
            [test]
        );

        return rows;
    }
}

module.exports = resultService;