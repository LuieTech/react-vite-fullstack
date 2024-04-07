const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskGroupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Group name is required',
      minLength: [3, 'Group name needs at least 3 chars']
    }
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v
        return ret;
      }
    }
  }
)

taskGroupSchema.virtual('tasks', {
  ref: "Task",
  foreignField: "group",
  localField: "_id"
})

const TaskGroup = mongoose.model('TaskGroup', taskGroupSchema);

module.exports = TaskGroup;