const express = require("express")
const db = require("./utils/database")
const Todos = require("./models/todos.models")

const app = express()

// check database connection
db.authenticate()
    .then( () => console.log("Database connected successfully") )
    .catch( (err) => console.log(err) )

db.sync()
    .then( () => console.log("Database has been synchronized") )
    .catch( (error) => console.log(error)  )

app.use(express.json())

// Create a todo
app.post("/api/v1/todos", async(req, res) => {
    try {
        const newTodo = req.body
        await Todos.create(newTodo)
        res.status(201).send()
    } catch (error) {
        res.status(400).json(error)
    }
})

// Get all the todos that have been created
app.get("/api/v1/todos", async(req, res) => {
    try {
        const allTodos = await Todos.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        res.json(allTodos)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Get one todo by its id
app.get("/api/v1/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        console.log(req.params)
        const todoById = await Todos.findByPk(id)
        res.json(todoById)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Delete a todo
app.delete("/api/v1/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        await Todos.destroy({
            where: {id}
        })
        res.status(204).send()
    } catch (error) {
        res.status(400).json(error)
    }
})

// Update a todo
app.put("/api/v1/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        const newInformationAboutTheTodo = req.body
        await Todos.update(
            newInformationAboutTheTodo,
            {
                where: {id}
            }
        )
        res.status(204).send()
    } catch (error) {
        res.status(400).json(error)
    }
})

const PORT = 8000
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando desde el puerto ${PORT}`)
})
