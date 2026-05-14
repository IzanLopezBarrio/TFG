const pool = require('../DBconector/DB.js');

class userService {

    static async login(email, passwd) {
        const [rows] = await pool.execute(
            'SELECT * FROM usuarios WHERE email=? AND Contraseña=?',
            [email, passwd]
        );
        return rows;
    }

    static async remove(email) {
        const [rows] = await pool.execute(
            'DELETE FROM usuarios WHERE email=?',
            [email]
        );
        return rows;
    }

    static async register(email, userName, passwd) {
        const [rows] = await pool.execute(
            'INSERT INTO usuarios (email, UserName, Contraseña) VALUES (?, ?, ?)',
            [email, userName, passwd]
        );
        return rows;
    }
}

module.exports = userService;