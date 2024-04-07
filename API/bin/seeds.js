require("../configs/db.config");
const TaskGroup = require("../models/task-group.models");
const Task = require('../models/task.model')
const mongoose = require('mongoose')

  //drop mongoose database
  mongoose.connection.dropDatabase()
    .then(() => {

      return TaskGroup.create({
              name: 'Group 1'
            }).then(group => {
              for(let i = 0; i < 100; i++) {
                Task.create({
                  group: group.id,
                  title: `Task ${i}`,
                  description: `super task number ${i}`,
                  dueAt: new Date(Date.now() + 3600000),
                  labels: ['label1', 'label2']
                })
                .then(task => {
                    console.log(`task ${task.title} created`)
                })
                .catch(error => next(error))  
              }
            })
    })
    .catch(error => next(error))

