const mongoose = require('mongoose')


const TodoSchema = new mongoose.Schema({
    task: {
        type: String
    },
    hour: {
        type: String
    },
    priority: {
        type: String,
    },
    done: {
        type: Boolean
    },
    
    },
    {
        collection: 'todo',
        timestamps: true
    })


module.exports = mongoose.model('todo', TodoSchema)