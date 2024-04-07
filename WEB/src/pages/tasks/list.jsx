import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function TaskList() {

  const [data, setData] = useState([])
  const [groups, setGroups] = useState([])

  useEffect(() => {

    fetch("http://localhost:3000/v1/tasks")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
     
      fetch("http://localhost:3000/v1/task-groups")
      .then(res => res.json())
      .then(data => {
        setGroups(data)
      })  

  }, []);

  return (
    <section>
      <h1>Task list</h1>
      <select  className='ms-4 mt-2'>
        
        {groups.map(group => (
          <option key={group.id} > {group.name} </option>
        ))}
        
      </select>
      <section className='row'> 
        {data.map(task => (
          <div className='col-3 p-5' key={task.id}>
            <h3>
              <Link to={`/tasks/${task.id}`} >
                {task.title}
              </Link>
            </h3>  
            <h3>{task.group.name}</h3>
          </div>
        ))}
      </section>
    </section>
  )
}

export default TaskList