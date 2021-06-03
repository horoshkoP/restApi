const express = require('express')
const toDo = require('../models/toDo')
const router = express.Router()



//get all todos

router.get('/', async (req, res) => {
    try {

        const toDos = await toDo.find({})

        res.json(toDos)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
})

//get one todo

router.get('/:id', getToDo, (req, res) => {
    try {
        res.json(res.todo)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
})


//create one


router.post('/', async (req, res) => {
    try {
        
        const tmpName = await toDo.findOne({ name: req.body.name })
        if (tmpName!==null) {
            res.status(500).json({
                message: 'this todo already exists',
                todo: req.body
            })
        }
        const ToDo = new toDo({
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        })
        const newToDo = await ToDo.save()
        res.status(201).json(newToDo)
    } catch (e) {
        res.status(400).json({message:e.message})
    }
})
//update one

router.patch('/:id', getToDo, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.todo.name = req.body.name
        }
        if (req.body.description != null) {
            res.todo.description = req.body.description
        }

        if (req.body.completed != null) {
            res.todo.completed = req.body.completed
        }

        const updatedToDo = await res.todo.save()
        res.json({
            message:'updated todo',
            updatedTodo: updatedToDo
        })

    } catch (e) {
        res.status(400).json({message:e.message})
    }
})

//delete all

router.purge('/', async (req, res) => {
    try {
        const toDos = await toDo.deleteMany({})
        const currCollection = await toDo.find({})
        
        res.status(200).json({
            message: 'collection was cleared',
            removedItems: toDos.deletedCount,
            currCollection: currCollection
        })
    } catch (e) {
        res.status(500).json({message:e.message})
    }
})


//delete one

router.delete('/:id', getToDo, async (req, res) => {
    try {
        await res.todo.remove()
        res.json({
            message: 'deleted todo',
            removedToDo: res.todo
        })
    } catch (e) {
        res.status(500).json({message:e.message})
    }
})

async function getToDo (req, res, next) {
    try {
        todo = await toDo.findById(req.params.id)
        if (todo == null) {
            return res.status(404).json({ message: 'cannot find todo' })
        }
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
    res.todo = todo
    next()
}

module.exports = router