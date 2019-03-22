const express = require('express')
const router = express.Router()
const auth = require('../../auth')

const TodoController = require('../controllers/todo')
// get All todos
router.post('/', auth.checkAuthenticated, TodoController.todo_get_all);

module.exports = router;