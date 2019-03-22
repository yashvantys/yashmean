const User = require('../../models/Todo.js');

// get All Todo list
exports.todo_get_all = async (req, res, next) => {
    console.log('inside');
    try {
        var result = []
        // get values from req
        //var sort_column = null
        var start = req.body.start
        var limit = req.body.length
        var sort_column_index = req.body.order[0]['column']
        var sort_column = req.body.columns[sort_column_index]['data']
        var direction = req.body.order[0]['dir']
        var search = req.body.search['value']
        var orderbyasc = 1

        result['draw'] = req.body.draw
        if (direction == 'desc')
            orderbyasc = -1
        var query = {}

        if (search != '')
            query = {
                $or: [{
                    title: new RegExp(search, 'i')
                }, {
                    description: new RegExp(search, 'i')
                }, {
                    email: new RegExp(search, 'i')
                }]
            }

        var sortColumn = {}
        sortColumn[sort_column] = orderbyasc
        var todos = await Todo.find(query, '-__v').sort(sortColumn).limit(limit).skip(start)
        var TotalTodos = await User.find(query).count({})
        res.send({
            statusCode: 200,
            message: 'success',
            users,
            recordsTotal: TotalTodos
        })

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}