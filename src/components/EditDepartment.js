import React, {useState, useEffect, useCallback, useRef} from "react";
import DepartmentService from "../services/department.service";
import Select, {Form, Input, Button, Alert, Modal, notification} from 'antd';
import FormBuilder from "antd-form-builder";
import {Link} from "react-router-dom";
import ReactToPrint from "react-to-print";
import {EditTwoTone, LeftCircleTwoTone, PrinterOutlined} from "@ant-design/icons";

const EditDepartment = props => {
    const initialDepartmentState = {
        id_department: 0,
        department_name: ""
    };
    const [currentDepartment, setCurrentDepartment] = useState(initialDepartmentState);

    const [form] = Form.useForm();
    useEffect(() => {
        getDepartment(props.match.params.id);
        }, [props.match.params.id]);

    const [viewMode, setViewMode] = useState(true)
    const [pending, setPending] = useState(false)
    const [department, setDepartment] = useState(initialDepartmentState);

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

    const updateDepartment = () => {
        var data = {
            id_department: department.id_department,
            department_name: department.department_name
        };
        // console.log("Data:", data);
        DepartmentService.update(data)
            .then(response => {
                console.log(response.data);
                openNotification(
                    "Update Successful!",
                    "success",
                    "The Department was updated successfully!"
                );
            })
            .catch(e => {
                console.log(e);
                openNotification(
                    "Update Unsccessful!",
                    "error",
                    "The Department was not updated successfully!"
                );
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
            setCurrentDepartment(values)
            setViewMode(true)
            Modal.success({
                title: 'Success',
                content: 'Infomation updated.',
            })
        }, 1500)
    })

    const handleInputChange = event => {
        let { name, value } = event.target;
        setDepartment({ ...department, [name]: value });
        setDepartment(form.getFieldsValue())
    };


    const getMeta = () => {
        const meta = {
            columns: 2,
            disabled: pending,
            initialValues: currentDepartment,
            fields: [
                { key: 'id_department', label: 'ID', required: true, disabled: true },
                { key: 'department_name', label: 'Name', required: true },
            ],
        }
        return meta
    };


    const componentRef = useRef();
    return (
        <div>
            <Link to={"/department"}>
                <Button type="primary" htmlType="button" icon={<LeftCircleTwoTone />}>
                    Back
                </Button>
            </Link>
            <ReactToPrint
                trigger={() => <Button icon={<PrinterOutlined />}>Print Report</Button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef}>
                <Form layout="horizontal" form={form} onChange={handleInputChange} onFinish={handleFinish} style={{ width: '800px' }}>
                    <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
                        Department Information
                        {viewMode && (
                            <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
                                <EditTwoTone />
                            </Button>
                        )}
                    </h1>
                    <FormBuilder form={form} getMeta={getMeta} onChange={handleInputChange} viewMode={viewMode} />
                    {!viewMode && (
                        <Form.Item className="form-footer"  wrapperCol={{ span: 16, offset: 4 }}>
                            <Button 
                                htmlType="submit" 
                                type="primary" 
                                disabled={pending}
                                onClick={() => {
                                    setDepartment(form.getFieldsValue())
                                    console.log("update button, fields:", department)
                                    updateDepartment()
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
                </Form>
            </div>
        </div>
    );
};

export default EditDepartment;