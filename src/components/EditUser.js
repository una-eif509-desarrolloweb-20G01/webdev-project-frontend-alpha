import React, {useState, useEffect, useCallback} from "react";
import UserService from "../services/user.service";
import {Form, Input, Button, Alert, Modal} from 'antd';
import FormBuilder from "antd-form-builder";
import {Form, Input, Button, Alert,Select} from 'antd';
import DepartmentService from "../services/department.service";

const EditUser = props => {
    const initialUserState = {
        id_user: null,
        email: "",
        firstname : "",
        lastname: "",
        username: ""
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

    const getMeta = () => {
        const meta = {
            columns: 2,
            disabled: pending,
            initialValues: currentUser,
            fields: [
                 // { name: ['name', 'first'], label: 'First Name', required: true },
                { key: 'id_user', label: 'ID', required: true },
                { key: 'email', label: 'Email', required: true },
                { key: 'firstname', label: 'First Name', required: true },
                { key: 'lastname', label: 'Last Name', required: true },
                { key: 'username', label: 'Username', required: true },
                { key: 'email', label: 'Email' },
            ],
        }
        return meta
    }


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
    )
};

export default EditUser;
