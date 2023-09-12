import react, { useContext, useState } from "react";
import Context from "../context/Context";
import { toast } from 'react-toastify';

const AddTodo = (props) => {

    const {listTodo, setListTodo, addNewTodo} = useContext(Context);
    const [title,setTitle] = useState('');
    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value) //lấy giá trị nhập từ bàn phím
    } 

    const addNewUser = (user) => {
        if(!title){
            toast.error('Missing title!')
            return;
        }
        const newUSer = {
            id:Math.floor(Math.random() * 1001),
            title:title
        }
        setListTodo([...listTodo,newUSer])
        setTitle('')

    }

    return (
        <div className="add-todo">
            <input type="text" value={title} onChange={(e) => handleOnChangeTitle(e)}/>
            <button type="button" onClick={() => addNewUser(title)}>Add</button>
        </div>
    )
}

export default AddTodo;