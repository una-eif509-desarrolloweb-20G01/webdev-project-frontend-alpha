import React, {useState, useEffect, useCallback} from "react";

import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from '@ant-design/icons';

import {Form, Input, Button, Alert, Modal,Select} from 'antd';
import FormBuilder from "antd-form-builder";

import UserService from "../services/user.service";

import DepartmentService from "../services/department.service";

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

const initialUserState = {
 //   "id_user": null,
    "firstname" : "",
    "lastname" : "",
    "email" : "",
    "username": "",
    "password": ""
};

const Signup = (props) => {
    const [user, setUser] = useState(initialUserState);
    const [error, setError] = useState(false);


    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    /** Service methods **/
    const signUpMethod = (user) => {
        UserService.signup(user)
            .then(response => {
                console.log("---")
                setUser(response.data);
                form.resetFields();
                setError(false);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }

    /** Handle actions in the Form **/

    const handleInputChange = event => {
        let {firstname, value} = event.target;
        setUser({...user, [firstname]: value});
    };

    /** General Methods **/

    const onFinish = data => {
        console.log(user);

        signUpMethod();
    };

    const onReset = () => {
        setUser(user);
        form.resetFields();
    };




    /** Form updated */
    const [viewMode, setViewMode] = useState(true)
    const [pending, setPending] = useState(false)
    const [form] = Form.useForm();
    /** agrega listado de departamentos al signup */
    const [options, setOptions] = useState([]);
    useEffect(() => {
        DepartmentService.getAll().then(response => {
            
            const data = [];

            response.data.forEach((department, index ) => {
                data.push({
                    value: department.id,
                    label: department.name
                });
            });

            setOptions(data);
        });
    }, []);
    const handleChange = (option) => {
        setUser({...user, department: {
                id: option.value,
                name: option.label
            }
        });
    };
    const handleFinish = useCallback(values => {
        console.log('Submit: ', values)
        setPending(true)
        setTimeout(() => {
            setPending(false)
            debugger;
            setUser(values)
            //aqui corregi con values igual que en el metodo
           signUpMethod(values);
          
            setViewMode(true)
            Modal.success({title: 'Success',content: 'User Signed',})}, 1500)
    })

    const getMeta = () => {
        const user = {
            columns: 1,
            disabled: pending,

            fields: [
                { key: 'id_user', label: 'ID', required: true },
                { key: 'email', label: 'Email', required: true },
                { key: 'firstname', label: 'First Name', required: true },
                { key: 'lastname', label: 'Last Name', required: true },
                { key: 'username', label: 'Username', required: true },
                { key: 'password', label: 'Password', required: true },
               
            ],
        }
        return user
    };
    /**------------- */
    return (
        <div>
        <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '800px' }}>
            <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
                User Infomation
           
            </h1>
            <FormBuilder form={form} getMeta={getMeta} viewMode={false}  />
            
                <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
                    <Button htmlType="submit" type="primary" disabled={pending}>
                        {pending ? 'Signing...' : 'Signup'}
                    </Button>
                    <Button
                        onClick={() => {
                            form.resetFields()
                            setViewMode(true)
                        }}
                        style={{ marginLeft: '15px' }}
                    >
                        Cancel
                    </Button>
                </Form.Item>
     
        </Form>
</div>
)
};

export default Signup;