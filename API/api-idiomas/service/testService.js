class testService {

    static async get(id) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT * FROM test WHERE Idioma=?',
            [id]
        );

        return rows;
    }
}

module.exports = testService;