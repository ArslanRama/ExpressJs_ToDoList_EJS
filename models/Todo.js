
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({ 
    newtask: String,
    check: String,
    date: String,
    checked: String,

})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo