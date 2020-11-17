import React, {useState, useEffect, useCallback, useRef} from "react";
import TimeSheetService from "../services/timesheet.service";
import {Form, Input, Button, Alert, Modal, notification} from 'antd';
import FormBuilder from "antd-form-builder";
import {Link} from "react-router-dom";
import ReactToPrint from "react-to-print";
import {EditTwoTone, LeftCircleTwoTone, PrinterOutlined} from "@ant-design/icons";

const EditTimeSheet = props => {
    const initialTimeSheetState = {
        id_time: null,
        timesheet_date: "1970-01-01",
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        pay: 0,
        id_user: null,
        approved: false,
        payed: false,
        id_department: null
    };

    const [currentTimeSheet, setcurrentTimeSheet] = useState(initialTimeSheetState);
    const [viewMode, setViewMode] = useState(true)
    const [pending, setPending] = useState(false)
    const [timesheet, setTimeSheet] = useState(initialTimeSheetState);
    const [form] = Form.useForm();
    useEffect(() => {
        getTimeSheet(props.match.params.id);
    }, [props.match.params.id]);

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

    const updateTimeSheet = () => {
        var data = {
            id_time: timesheet.id_time,
            timesheet_date:timesheet.timesheet_date,
            monday: timesheet.monday,
            tuesday: timesheet.tuesday,
            wednesday: timesheet.wednesday,
            thursday: timesheet.thursday,
            friday: timesheet.friday,
            saturday: timesheet.saturday,
            sunday: timesheet.sunday,
            pay: timesheet.pay,
            id_user: timesheet.id_user,
            approved: timesheet.approved,
            payed: timesheet.payed,
            id_department: timesheet.id_department 
        };
        // console.log("Data:", data);
        TimeSheetService.update(data)
            .then(response => {
                console.log(response.data);
                openNotification(
                    "Update Successful!",
                    "success",
                    "The TimeSheet was updated successfully!"
                );
            })
            .catch(e => {
                console.log(e);
                openNotification(
                    "Update Unsuccessful!",
                    "error",
                    "The TimeSheet was not updated successfully!"
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
            setcurrentTimeSheet(values)
            setViewMode(true)
            Modal.success({
                title: 'Success',
                content: 'Information updated.',
            })
        }, 1500)
    })

    const handleInputChange = event => {
        let { name, value } = event.target;
        setTimeSheet({ ...timesheet, [name]: value });
        setTimeSheet(form.getFieldsValue())
    };

    const getMeta = () => {
        const meta = {
            columns: 2,
            disabled: pending,
            initialValues: currentTimeSheet,
            fields: [
                // { name: ['name', 'first'], label: 'First Name', required: true },
                { key: 'id_time', label: 'ID', required: true, disabled: true },
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
                { key: 'approved', label: 'Approved', required: true},
                { key: 'payed', label: 'Payed', required: true },
                { key: 'id_department.id_department', label: 'Department', required: true },
            ],
        }
        return meta
    };

    const componentRef = useRef();
    return (
        <div>
            <Link to={"/timesheet"}>
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
                        TimeSheet Information
                        {viewMode && (
                            <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
                                <EditTwoTone />
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
                                    setTimeSheet(form.getFieldsValue())
                                    console.log("update button, fields:", timesheet)
                                    updateTimeSheet()
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

export default EditTimeSheet;
