import logo from './logo.svg';
import './App.css';
import ListTodo from './Todos/ListTodos';
import Context from './context/Context';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [listTodo, setListTodo] = useState([
    { id: 'todo1', title: 'Doing exercise' },
    { id: 'todo2', title: 'Coding' },
    { id: 'todo3', title: 'Reading book' }
  ]) // lưu các giá trị khởi tạo vào biến state 

  const addNewTodo = (todo) => { //khởi tạo hàm 
    setListTodo([...listTodo, todo]) //sao chép mảng và thêm todo vào cuối mảng
    
    toast.success('Completely add new work!')
  }

  return (
    <div className="App">
      <Context.Provider value={{ listTodo, setListTodo, addNewTodo }}>
        <header className="App-header">
          <p>Todo App with React</p>
          <ListTodo />
        </header>
      </Context.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
