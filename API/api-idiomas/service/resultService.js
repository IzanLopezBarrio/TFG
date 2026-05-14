const pool = require('../DBconector/DB.js');

class resultService {

    static async getAll(user) {
        const [rows] = await pool.execute(
            'SELECT * FROM resultados WHERE Usuario = ?',
            [user]
        );
        return rows;
    }

    static async removeAll(user) {
        const [rows] = await pool.execute(
            'DELETE FROM resultados WHERE Usuario = ?',
            [user]
        );
        return rows;
    }

    static async removeAllFilter(user, id) {
        const [rows] = await pool.execute(
            'DELETE r FROM resultados r INNER JOIN test t ON r.Test = t.ID WHERE r.Usuario = ? AND t.Idioma = ?',
            [user, id]
        );
        return rows;
    }

    static async getAllByLang(user, id) {
        const [rows] = await pool.execute(
            `SELECT r.Usuario, r.Test, r.Categoria, r.Nota
             FROM resultados r
             JOIN test t ON r.Test = t.ID
             JOIN idiomas i ON t.Idioma = i.ID
             WHERE r.Usuario = ? AND i.ID = ?`,
            [user, id]
        );
        return rows;
    }

    static async getAllFilter(user) {

        const [rows] = await pool.execute(
            `SELECT 
                i.Nombre AS Idioma,
                i.Nivel,
                t.Tipo AS Categoria,
                AVG(COALESCE(r.Nota, 0)) AS Promedio
            FROM altas a
            JOIN idiomas i ON a.Idioma = i.ID
            JOIN test t ON t.Idioma = i.ID
            LEFT JOIN resultados r 
                ON r.Test = t.ID 
                AND r.Usuario = a.Usuario
            WHERE a.Usuario = ?
            GROUP BY i.Nombre, i.Nivel, t.Tipo
            ORDER BY i.Nombre, i.Nivel, t.Tipo`,
            [user]
        );
        return rows;
    }

    static async getOne(user, test) {
        const [rows] = await pool.execute(
            'SELECT * FROM resultados WHERE Usuario = ? AND Test = ?',
            [user, test]
        );
        return rows;
    }

    static async firstTest(user, test, nota, cate) {
        const [rows] = await pool.execute(
            'INSERT INTO resultados (Usuario, Test, Categoria, Nota) VALUES (?, ?, ?, ?)',
            [user, test, cate, nota]
        );
        return rows;
    }

    static async redoneTest(user, test, nota) {
        const [rows] = await pool.execute(
            'UPDATE resultados SET Nota=? WHERE Usuario=? AND Test=?',
            [nota, user, test]
        );
        return rows;
    }
}

module.exports = resultService;