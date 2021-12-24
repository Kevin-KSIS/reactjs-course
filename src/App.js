import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from "./components/About";

function App() {
    const [tasks, setTasks] = useState([]);
    const [showAddButton, setShowAddButton] = useState(false);

    useEffect( async () => {
        const fetchTasks = async () => {
            const res = await fetch('http://localhost:5000/tasks');
            return await res.json();
        }
        const data = await fetchTasks();
        setTasks(data);
    }, []);

    const deleteEvent = async (id) => {
        await fetch(
            `http://localhost:5000/tasks/${id}`,
            {
                method: 'DELETE'
            }
        )
        setTasks(tasks.filter((task) => id !== task.id))
    }

    const toggleEvent = async (id) => {
        const taskById = await fetch(
            `http://localhost:5000/tasks/${id}`
        )
        const taskToToggle = await taskById.json();
        const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const rs = await fetch(
            `http://localhost:5000/tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(updateTask)
            }
        )
        const data = await rs.json()

        setTasks(
            tasks.map( (task) =>
                id !== task.id ? task : data
            )
        )
    }

    const addTaskEvent = async (task) => {
        const res = await fetch(
            'http://localhost:5000/tasks',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            },
        )
        const data = await res.json();
        setTasks([...tasks, data])
    }

  return (

          <BrowserRouter >
              <div className="container">
                  <Header
                      onAdd={ () => setShowAddButton(!showAddButton) }
                      showAdd={ showAddButton }
                  />
                  <Routes>
                      <Route path='/' element={
                          <>
                              { showAddButton && <AddTask onAdd={addTaskEvent} /> }
                              { tasks.length > 0 ?
                                  (
                                      <Tasks tasks={tasks}
                                             onDelete={deleteEvent}
                                             onToggle={toggleEvent}/>
                                  ):(
                                      'No task'
                                  )
                              }
                          </>
                         }>
                      </Route>
                      <Route path='/about' element={<About/>} />
                  </Routes>
                  <Footer/>
              </div>
          </BrowserRouter>

  );
}

export default App;
