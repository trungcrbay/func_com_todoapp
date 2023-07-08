import react, { useContext, useState } from "react";
import AddTodo from "./AddTodo";
import Context from "../context/Context";

const ListTodo = () => {
    const {listTodo, setListTodo, addNewTodo} = useContext(Context);

    //=> sau đó có thể dùng hàm map để hiển thị dữ liệu ra màn hình 
    

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
                                <span>{index + 1} - {item.title} </span>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        )

                    })}
            </div>  
        </div>
    )
}

export default ListTodo;