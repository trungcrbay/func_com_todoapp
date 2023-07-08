import react, { useContext, useState } from "react";
import AddTodo from "./AddTodo";
import Context from "../context/Context";

const ListTodo = () => {
    const { listTodo, setListTodo, addNewTodo } = useContext(Context);
    const [editTodo, setEditTodo] = useState({})
    //khai bao gia tri cua editTodo = rỗng 

    //=> sau đó có thể dùng hàm map để hiển thị dữ liệu ra màn hình 
    const handleDeleteTodo = (todo) => {
        let currentTodos = listTodo; 
        currentTodos = currentTodos.filter(item => item.id !== todo.id)//todo.id:đối tượng mình đang bấm vào 
        //item.id: id của mỗi item trong danh sách 
        // lọc ra cái id khác với id mình chọn => xóa đi id mình chọn trả ra các id còn lại 
        setListTodo(currentTodos);  //cập nhật danh sách todo list 
        // this.setState({
        //     listTodos: [...this.state.listTodos, todo],
        //     // listTodos: currentListTodos
        // })

    }

    const handleEditTodo = (todo) => {
        if (editTodo.id === todo.id) {
            const listTodosCopy = listTodo.map((item) =>
                item.id === todo.id ? { ...item, title: editTodo.title } : item
            ); // nếu id giống =>cập nhật title = giá trị mới từ editTodo , nếu không => giữ nguyên phần tử đó
            setListTodo(listTodosCopy); //cập nhật danh sách listTodo mới
            setEditTodo({}); //đặt về trạng thái không chỉnh sửa sau khi kết thúc hàm
        } else {
            setEditTodo({ ...todo }); 
        }
    }

    const handleOnChangeEditTodo = (e) => {
        // let editTodoCopy = {...editTodo};
        // editTodoCopy.title = e.target.value;
        // setEditTodo(editTodoCopy);
        setEditTodo({ ...editTodo, title: e.target.value }) 
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
                            </div>
                        )

                    })}
            </div>
        </div>
    )
}

export default ListTodo;