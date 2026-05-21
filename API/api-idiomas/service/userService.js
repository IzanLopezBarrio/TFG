const pool = require('../DBconector/DB.js');

class userService {

    static async login(email, passwd) {
        const [rows] = await pool.execute(
            'SELECT * FROM usuarios WHERE email=? AND Contraseña=?',
            [email, passwd]
        );
        return rows;
    }

    static async adminToUser(email) {
        const [rows] = await pool.execute(
            'UPDATE `usuarios` SET `Rol`="Usuario" WHERE email=?',
            [email]
        );
        return rows;
    }
    static async userToAdmin(email) {
        const [rows] = await pool.execute(
            'UPDATE `usuarios` SET `Rol`="Administrador" WHERE email=?',
            [email]
        );
        return rows;
    }

    static async getEveryone() {
        const [rows] = await pool.execute(
            'SELECT * FROM `usuarios` WHERE NOT Rol = "Administrador";'
        );
        return rows;
    }

    static async getEveryAdmin() {
        const [rows] = await pool.execute(
            'SELECT * FROM `usuarios` WHERE Rol = "Administrador";'
        );
        return rows;
    }

    static async checkAdmin(email) {
        const [rows] = await pool.execute(
            'SELECT * FROM `usuarios` WHERE Rol = "Administrador" AND email=?;',
            [email]
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
            'INSERT INTO usuarios (email, UserName, Contraseña, Rol) VALUES (?, ?, ?, "Usuario")',
            [email, userName, passwd]
        );
        return rows;
    }

    static async registerAdmin(email, userName, passwd) {
        const [rows] = await pool.execute(
            'INSERT INTO usuarios (email, UserName, Contraseña, Rol) VALUES (?, ?, ?, "Administrador")',
            [email, userName, passwd]
        );
        return rows;
    }
}

module.exports = userService;