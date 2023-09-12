import { useReducer, useRef, useState } from "react";
import axios from "axios";

const initialState = {
    todos: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: [...state.todos.filter(item => item.id !== action.payload)]
            }

        default:
            return state;
    }
}

const FetchUser = () => {
    const titleRef = useRef(null);
    const clubRef = useRef(null);
    const goalRef = useRef(null);
    const [text, setText] = useState("");
    const [listWeather, setListWeather] = useState([])

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = id => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id //gui payload cho hàm reducer biết về id cần xóa
        })
    }

    const fetchWeather = async () => {
        const res = await axios.get('https://www.weatherapi.com/docs/weather_conditions.json')
        console.log(res.data)
        setListWeather(res.data)
    }

    useState(() => {
        fetchWeather();
    }, [])



    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            if (text === "") return;
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    id: Math.random() * 1001,
                    text: text
                }
            });
            setText("");
        }
    }

    const addPlayerHandler = async (player) => {
        try {
            const res = await axios.post('https://react-http-8bc42-default-rtdb.firebaseio.com/', player, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const player = {
            title: titleRef.current ? titleRef.current.value : '',
            club: clubRef.current ? clubRef.current.value : '',
            goal: goalRef.current ? goalRef.current.value : '',
        }
        addPlayerHandler(player);
    }

    return (
        <div>
            {listWeather.map((item, index) => (
                <div key={index}>
                    <h1>{item.code}</h1>
                    <p>{item.day}</p>
                </div>
                
            ))}
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="add todo..."
                onKeyUp={handleKeyUp}
            />

            {Object.keys(state.todos).length === 0 ? (
                <p>Todo empty !!</p>
            ) : (
                state.todos.map(item => (
                    <div key={item.id}>
                        <p>{item.text}</p>
                        <div onClick={() => handleDelete(item.id)}>
                            x
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default FetchUser;
