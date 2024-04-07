import { Navigate, Route, Routes } from 'react-router-dom'
import TaskList from './pages/tasks/list'
import TaskDetail from './pages/tasks/detail'

function App() {

  return( 
    <div className='container m-5'>
      <Routes>
        <Route path='/tasks' element={<TaskList />} />
        <Route path='/tasks/:id' element={<TaskDetail />} />

        <Route path='*' element={<Navigate to="/tasks" />} />
      </Routes>  

    </div>
  )
}

export default App
