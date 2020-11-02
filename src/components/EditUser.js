import React, {useState, useEffect, useCallback} from "react";
import Select, {Form, Input, Button, Alert, Modal} from 'antd';
import FormBuilder from "antd-form-builder";

import UserService from "../services/user.service";
import DepartmentService from "../services/department.service";

const EditUser = props => {
    const initialUserState = {
        id_user: null,
        email: "",
        firstname : "",
        lastname: "",
        username: ""
    };
    const initialDepartmentListState = [
        {
            "id_department": 0,
            "department_name": ""
        }
    ];


    
    const [departmentList, setDepartmentList] = useState(initialDepartmentListState);
    // const { Option } = Select;
    const [currentUser, setcurrentUser] = useState(initialUserState);

    const [viewMode, setViewMode] = useState(true)
    const [pending, setPending] = useState(false)
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
                console.log("se ejecuto bien");
                setcurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log("no se ejecuto bien");
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

    const getMeta = () => {
        const meta = {
            columns: 2,
            disabled: pending,
            initialValues: currentUser,
            fields: [
                { key: 'id_user', label: 'ID', required: true },
                { key: 'email', label: 'Email', required: true },
                { key: 'firstname', label: 'First Name', required: true },
                { key: 'lastname', label: 'Last Name', required: true },
                { key: 'username', label: 'Username', required: true },

            ],
        }
        return meta
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
            <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '800px' }}>
                <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
                    User Infomation
                    {viewMode && (
                        <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
                            Edit
                        </Button>
                    )}
                </h1>
                <FormBuilder form={form} getMeta={getMeta} viewMode={viewMode} />
                {!viewMode && (
                    <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
                        <Button htmlType="submit" type="primary" disabled={pending}>
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
            </Form>
       

        </div>
    );
};

export default EditUser;
