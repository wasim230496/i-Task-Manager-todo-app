import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Navbar from './assets/components/Navbar'


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  
    
  }, [])
  


  const saveToLS = (param) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleAdd = () => {
    // console.log("Add button clicked");
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  }

  const handleEdit = (e,id) => {
    // console.log("Edit button clicked");
    let t = todos.filter(i => i.id === id);
    console.log(t)
    
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleDelete = (e,id) => {
    let confirmDel = confirm("Are you sure you want to delete this todo?")
    if(!confirmDel) return;

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()

  }
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-200 rounded-xl p-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-2xl text-center m-3'>iTask - Manage your todos at one place</h1>
        <div className="addTodo flex flex-col gap-5">
          <h2 className='text-lg font-bold '>Add a Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white  p-1 rounded-lg' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-purple-900 hover:bg-purple-950 font-bold text-sm text-white rounded-lg mx-2 p-2'>Save</button>
          </div>
        </div>

        <input onChange={toggleFinished} id='showfinised' type="checkbox" checked={showFinished} className='my-4 '/>
        <label htmlFor="showfinised" className='my-4 mx-2'>Show Finished</label>
        <div className='h-[1px] bg-black w-[90%] mx-auto opacity-15 my-3'></div>
        <h2 className='text-xl font-bold '>Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='my-3 font-black'>Thers is No Todos to show</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-4 justify-between">
              <div className='flex gap-5 items-center'>

              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id=''/>
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => {handleEdit(e, item.id)}} className='border-2 mx-1 px-3 py-1 rounded-lg bg-purple-900 hover:bg-purple-950 font-bold text-sm text-white'><FaEdit /></button>
                <button onClick={(e) =>{handleDelete(e, item.id)}} className='border-2 mx-1 px-3 py-1 rounded-lg bg-purple-900 hover:bg-purple-950 font-bold text-sm text-white'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
