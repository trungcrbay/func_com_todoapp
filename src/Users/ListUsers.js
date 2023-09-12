import React from "react";
import axios from 'axios';

class ListUsers extends React.Component {

    state ={
        listUsers : []
    }

    async componentDidMount() {
        // axios.get('https://reqres.in/api/users?page=2')
        //     .then(res => {
        //         console.log('Check ress:', res.data.data);
        //     })
        let res = await axios.get('https://reqres.in/api/users?page=2')
        console.log('Check ress:', res.data.data);  
        this.setState({
            listUsers:res && res.data && res.data.data ? res.data.data : []
        })

    }
    //chay ham render dau tien -> componentDidMount
    handleViewDetailUser = (user) => {
        this.props.history.push(`/user/${user.id}`)
    }

    render() {
        let {listUsers} = this.state; 
        return (
            <div className="list-user-container">
                <div className="title">
                    Fetch all list users
                </div>
                <div className="list-user-content">
                    {listUsers && listUsers.length > 0  &&
                    listUsers.map((item,index) => {
                        return(
                        <div className="child" key={item.id} 
                        onClick={() => this.handleViewDetailUser(item)}
                        >
                            {index + 1} - {item.first_name} {item.last_name} 
                           -  Email: {item.email}
                        </div>
                        )
                    })
                    }
                    
                </div>

            </div>
        )

    }
}

export default ListUsers;