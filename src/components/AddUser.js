import React, {useState} from "react";
import UserService from "../services/user.service";
import {Form, Input, Button, Alert, notification} from 'antd';
import {Link} from "react-router-dom";
import {  } from '@ant-design/icons';

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


const AddUser = (props) => {
    const initialUserState = {
        id_user: null,
        firstname: "",
        lastname: "",       
        username: "",
        password: "",
        email: ""
    };
    const [form] = Form.useForm();
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = event => {
        let { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    
    const saveUser = () => {
        var data = {
            id_user: user.id_user,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password,
            email: user.email
        };

        UserService.create(data)
            .then(response => {
                setUser({
                    id_user: response.data.id_user,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email
                });
                setSubmitted(true);
                openNotification(
                    "Create Successful!",
                    "success",
                    "The User was created successfully!"
                );
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)

            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };
    /** General Methods **/

    const onFinish = data => {
        console.log(user);
        saveUser();
    };

    const openNotification = (msg, typ, desc) => {
        notification.open({
            message: msg,
            type: typ,
            description: desc
        });
    };

    const onReset = () => {
        form.resetFields();
    };
    return (
        <div>
        <Link to={"/user"}>
            <Button type="primary" htmlType="button">
                Back
            </Button>
        </Link>
        <h1>Add User</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
 
                <Form.Item
                    name="id_user"
                    label="ID"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="id_user"
                        onChange={handleInputChange}
                        placeholder="ID"
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
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="lastname"
                        onChange={handleInputChange}
                        placeholder="lastname"
                     />
                 </Form.Item>

                 <Form.Item
                    name="username"
                    label="username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="username"
                        onChange={handleInputChange}
                        placeholder="User Name"
                     />
                 </Form.Item>

                 <Form.Item
                    name="password"
                    label="password"
                    rules={[
                        {
                            required: true,
                            
                        },
                    ]}
                >
                    <Input
                        name="password"
                        onChange={handleInputChange}
                        placeholder="password"
                     />
                 </Form.Item>

                 <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="email"
                        onChange={handleInputChange}
                        placeholder="email"
                     />
                 </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
             
            </Form>
                {submitted  ? (
                    <Alert message="User Saved" type="success" showIcon closable />
                ) : null}
                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}

        </div>

    )
};

export default AddUser;