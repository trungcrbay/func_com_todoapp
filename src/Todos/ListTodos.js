import React, { useContext, useState } from "react";
import AddTodo from "./AddTodo";
import Context from "../context/Context";

const ListTodo = (props) => {
    const { listTodo, setListTodo, addNewTodo , listShow , setListShow } = useContext(Context);
    const [editTodo, setEditTodo] = useState({})
    
    const handleDeleteTodo = (todo) => {
        const currentTodo = listTodo.filter(item => item.id !== todo.id);
        setListTodo(currentTodo);
    }

    const [testInput, setTestInput] = useState('');

    const handleOnChangeInput = (e) => {
        setTestInput(e.target.value)
      }

    const handleEditTodo = (todo) => {
        if (editTodo.id === todo.id) {
            const listTodosCopy = listTodo.map((item) =>
                item.id === todo.id ? { ...item, title: editTodo.title } : item
            ); 
            setListTodo(listTodosCopy); 
            setEditTodo({});
        } else {
            setEditTodo({ ...todo }); 
        }
    }

    const handleOnChangeEditTodo = (e) => {
        setEditTodo({ ...listShow, title: e.target.value }) 
    }

    let isEmptyObj = Object.keys(editTodo).length === 0;

    return (
        <div className="todo_container">
            <AddTodo
                addNewTodo={addNewTodo} //có thể truy cập hàm addNewTodo từ component AppTodo
            />
            <div className="todo_list">
                {listTodo && listTodo.length > 0 &&
                    listTodo.map((item, index) => {
                        return (
                            <div className="todo-child" key={item.id}>
                                {isEmptyObj === true ?
                                    <span>{index + 1} - {item.title} </span>
                                    :
                                    <>
                                        {editTodo.id === item.id ?
                                            <span>
                                                {index + 1} - <input
                                                    value={editTodo.title} onChange={(e) => handleOnChangeEditTodo(e)}
                                                />
                                            </span>
                                            : <span> {index + 1} - {item.title} </span>
                                        }

                                    </>}
                                <button onClick={() => handleEditTodo(item)}>
                                    {isEmptyObj === false && editTodo.id === item.id ? 'Save' : 'Edit'}
                                </button>
                                <button onClick={() => handleDeleteTodo(item)}>Delete</button>
                                <input type='text' onChange={(e) => handleOnChangeInput(e)} value={testInput} />

                                <p> Child component name: {props.name} </p>
                            </div>
                        )

                    })}
            </div>
        </div>
    )
}

export default ListTodo;