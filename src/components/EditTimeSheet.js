import React, {useState, useEffect, useCallback} from "react";
import TimeSheetService from "../services/timesheet.service";
import {Form, Input, Button, Alert, Modal} from 'antd';
import FormBuilder from "antd-form-builder";

const EditTimeSheet = props => {
    const initialTimeSheetState = {
        id_time: null,
        timesheet_date: "2020-01-01",
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        pay: 0,
        id_user: null ,
        approved: false,
        payed: false,
        id_department: null
    };

    const [currentTimeSheet, setcurrentTimeSheet] = useState(initialTimeSheetState);
    const [viewMode, setViewMode] = useState(true)
    const [pending, setPending] = useState(false)
    const handleFinish = useCallback(values => {
        console.log('Submit: ', values)
        setPending(true)
        setTimeout(() => {
            setPending(false)
            setcurrentTimeSheet(values)
            setViewMode(true)
            Modal.success({
                title: 'Success',
                content: 'Information updated.',
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
    const getTimeSheet = id => {
        TimeSheetService.get(id)
            .then(response => {
                setcurrentTimeSheet(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const [form] = Form.useForm();
    useEffect(() => {
        getTimeSheet(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { email, value } = event.target;
        setcurrentTimeSheet({ ...currentTimeSheet, [email]: value });
    };

    const getMeta = () => {
        const meta = {
            columns: 2,
            disabled: pending,
            initialValues: currentTimeSheet,
            fields: [
                // { name: ['name', 'first'], label: 'First Name', required: true },
                { key: 'id', label: 'ID', required: true },
                { key: 'timesheet_date', label: 'Date', required: true },
                { key: 'monday', label: 'Monday', required: true },
                { key: 'tuesday', label: 'Tuesday', required: true },
                { key: 'wednesday', label: 'Wednesday', required: true },
                { key: 'thursday', label: 'Thursday', required: true },
                { key: 'friday', label: 'Friday', required: true },
                { key: 'saturday', label: 'Saturday', required: true },
                { key: 'sunday', label: 'Sunday', required: true },
                { key: 'pay', label: 'Pay', required: true },
                { key: 'id_user.id_user', label: 'User', required: true },
                { key: 'approved', label: 'Approved' },
                { key: 'payed', label: 'Payed', required: true },
                { key: 'id_department.id_department', label: 'Department', required: true },
            ],
        }
        return meta
    };


    const onReset = () => {
        form.resetFields();
    };

    const updateTimeSheet = () => {
        TimeSheetService.update(currentTimeSheet.id_timesheet, currentTimeSheet)
            .then(response => {
                console.log(response.data);
                setMessage("The TimeSheet was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTimeSheet = () => {
        TimeSheetService.remove(currentTimeSheet.id_timesheet)
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
                    TimeSheet Information
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

export default EditTimeSheet;
