import React, {useState, useEffect} from "react";
import {Alert, Button, Table,Space,Modal} from 'antd';

import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import Login from "./Login";



const initialUserListState = [
    {
        "id_user": 0,
        "email": "",
        "firstname" : "",
        "lastname": "",
         "username": ""
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
    },[]);



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
    /** Handle actions in the Table **/
    const deleteUser = () => {
        UserService.remove(currentUser.id_user)
            .then(response => {
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const [state, setModal] = useState(false);
   

 
/** End handle actions in the table */
    const columns = [
        {
            title: 'User ID',
            render: (user) => user.id_user
        },{
            title: 'Email',
            render: (user) => user.email,
            
        },
        {
            title: 'First Name',
            render: (user) => user.firstname
        },
        {
            title: 'Last Name',
            render: (user) => user.lastname
        },
        {
            title: 'Username',
            render: (user) => user.username
        },
        {
            title: 'Edit',
            render:  (user) => <a href={"/edit_user/"+user.id_user}>Edit</a>,
     
        },
        {
            title: 'Delete',
            render:  (user) => (
                //modal window confirm user removal
                <Space size="middle">
                    <Button type="primary" onClick={() => this.setModal1Visible(true)}>
          Display a modal dialog at 20px to Top
        </Button>
        <Modal
          title="20px to Top"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>

                </Space>
              ),
     
        }
    ];
     /** Handle actions in the Form **/

    /** General Methods **/
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
    

        <div className="list row">

        <div className="col-md-6">
        <h4>User List</h4>        <Link to={"/add_user"}>
        <Button type="primary" htmlType="button">
        Add
        </Button>
        </Link>
    <Table rowKey={user => userList.id_user } columns={columns} dataSource={userList} size="small" 
        
    />
   
    </div>

    </div>

    
    )
};

export default User;