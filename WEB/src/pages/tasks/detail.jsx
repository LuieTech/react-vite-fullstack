import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function TaskDetail() {
  const [task, setTask] = useState(null)
  const params = useParams()
  //console.log(params)
  

  useEffect(() => {
    fetch(`http://localhost:3000/v1/tasks/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setTask(data);
      })
      .catch(error => {
        console.error("Fetching task failed: ", error);
      });
  }, []); 
  
  if(task === null) return <h1>Loading...</h1>

  return <div>Task {task.title}</div>
}

export default TaskDetail