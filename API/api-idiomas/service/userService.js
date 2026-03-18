class userService {

    static async login(email, passwd) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'SELECT * FROM usuarios WHERE email=? AND Contraseña=?',
            [email, passwd]
        );

        return rows;
    }

    static async register(email, userName, passwd) {

        const mysql = require('mysql2/promise');

        const con = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "tfg"
        });

        const [rows] = await con.execute(
            'INSERT INTO `usuarios`(`email`, `UserName`, `Contraseña`) VALUES (?, ?, ?)',
            [email, userName, passwd]
        );

        return rows;
    }
}

module.exports = userService;