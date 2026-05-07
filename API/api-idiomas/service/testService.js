const pool = require('../DBconector/DB.js');

class testService {

    static async get(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM test WHERE Idioma=?',
            [id]
        );
        return rows;
    }

    static async getOne(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM test WHERE ID=?',
            [id]
        );
        return rows;
    }
}

module.exports = testService;