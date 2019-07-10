const express = require('express')

const todoRoutes = express.Router()
const todo = require('./Model/Todo')


// get all todo items in the db
todoRoutes.route('/all').get(function(req, res, next) {
    todo.find(function (err, todos) {
        if(err) {
            return next(new Error(err))
        }
        res.json({ status: 200, todos})
       
    })
})


// add a todo item
todoRoutes.route('/add').post(function (req, res) {
    todo.create(
        {
            task: req.body.task,
            hour: req.body.hour,
            priority: req.body.priority,
            done: false,
        },
        function (error, todos) {
            if (error) {(
                res.status(400).send('Nao foi possivel criar a tarefa')
            )}
            res.json({ status: 200, todos})
           
        }
    )
})

// get todo
todoRoutes.route('/todo/:id').get(function (req, res, next) {
  const id = req.params.id
  todo.findById(id, function (err, todos) {
      if(err) {
          return next(new Error('Tarefa nao encontrada'))
      }
      res.json({ status: 200, todos})
    
  })
})


// delete todo
todoRoutes.route('/delete/:id').delete(function (req, res, next) {
    const id = req.params.id
    todo.findByIdAndRemove(id, function (err, todo) {
        if(err) {
            return next(new Error('Tarefa nao encontrada'))
        }
        res.json('Tarefa removida com sucesso')
      
    })
})


// update a todo item
todoRoutes.route('/update/:id').put(function (req, res, next) {
    var id = req.params.id
    todo.findById(id, function (error, todo) {
      if (error) {
        return next(new Error('Tarefa nao encontrada'))
      } else {
        
        todo.task = req.body.task
        todo.hour = req.body.hour
        todo.priority = req.body.priority
        todo.done = req.body.done
        next()
        todo.save({
          function (error, todos) {
            if (error) {(
              res.status(400).send('Nao foi possivel alterar tarefa')
            )} else {
              res.json({ status: 200, todos})
             
            }
          }
        })
      }
    })
  })


module.exports = todoRoutes
