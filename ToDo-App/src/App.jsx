import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/ToDo-Context'
import ToDoForm from './components/ToDoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos ,setTodos] = useState([])

  const addTodo = (todo)=>{
    setTodos((prev)=>[...prev,{id:Date.now(),...todo}])
  }

  const updateTodo = (id,todo)=>{
    setTodos((prev)=>prev.map((Todo)=>{
        return Todo.id === id?todo :Todo
    }))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((Todo)=>{
      return Todo.id!==id
    }))
  }

  const toggleComplete=(id)=>{
      setTodos((prev)=>prev.map((Todo)=>{
        return Todo.id === id ? {...Todo , completed:!Todo.completed} : Todo
      }))
  }

  useEffect(()=>{
   const todos =  JSON.parse(localStorage.getItem('todos'))
    if(todos &&  todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos' , JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{addTodo,updateTodo,deleteTodo,toggleComplete,todos}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <ToDoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                          todos.map((todo)=>(
                            <div className='w-full' key={todo}> <TodoItem todo={todo}/> </div>
                          ))
                        }
                        
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
