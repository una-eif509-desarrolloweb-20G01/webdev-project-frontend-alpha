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
            id_user: { id_user: timesheet.id_user },
            approved: timesheet.approved,
            payed: timesheet.payed,
            id_department: { id_department: timesheet.id_department }
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
                    name="timesheet_date"
                    label="Date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="timesheet_date"
                        onChange={handleInputChange}
                        placeholder="Date"
                     />
                 </Form.Item>

                 <Form.Item
                    name="monday"
                    label="Monday"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="monday"
                        onChange={handleInputChange}
                        placeholder="monday"
                     />
                 </Form.Item>

                 <Form.Item
                    name="tuesday"
                    label="Tuesday"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="tuesday"
                        onChange={handleInputChange}
                        placeholder="Tuesday"
                     />
                 </Form.Item>

                 <Form.Item
                    name="wednesday"
                    label="Wednesday"
                    rules={[
                        {
                            required: true,
                            
                        },
                    ]}
                >
                    <Input
                        name="wednesday"
                        onChange={handleInputChange}
                        placeholder="wednesday"
                     />
                 </Form.Item>

                 <Form.Item
                    name="thrusday"
                    label="Thrusday"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="thrusday"
                        onChange={handleInputChange}
                        placeholder="thrusday"
                     />
                 </Form.Item>

                <Form.Item
                    name="friday"
                    label="Friday"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="friday"
                        onChange={handleInputChange}
                        placeholder="friday"
                    />
                </Form.Item>

                <Form.Item
                    name="saturday"
                    label="Saturday"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="saturday"
                        onChange={handleInputChange}
                        placeholder="saturday"
                    />
                </Form.Item>

                <Form.Item
                    name="sunday"
                    label="Sunday"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="sunday"
                        onChange={handleInputChange}
                        placeholder="sunday"
                    />
                </Form.Item>

                <Form.Item
                    name="pay"
                    label="Pay"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="pay"
                        onChange={handleInputChange}
                        placeholder="pay"
                    />
                </Form.Item>

                <Form.Item
                    name="id_user"
                    label="User"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="id_user"
                        onChange={handleInputChange}
                        placeholder="user"
                    />
                </Form.Item>

                <Form.Item
                    name="approved"
                    label="Approved"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="approved"
                        onChange={handleInputChange}
                        placeholder="approved"
                    />
                </Form.Item>

                <Form.Item
                    name="payed"
                    label="Payed"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="payed"
                        onChange={handleInputChange}
                        placeholder="payed"
                    />
                </Form.Item>

                <Form.Item
                    name="id_department"
                    label="Department"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="id_department"
                        onChange={handleInputChange}
                        placeholder="Department"
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