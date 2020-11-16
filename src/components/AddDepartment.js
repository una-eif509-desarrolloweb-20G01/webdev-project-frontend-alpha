import React, {useState} from "react";
import DepartmentService from "../services/department.service";
import {Form, Input, Button, Alert, notification} from 'antd';
import {Link} from "react-router-dom";
import {LeftCircleTwoTone, PlusCircleTwoTone} from '@ant-design/icons';

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

const AddDepartment = (props) => {
    const initialDepartmentState = {
        id_department: null,
        department_name: ""
    };
    const [form] = Form.useForm();
    const [department, setDepartment] = useState(initialDepartmentState);
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        let { name, value } = event.target;
        setDepartment({ ...department, [name]: value });
    };


    const saveDepartment = () => {
        var data = {
            id_department: department.id_department,
            department_name: department.department_name
        };

        DepartmentService.create(data)
            .then(response => {
                setDepartment({
                    id_department: response.data.id_department,
                    department_name: response.data.department_name
                });
                setSubmitted(true);
                openNotification(
                    "Create Successful!",
                    "success",
                    "The Department was created successfully!"
                );
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                /* if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                } */
            });
    };

    const newDepartment = () => {
        setDepartment(initialDepartmentState);
        setSubmitted(false);
    };
    /** General Methods **/

    const onFinish = data => {
        console.log(department);
        saveDepartment();
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
        <Link to={"/department"}>
            <Button type="primary" htmlType="button" icon={<LeftCircleTwoTone />} >
                Back
            </Button>
        </Link>
        <h1>Add Department</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="id_department"
                    label="ID"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="id_department"
                        onChange={handleInputChange}
                        placeholder="ID"
                    />
                </Form.Item>
                <Form.Item
                    name="department_name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="department_name"
                        onChange={handleInputChange}
                        placeholder="Name"
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
                    <Alert message="Department Saved" type="success" showIcon closable />
                ) : null}
                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}

        </div>
    )
};

export default AddDepartment;