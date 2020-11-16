import React, {useState, useEffect,useRef} from "react";
import {Alert, Button, notification, Table, Popconfirm} from 'antd';

import TimeSheetService from "../services/timesheet.service";
import {Link} from "react-router-dom";
import { EditTwoTone,DeleteTwoTone,PlusCircleTwoTone } from '@ant-design/icons';
import ReactToPrint from "react-to-print";


const initialTimeSheetListState = [
    {
        "id_time": 0,
        "timesheet_date": "",
        "monday": 0,
        "tuesday": 0,
        "wednesday": 0,
        "thursday": 0,
        "friday": 0,
        "saturday": 0,
        "sunday": 0,
        "pay": 0,
        "id_user": { id_user: null },
        "approved": false,
        "payed": false,
        "id_department": { id_department: null }
    }
];

const TimeSheet = (props) => {
    const [timesheetList, setTimeSheetList] = useState(initialTimeSheetListState);
    const [error, setError] = useState(false);

     const [currentTimeSheet, setCurrentTimeSheet] = useState(null);
     const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        getAllTimeSheetsMethod();
    },[]);

    const openNotification = (msg, typ, desc) => {
        notification.open({
            message: msg,
            type: typ,
            description: desc
        });
    };

    /** Service methods **/
    const getAllTimeSheetsMethod = () => {
        TimeSheetService.getAll()
            .then(response => {
                setTimeSheetList(response.data);
                console.log("TimeSheets: ", response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                }
            });
    }

    const deleteTimeSheet= (timesheetRemoval) => {
        TimeSheetService.remove(timesheetRemoval)
            .then(response => {
                console.log(response.data);
                console.log("se ejecuto bien");
                openNotification(
                    "Delete Successful!",
                    "success",
                    "The TimeSheet was deleted successfully."
                );
                refreshList();
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                openNotification(
                    "Delete Unsuccessful!",
                    "error",
                    "The TimeSheet was not deleted."
                );
                console.log(e);
            });
    };

    const refreshList = () => {
        getAllTimeSheetsMethod();
        setCurrentTimeSheet(null);
        setCurrentIndex(-1);
    };

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'ID',
            render: (timesheet) => timesheet.id_time
        },
        {
            title: 'Date',
            render: (timesheet) => timesheet.timesheet_date
        },
        {
            title: 'Mo',
            render: (timesheet) => timesheet.monday
        },
        {
            title: 'Tu',
            render: (timesheet) => timesheet.tuesday
        },
        {
            title: 'We',
            render: (timesheet) => timesheet.wednesday
        },
        {
            title: 'Th',
            render: (timesheet) => timesheet.thursday
        },
        {
            title: 'Fr',
            render: (timesheet) => timesheet.friday
        },
        {
            title: 'Sa',
            render: (timesheet) => timesheet.saturday
        },
        {
            title: 'Su',
            render: (timesheet) => timesheet.sunday
        },
        {
            title: 'Pay',
            render: (timesheet) => timesheet.pay
        },
        {
            title: 'User',
            render: (timesheet) => timesheet.id_user.id_user
        },
        {
            title: 'Approved',
            render: (timesheet) => timesheet.approved+''
        },
        {
            title: 'Payed',
            render: (timesheet) => timesheet.payed+''
        },
        {
            title: 'Department',
            render: (timesheet) => timesheet.id_department.id_department
        },
        {
            title: 'Edit',
            render:  (timesheet) => <a href={"/edit_timesheet/"+timesheet.id_time}>Editar</a>,

        },
        {
            title: 'Delete',
            render: (timesheet) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteTimeSheet(timesheet.id_time)}>
                    <a>Delete</a>
                </Popconfirm>
        }
    ];

    const componentRef = useRef();
    return (

            <div className="col-md-8">
                <h4>TimeSheet List</h4>

                <Link to={"/add_timesheet"}>
                    <Button type="primary" htmlType="button" icon={<PlusCircleTwoTone />}> Add TimeSheet </Button>
                </Link>

                <ReactToPrint
                    trigger={() => <Button type="default" htmlType="button"  > Print Report</Button>}
                    content={() => componentRef.current}
                />
                <div ref={componentRef} >
                    <Table rowKey={timesheet => timesheetList.id_time} columns={columns} dataSource={timesheetList}/>
                    {error ? (
                        <Alert message="Error, you must login first." type="error" showIcon closable/>
                    ) : null}
                </div>
            </div>
    )

};

export default TimeSheet;