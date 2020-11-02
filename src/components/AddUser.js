import React, {useState} from "react";
import UserService from "../services/user.service";
import {Form, Input, Button, Alert} from 'antd';
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
        first_name: "",
        last_name: "",       
        email: "",
        username: "",
        password: ""
    };
    const [form] = Form.useForm();
    const [user, setUser] = useState(initialUserState);
    const [error, setError, submitted, setSubmitted] = useState(false);

 

    const handleInputChange = event => {
        let { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };



    const saveUser = () => {
        var data = {
            id_user: user.id_user,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            password: user.password
        };

        UserService.create(data)
            .then(response => {
                setUser({
                    id_user: response.data.id_user,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    username: response.data.username,
                    password: response.data.password
                });
                setSubmitted(true);
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
                        placeholder="last name"
                     />
                 </Form.Item>

                 <Form.Item
                    name="User name"
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