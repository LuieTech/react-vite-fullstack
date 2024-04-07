const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const priorities = require("../data/priorities.json");
const moment = require('moment')

const taskSchema = new Schema(

  {
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "TaskGroup"
    }
    ,
    title: {
      type: String,
      trim: true,
      required: 'Task title is required',
      minLength: [3, "Task title needs at least 3 chars"],
      maxLength: [50, "Task title is max 50 chars"],
    },
    description: {
      type: String,
      trim: true,
      minLength: [3, "Task title needs at least 3 chars"],
      maxLength: [500, "Task title is max 500 chars"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: priorities,
      default: 'P3'
    },
    dueTo: {
      type: Date,
      set: function (val) {
        const parsedDate = new Date(val);

        if(isNaN(parsedDate.getTime())){
          throw new Error("Invalid date format")
        }

        return parsedDate;

      },
      validate: {
        validator: function (value){
          return value > new Date()
        },
        message: "due Date must be in the future"
      }
    },
    labels: [{
      type: String,
      enum: []
    }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        return ret;
      }
    }
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task