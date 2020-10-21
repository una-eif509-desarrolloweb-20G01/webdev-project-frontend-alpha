import React, {useState} from "react";
import DepartmentService from "../services/department.service";
import {Form, Input, Button, Alert} from 'antd';
import {Link} from "react-router-dom";

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
    const [error, setError, submitted, setSubmitted] = useState(false);

    /*
    const [departmentList, setDepartmentList] = useState(initialDepartmentListState);
    const [error, setError] = useState(false);
     */

    const handleInputChange = event => {
        let { name, value } = event.target;
        setDepartment({ ...department, [name]: value });
    };

   /* useEffect(() => {
        saveDepartment();
    },);*/

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

    const onReset = () => {
        form.resetFields();
    };
    return (
        <div>
        <Link to={"/department"}>
            <Button type="primary" htmlType="button">
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

       /* <div className="submit-form">
        {submitted ? (
                <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newDepartment}>
            Add
            </button>
            </div>
) : (
    <div>
    <div className="form-group">
        <label htmlFor="id_department">ID</label>
        <input
    type="text"
    className="form-control"
    id="title"
    required
    value={department.id_department}
    onChange={handleInputChange}
    name="id_department"
        />
        </div>

        <div className="form-group">
        <label htmlFor="department_name">Name</label>
        <input
    type="text"
    className="form-control"
    id="department_name"
    required
    value={department.department_name}
    onChange={handleInputChange}
    name="department_name"
        />
        </div>

        <button onClick={saveDepartment} className="btn btn-success">
        Submit
        </button>
        </div>
)}
</div>*/
    )
};

export default AddDepartment;