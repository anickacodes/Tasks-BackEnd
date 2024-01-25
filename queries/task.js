const db = require('../db/dbConfig')

const getTasks = async () => {
    try {
        const tasks = db.any("SELECT * FROM tasks")
        return tasks
    } catch (err){
        return err
    }
}

module.exports = { getTasks }