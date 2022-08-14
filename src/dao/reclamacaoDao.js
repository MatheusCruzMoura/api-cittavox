const pool = require('../config/database.js')

module.exports = {
    getAllReclamacao () {
        return pool.query('select * from reclamacao', (err, res) => {
            if (err) console.log(err)
            pool.end()
        })
    }
}