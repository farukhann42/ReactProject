import React, {useEffect, useState} from "react";
import axios from 'axios';
// @ts-ignore
import {Link} from 'react-router-dom';

interface IUser {
    id: number
    name: string
    username: string
    email: string
    address: object
    phone: string
    website: string
    company: object
}

function Home() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageUrl] = useState('https://scott88lee.github.io/FMX/img/avatar.jpg');

    useEffect(() => {
        async function fetchData() {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    console.log(res.data)
                    setUsers(res.data);
                })
        }

        fetchData();
    }, [setUsers]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    {/* Jsondan alınan sonuçlar listelendi */}
                    {users.map((user: IUser) => (
                            <div key={user.id} className="col-4 p-3">
                                <div className="card card-size">
                                    <img className="card-img-top" src={imageUrl}
                                         alt="user-image"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text">{user.email}</p>
                                        <Link to={{pathname:`/user-details/${user.id}`, state: {user}}} className="btn btn-outline-primary">User Details</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
