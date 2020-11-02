import React, {useState, useEffect, useCallback} from "react";
import DepartmentService from "../services/department.service";
import Select, {Form, Input, Button, Alert, Modal} from 'antd';
import FormBuilder from "antd-form-builder";

const EditDepartment = props => {
    const initialDepartmentState = {
        id_department: 0,
        department_name: ""
    };
    const [currentDepartment, setCurrentDepartment] = useState(initialDepartmentState);


    /**
     * Methos for handle Service
     */

    const getDepartment = id => {
        DepartmentService.get(id)
            .then(response => {
                setCurrentDepartment(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDepartment(props.match.params.id);
    }, [props.match.params.id]);

    const updateDepartment = () => {
        DepartmentService.update(currentDepartment.id_department, currentDepartment)
            .then(response => {
                console.log(response.data);
                setMessage("The department was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteDepartment = () => {
        DepartmentService.remove(currentDepartment.id_department)
            .then(response => {
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };      
/**
 * Handle form change
 *
 */
const [form] = Form.useForm();
    useEffect(() => {
        getDepartment(props.match.params.id);
    }, [props.match.params.id]);

const [viewMode, setViewMode] = useState(true)
const [pending, setPending] = useState(false)
const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
    setPending(true)
    setTimeout(() => {
        setPending(false)
        setCurrentDepartment(values)
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

const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDepartment({ ...currentDepartment, [name]: value });
};


const getMeta = () => {
    const meta = {
        columns: 2,
        disabled: pending,
        initialValues: currentDepartment,
        fields: [
            { key: 'id_department', label: 'ID', required: true },
            { key: 'department_name', label: 'Name', required: true },


        ],
    }
    return meta
};
/** 
 * Form
 */


    return (
        <div>
            <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '800px' }}>
                <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
                    Department Information
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

export default EditDepartment;