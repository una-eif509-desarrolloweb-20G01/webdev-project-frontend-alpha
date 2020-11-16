import React, {useState, useEffect, useCallback, useRef } from "react";
import Select, {Form, Input, Button, Alert, Modal, notification} from 'antd';
import FormBuilder from "antd-form-builder";
import UserService from "../services/user.service";
import ReactToPrint from "react-to-print";
import {Link} from "react-router-dom";

const EditUser = props => {
    const initialUserState = {
        id_user: null,
        firstname : "",
        lastname: "",
        username: "",
        password: "",
        email: ""
    };

    const [currentUser, setcurrentUser] = useState(initialUserState);
    const [viewMode, setViewMode] = useState(true)
    const [pending, setPending] = useState(false)
    const [user, setUser] = useState(initialUserState);
    const [form] = Form.useForm();
    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

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
                console.log("se ejecuto bien");
                setcurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                console.log(e);
            });
    };

    const updateUser = () => {
        var data = {
            id_user: user.id_user,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password,
            email: user.email
        };
        // console.log("Data:", data);
        UserService.update(data)
            .then(response => {
                console.log(response.data);
                openNotification(
                    "Update Successful!",
                    "success",
                    "The User was updated successfully!"
                );
            })
            .catch(e => {
                console.log(e);
            });
    };

    const openNotification = (msg, typ, desc) => {
        notification.open({
            message: msg,
            type: typ,
            description: desc
        });
    };

    const handleFinish = useCallback(values => {
        console.log('Submit: ', values)
        setPending(true)
        setTimeout(() => {
            setPending(false)
            setcurrentUser(values)
            setViewMode(true)
            Modal.success({
                title: 'Success',
                content: 'Infomation updated.',
            })
        }, 1500)
    })

    const handleInputChange = event => {
        let { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setUser(form.getFieldsValue());
    };


    const getMeta = () => {
        const meta = {
            columns: 2,
            disabled: pending,
            initialValues: currentUser,
            fields: [
                { key: 'id_user', label: 'ID', required: true, disabled: true },
                { key: 'firstname', label: 'First Name', required: true },
                { key: 'lastname', label: 'Last Name', required: true },
                { key: 'username', label: 'Username', required: true },
                { key: 'password', label: 'Password', required: true },
                { key: 'email', label: 'Email', required: true }
            ],
        }
        return meta
    };

    const componentRef = useRef();
    return (
        <div>
            <Link to={"/user"}>
                <Button type="primary" htmlType="button">
                    Back
                </Button>
            </Link>
            <ReactToPrint
                trigger={() => <Button>Print Report</Button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef} ><Form layout="horizontal" form={form} onChange={handleInputChange} onFinish={handleFinish} style={{ width: '800px' }}>
                <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
                    User Infomation
                    {viewMode && (
                        <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
                            Edit
                        </Button>
                    )}
                </h1>
                <FormBuilder form={form} getMeta={getMeta} onChange={handleInputChange} viewMode={viewMode} />
                {!viewMode && (
                    <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={pending}
                            onClick={() => {
                                setUser(form.getFieldsValue())
                                console.log("update button, fields:", user)
                                updateUser()
                                setViewMode(true)
                            }}
                        >
                            {pending ? 'Updating...' : 'Update'}
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
                )}
            </Form></div>

            
       

        </div>
    );
};

export default EditUser;
