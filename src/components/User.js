import React, {useState, useEffect} from "react";
import {Alert, Button, Table} from 'antd';

import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import Login from "./Login";

const initialUserListState = [
    {
        "id_user": 0,
        "email": ""
    }
];

const User = (props) => {
    const [userList, setUserList] = useState(initialUserListState);
    const [error, setError] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllUserMethod();
    },);

    /** Service methods **/
    const getAllUserMethod = () => {
        UserService.getAll()
            .then(response => {
                setUserList(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                }
            });
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'List of Users',
            render: (user) => user.email
        }
    ];

    const refreshList = () => {
        getAllUserMethod();
        setCurrentUser(null);
        setCurrentIndex(-1);
    };

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };

    return (
     /*   <div>
            <Link to={"/add_department"}>
                <Button type="primary" htmlType="button">
                    Add
                </Button>
            </Link>
            <Table rowKey={department => userList.id_department} columns={columns} dataSource={userList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>*/

        <div className="list row">

        <div className="col-md-6">
        <h4>User List</h4>
    <Table rowKey={user => userList.id_user} columns={columns} dataSource={userList}

    />
    <ul className="list-group">
        {userList &&
        userList.map((userList, index) => (
            <li
    className={
        "list-group-item " + (index === currentIndex ? "active" : "")
    }
    onClick={() => setActiveUser(userList , index)}
    key={index}
        >
        {userList.email}
        </li>
))}
</ul>


    </div>
    <div className="col-md-6">
        {currentUser ? (
                <div>
                <h4>ID</h4>
                <div>
                <label>
                <strong>Email:</strong>
        </label>{" "}
    {currentUser.id_user}
</div>
    <div>
    <label>
    <strong>Description:</strong>
    </label>{" "}
    {currentUser.email}
</div>


    <Link
    to={"/edit_user/" + currentUser.id_user}
    className="badge badge-warning"
        >
        Edit
        </Link>
        </div>
) : (
    <div>
    <br />
    <p>Please click on a User...</p>
    </div>
)}
</div>
    </div>
    )
};

export default User;