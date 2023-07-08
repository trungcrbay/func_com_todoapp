import react, { useContext, useState } from "react";
import Context from "../context/Context";
import { toast } from 'react-toastify';

const AddTodo = (props) => {

    const {listTodo, setListTodo, addNewTodo} = useContext(Context);
    const [title,setTitle] = useState('');

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value) //lấy giá trị nhập từ bàn phím
    } 

    const handleAddTodo = () => {
        if(!title){
            //undefined , empty , null 
            toast.error('Missing a title')
            return; //không trả ra cái gì
        }

        let todo = {
            id:Math.floor(Math.random() * 1001),
            title // sẽ không hiện todo mới khi không có giá trị 
        }    
        // setListTodo([...listTodo,todo])
        addNewTodo(todo);
        setTitle('');

    }

    return (
        <div className="add-todo">
            <input type="text" value={title} onChange={(e) => handleOnChangeTitle(e)}/>
            <button type="button" onClick={handleAddTodo}>Add</button>
        </div>
    )
}

export default AddTodo;