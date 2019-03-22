var mongoose = require('mongoose')

var todoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    active: Number,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Todo', todoSchema)