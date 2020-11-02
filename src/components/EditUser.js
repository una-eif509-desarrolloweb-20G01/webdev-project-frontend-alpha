import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import {Form, Input, Button, Alert,Select} from 'antd';

import DepartmentService from "../services/department.service";
const EditUser = props => {
    const initialUserState = {
        id_user: null,
        email: "",
        firstname: "",
        lastname: ""
    };
    const initialDepartmentListState = [
        {
            "id_department": 0,
            "department_name": ""
        }
    ];


    
    const [departmentList, setDepartmentList] = useState(initialDepartmentListState);
    const { Option } = Select;
    const [currentUser, setcurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");
  
    const [error, setError, submitted, setSubmitted] = useState(false);

    const [requiredMark, setRequiredMarkType] = useState('optional');

    const layout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 3,
        },
    };
    
    const tailLayout = {
        wrapperCol: {
            offset: 2,
            span: 8,
        },
    };
    const getUser = id => {
        UserService.get(id)
            .then(response => {
                setcurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getAllDepartmentsMethod = () => {
        DepartmentService.getAll()
            .then(response => {
                setDepartmentList(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {

                    window.location.reload();
                }
            });
    }


    
    const [form] = Form.useForm();
    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { email, value } = event.target;
        setcurrentUser({ ...currentUser, [email]: value });
    };


    const onReset = () => {
        form.resetFields();
    };

    const updateUser = () => {
        UserService.update(currentUser.id_user, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The User was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        UserService.remove(currentUser.id_user)
            .then(response => {
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
        {currentUser ? (
                <div>
                <h4>User</h4>



                <Form {...layout} form={form} name="control-hooks" >


                <Form.Item
                    name="email"
                    label="email">
                        
                    <Input
                        type="email"
                        
                        onChange={handleInputChange}
                        placeholder="email"
                        
                        />
                </Form.Item>


                <Form.Item
                    name="id_user"
                    label="ID">
                    <Input
                        type="number"
                        onChange={handleInputChange}
                        placeholder="ID"
                        value="id"
                        />
                </Form.Item>


                <Form.Item
                    name="firstname"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="firstname"
                        onChange={handleInputChange}
                        placeholder="Name"
                     />
                 </Form.Item>





                 <Form.Item
                    name="lastname"
                    label="lastname"
                    rules={[
      
                    ]}
                >
                    <Input
                        name="lastname"
                        onChange={handleInputChange}
                        placeholder="last name"
                        value={currentUser.lastname}
                     />
                 </Form.Item>

                 <Form.Item
                    name="User name"
                    label="username"
                    rules={[
  
                    ]}
                >
                    <Input
                        name="username"
                        onChange={handleInputChange}
                        placeholder="User Name"
                     />
                 </Form.Item>

                 <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={updateUser}>
                        Update
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
             
                 </Form>



        </div>
) : (
    <div>
    <br />
    <p>Please click on a User...</p>
    </div>
)}
</div>
    );
};

export default EditUser;