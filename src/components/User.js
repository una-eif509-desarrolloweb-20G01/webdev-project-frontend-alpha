import React, {useState, useEffect, useCallback,useRef} from "react";
import Select, {Form, Input, Button, Table, Alert, Modal, notification, Popconfirm} from 'antd';

import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import Login from "./Login";


import ReactToPrint from "react-to-print";
import FormBuilder from "antd-form-builder";
import {PlusCircleTwoTone,EditTwoTone,PrinterOutlined,DeleteOutlined } from "@ant-design/icons";

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
    // const [message, setMessage] = useState("");
    const openNotification = (msg, typ, desc) => {
        notification.open({
            message: msg,
            type: typ,
            description: desc
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
                openNotification(
                    "Delete Successful!",
                    "success",
                    "The User was deleted successfully."
                );
                refreshList();
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                openNotification(
                    "Delete Unsuccessful!",
                    "error",
                    "The User was deleted successfully."
                );
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
            render:  (user) => <a href={"/edit_user/"+user.id_user}><EditTwoTone /></a>,

     
        },
        {
            title: 'Delete',
            render: (user) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteUser(user.id_user)} >
                    <a><DeleteOutlined /></a>
                </Popconfirm>
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
    const componentRef = useRef();

    return (
        <div className="list row">
        <div className="col-md-6">
            <h4>User List</h4>
            <p>Generates a list of the Users and create new users.</p>
            <Link to={"/add_user"}>
                <Button type="primary" htmlType="button" icon={<PlusCircleTwoTone />}>
                    Add User
                </Button>
            </Link>
            <ReactToPrint
                trigger={() => <Button type="default" htmlType="button"  icon={<PrinterOutlined />} > Print Report</Button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef} >
                <Table rowKey={user => userList.id_user } columns={columns} dataSource={userList} size="small"/>
                {error ? (
                    <Alert message="Error, you must login first." type="error" showIcon closable/>
                ) : null}
            </div>
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