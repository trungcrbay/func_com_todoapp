import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


const DetailUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://reqres.in/api/users/${id}`)
                console.log("check res; ", res);
                setUser(res && res.data && res.data.data ? res.data.data : {}) //cap nhat du lieu nguoi dung

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])

    let isEmptyObj = Object.keys(user).length === 0;

    return (
        <>
            <div>hello world from detail user with id: {id}</div>
            {isEmptyObj === false &&
                <>
                    <div>User's name: {user.first_name} {user.last_name}</div>
                    <div>User's email: {user.email}</div>
                    <div>
                        <img src={user.avatar} />
                    </div>
                </>
            }

        </>
    )
}

export default DetailUser;