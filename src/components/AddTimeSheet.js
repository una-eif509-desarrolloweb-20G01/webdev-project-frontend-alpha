import React, {useState} from "react";
import TimeSheetService from "../services/timesheet.service";
import {Form, Input, Button, Alert} from 'antd';
import {Link} from "react-router-dom";
import {  } from '@ant-design/icons';

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


const AddTimeSheet = (props) => {
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
    const [form] = Form.useForm();
    const [timesheet, setTimeSheet] = useState(initialTimeSheetState);
    const [error, setError, submitted, setSubmitted] = useState(false);

 

    const handleInputChange = event => {
        let { name, value } = event.target;
        setTimeSheet({ ...timesheet, [name]: value });
    };



    const saveTimeSheet = () => {
        var data = {
            id_time: timesheet.id_time,
            timesheet_date: timesheet.timesheet_date,
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

        TimeSheetService.create(data)
            .then(response => {
                setTimeSheet({
                    id_time: response.data.id_time,
                    timesheet_date: response.data.timesheet_date,
                    monday: response.data.monday,
                    tuesday: response.data.tuesday,
                    wednesday: response.data.wednesday,
                    thursday: response.data.thursday,
                    friday: response.data.friday,
                    saturday: response.data.saturday,
                    sunday: response.data.sunday,
                    pay: response.data.pay,
                    id_user: response.data.id_user,
                    approved: response.data.approved,
                    payed: response.data.payed,
                    id_department: response.data.id_department
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)

            });
    };

    const newTimeSheet = () => {
        setTimeSheet(initialTimeSheetState);
        setSubmitted(false);
    };
    /** General Methods **/

    const onFinish = data => {
        console.log(timesheet);
        saveTimeSheet();
    };

    const onReset = () => {
        form.resetFields();
    };
    return (
        <div>
        <Link to={"/timesheet"}>
            <Button type="primary" htmlType="button">
                Back
            </Button>
        </Link>
        <h1>Add TimeSheet</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
 
                <Form.Item
                    name="id_time"
                    label="ID"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="id_time"
                        onChange={handleInputChange}
                        placeholder="ID"
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
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="lastname"
                        onChange={handleInputChange}
                        placeholder="last name"
                     />
                 </Form.Item>

                 <Form.Item
                    name="TimeSheet name"
                    label="timesheetname"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="timesheetname"
                        onChange={handleInputChange}
                        placeholder="TimeSheet Name"
                     />
                 </Form.Item>

                 <Form.Item
                    name="password"
                    label="password"
                    rules={[
                        {
                            required: true,
                            
                        },
                    ]}
                >
                    <Input
                        name="password"
                        onChange={handleInputChange}
                        placeholder="password"
                     />
                 </Form.Item>

                 <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="email"
                        onChange={handleInputChange}
                        placeholder="email"
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
                    <Alert message="TimeSheet Saved" type="success" showIcon closable />
                ) : null}
                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}

        </div>

    )
};

export default AddTimeSheet;