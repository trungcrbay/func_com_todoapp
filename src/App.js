import logo from './logo.svg';
import './App.css';
import ListTodo from './Todos/ListTodos';
import Context from './context/Context';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Nav/Home';
import Nav from './Nav/Nav';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ShowHideUser from './Todos/ShowHideUser';
import ListUsers from './Users/ListUsers';
import DetailUser from './Users/DetailUser';
import axios from 'axios';
import FetchUser from './Todos/FetchUser';
import { Auth } from './components/auth';
import { db , auth , storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref , uploadBytes } from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      console.log("check data: ", data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log(filteredData)
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovieList();
  }, [])

  const [listTodo, setListTodo] = useState([
    { id: 'todo1', title: 'Doing exercise' },
    { id: 'todo2', title: 'Coding' },
    { id: 'todo3', title: 'Reading book' }
  ]) // lưu các giá trị khởi tạo vào biến state 

  const addNewTodo = (todo) => { //khởi tạo hàm 
    setListTodo([...listTodo, todo]) //sao chép mảng và thêm todo vào cuối mảng
    toast.success('Completely add new work!')
  }

  useEffect(() => {

  }, [])

  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleated, setNewReleated] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releatedDate: newReleated,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      })

      getMovieList();
    } catch (err) {
      console.error(err);
    }

  }
  const [updatedTitle, setUpdatedTitle] = useState("");

  //File upload
  const [fileUpload, setFileUpload ]= useState(null)

  //xoa theo id tu firebase
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }


  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle }); //truyen them 1 value de update
  }

  const uploadFile =  async() => {
    if(!fileUpload){
      return;
    }
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef,fileUpload);
    }catch(err){
      console.error(err);
    }
    
  }

  return (

    <BrowserRouter>

      <div className="App">
        <Context.Provider value={{ listTodo, setListTodo, addNewTodo }}>
          <Nav />
          <header className="App-header">
            <Auth />
            <div>
              <input type='text' placeholder='input title'
                value={newMovieTitle}
                onChange={(e) => setNewMovieTitle(e.target.value)} />
              <input type='number' placeholder='input date'
                value={newReleated}
                onChange={(e) => setNewReleated(Number(e.target.value))}
              />
              <input type='checkbox'
                // checked={isNewMovieOscar}
                onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
              <label>Received an oscar</label>
              <button onClick={onSubmitMovie}>Submit movie</button>
            </div>
            <div>
              {movieList.map((movie, index) => (
                <div>
                  <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>title: {movie.title}</h1>
                  <p>Date: {movie.releatedData}</p>
                  <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
                  <input onChange={(e) => setUpdatedTitle(e.target.value)} placeholder='new title' type='text' />
                  <button onClick={() => updateMovie(movie.id)}>Update Title</button>
                </div>
              ))}
            </div>

            <div>
              <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}
              />
              <button onClick={uploadFile}>Upload file</button>
            </div>

            <Routes>
              <Route path="/todo" exact element={<ListTodo />} />
            </Routes>
            <Routes>
              <Route path="/about" exact element={<ShowHideUser />} />
            </Routes>
            <Routes>
              <Route path="/user" exact element={<ListUsers />} />
            </Routes>
            <Routes>
              <Route path="/fetch" exact element={<FetchUser />} />
            </Routes>
            <Routes>
              <Route path="/user/:id" exact element={<DetailUser />} />
              {/* tham so tren url */}
            </Routes>

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
    </BrowserRouter>
  );
}

export default App;
