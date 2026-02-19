class resultService {

    static async get(user) {

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
}

module.exports = resultService;