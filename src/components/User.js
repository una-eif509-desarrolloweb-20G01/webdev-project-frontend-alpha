import React, {useState, useEffect, useCallback} from "react";
import Select, {Form, Input, Button,Table, Alert, Modal,notification} from 'antd';

import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import Login from "./Login";


import FormBuilder from "antd-form-builder";
import {PlusCircleTwoTone} from "@ant-design/icons";

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

/** Notification */
const [message, setMessage] = useState("");
const openNotification = () => {
    notification.open({
      message: 'Notification',
      description: message,

    });
  };
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


  
    const [requiredMark, setRequiredMarkType] = useState('optional');


    const deleteUser = (userRemoval) => {

        UserService.remove(userRemoval)
            .then(response => {
                console.log(response.data);
                console.log("se ejecuto bien");
                setMessage("The User was deleted successfully!");
                openNotification();
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                setMessage("The User was not deleted successfully!");
                console.log(e);
            });
    };

 
   
    const [state, setState] = useState(false);
    const  showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);
   
    setState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setState({
      visible: false,
    });
  };
  
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
          // render:  (user) => <button onClick={deleteUser(user.id_user)}> Delete </button>,
          render:  (user) => <button > Delete </button>,
          //render:  (user) => <button onClick={showModal}> Delete </button>,
     
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
        <Button type="primary" htmlType="button" icon={<PlusCircleTwoTone />}>
        Add
        </Button>
        </Link>

    <Table rowKey={user => userList.id_user } columns={columns} dataSource={userList} size="small" 
        
    />
   
    </div>
    <Modal
          title="User Delete Confirm"
          visible={state.visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>confirm User Delete</p>
        </Modal>
    </div>

    
    )
};

export default User;