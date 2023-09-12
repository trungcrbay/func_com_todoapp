import React, { useContext, useState } from "react";
import Context from "../context/Context";
import { toast } from 'react-toastify';

const ShowHideUser = () => {
    const { listTodo, setListTodo, addNewTodo } = useContext(Context);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const [listShow, setListShow] = useState([
        { id: '1', name: 'Dang Trung', age: '19', address: 'Ha Noi' },
        { id: '2', name: 'QuachLoan', age: '19', address: 'Thuong Tin' },
        { id: '3', name: 'Hong Quan', age: '19', address: 'Yen Bai' },
    ])

    const handleAddNewUser = () => {
        if (!name || !age || !address) {
            toast.error('Please fill in all ')
            return;
        }
        const newUser = {
            name: name,
            age: age,
            address: address
        }
        
        setListShow([...listShow, newUser])
        setAddress('');
        setName('');
        setAge('');
       
    }



    const [isShow, setIsShow] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    const handleShow = () => {
        setIsShow(true)
    }

    const handleHide = () => {
        setIsShow(false)
    }

    const handleHideUpdate = () => {
        setIsUpdate(false);
    }

    const handleDeleteUser = (user) => {
        let currentUsers = listShow.filter((item) => item.id !== user.id)
        setListShow(currentUsers);
    }

    const handleEditUser = (e) => {
        setIsUpdate(true);
        setListShow((prevListShow) => ({
            ...prevListShow,
            name: e.target.value,
            age: e.target.value,
            address: e.target.value
        })) //edit => object

    }

    return (
        <header className="App-header">
            <p>Todo App with React</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={age}  onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            <input type="text" value={address}  onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            <button onClick={() => handleAddNewUser(name, age, address)}>Add todo</button>
            <button onClick={handleShow}>
                {isShow ? 'Submit' : 'Show  '}
            </button>

            {isShow ? listShow.map((show, index) => {
                return <div key={show.id}>
                    <div> {show.name} - {show.age} - {show.address}</div>
                    <button onClick={() => handleDeleteUser(show)}>Delete</button>
                    <button onClick={() => handleEditUser(show)}>Edit</button>
                </div>
            }) : <p>No users </p>}

            <button onClick={handleHide}>Hide</button>


        </header>
    )
}

export default ShowHideUser;