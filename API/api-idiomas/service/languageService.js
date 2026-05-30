const pool = require('../DBconector/DB.js');

class languageService {

    static async getIdiomas() {
        const [rows] = await pool.execute(
            'SELECT nombre FROM idiomas GROUP BY nombre'
        );
        return rows;
    }

    static async getIdiomasByUser(user) {
        const [rows] = await pool.execute(
            'SELECT Idioma FROM altas WHERE Usuario=?',
            [user]
        );
        return rows;
    }

    static async addIdiomasToUser(user, idioma) {
        const [rows] = await pool.execute(
            'INSERT INTO `altas`(`Usuario`, `Idioma`) VALUES (?,?)',
            [user, idioma]
        );
        return rows;
    }

    static async removeIdiomasFromUser(user, idioma) {
        const {rows} = await pool.execute(
            'DELETE FROM `altas` WHERE `Usuario` = ? AND `Idioma` = ?',
            [user, idioma]
        );
    }
    static async removeAllFromUser(user) {
        const {rows} = await pool.execute(
            'DELETE FROM `altas` WHERE `Usuario` = ?',
            [user]
        );
    }

    static async getIdioma(id) {
        const [rows] = await pool.execute(
            'SELECT nombre, nivel FROM idiomas WHERE ID=?',
            [id]
        );
        return rows;
    }

    static async checkIdiomasByUser(user, id) {
        const [rows] = await pool.execute(
            'SELECT * FROM altas WHERE Usuario=? AND Idioma=?',
            [user, id]
        );
        return rows;
    }

    static async getNiveles(idioma) {
        const [rows] = await pool.execute(
            'SELECT ID, Nivel FROM idiomas WHERE Nombre=?',
            [idioma]
        );
        return rows;
    }

    static async removeNivel(idioma) {
        const [rows] = await pool.execute(
            'DELETE FROM `idiomas` WHERE ID=?',
            [idioma]
        );
        return rows;
    }
    static async removeIdiomasFromEveryone(idioma) {
        const {rows} = await pool.execute(
            'DELETE FROM `altas` WHERE `Idioma` = ?',
            [idioma]
        );
    }
    static async removeAllTestFilter(id) {
        const [rows] = await pool.execute(
            'DELETE r FROM resultados r INNER JOIN test t ON r.Test = t.ID WHERE t.Idioma = ?',
            [id]
        );
        return rows;
    }

    static async newIdioma(name, lv) {
        const [rows] = await pool.execute(
            'INSERT INTO `idiomas`(`Nombre`, `Nivel`) VALUES (?,?)',
            [name, lv]
        );
        return rows;
    }

    static async getUserInIdioma(id) {
        const [rows] = await pool.execute(
            'SELECT COUNT(*) as Personas FROM `altas` WHERE Idioma=?',
            [id]
        )
        return rows;
    }
}

module.exports = languageService;