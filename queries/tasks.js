const db = require('../db/dbConfig')

const getTasks = async () => {
    try {
        const tasks = await db.any("SELECT * FROM tasks")
        return tasks
    } catch (err){
        return err
    }
}

const getOneTask = async (id) => {
    try {
        const task = await db.one("SELECT * FROM tasks WHERE task_id=$1", id)
        return task
    } catch (err) {
        return err
    }
}

const createTask = async (task) => {
    try {
        const { title, description } = task
        const completed = task.completed || false
        const newTask = await db.one("INSERT into tasks (title, description, completed, created_at) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, completed, new Date()]);
        return newTask
    } catch (err) {
        return err
    }
}

const updateTask = async (id, task) => {
    try {
        const { title, description, completed, created_at } = task 
        const updatedTask = await db.one("UPDATE tasks SET title=$1, description=$2, completed=$3, created_at=$4 WHERE task_id=$5 RETURNING *", [title, description, completed, created_at, id])
        return updatedTask
    } catch (err) {
        return err
    }
}

const deleteTask = async (id) => {
    try {
        const deletedTask = await db.one("DELETE FROM tasks WHERE task_id=$1 RETURNING *", id)
        return deletedTask
    } catch (err) {
        return err
    }
}


module.exports = { getTasks, getOneTask, createTask, updateTask, deleteTask }