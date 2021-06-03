const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: { type: String, required: true },
    completed:{type:Boolean, default:false}
})

module.exports = mongoose.model('ToDo', toDoSchema)