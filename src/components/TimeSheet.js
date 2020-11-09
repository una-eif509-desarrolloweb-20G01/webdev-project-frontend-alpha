import React, {useState, useEffect,useRef} from "react";
import {Alert, Button, notification, Table, Popconfirm} from 'antd';

import TimeSheetService from "../services/timesheet.service";
import {Link} from "react-router-dom";
import DepartmentService from "../services/timesheet.service";
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
        "id_user": 0 ,
        "approved": false,
        "payed": false,
        "id_department": ""
    }
];

const TimeSheet = (props) => {
    const [timesheetList, setTimeSheetList] = useState(initialTimeSheetListState);
    const [error, setError] = useState(false);

    const [currentTimeSheet, setCurrentTimeSheet] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllTimeSheetsMethod();
    },[]);

    const [message, setMessage] = useState("");
    const deleteNotification = type => {
        notification[type]({
            message: 'Delete successful'
        });
    };

    /** Service methods **/
    const getAllTimeSheetsMethod = () => {
        TimeSheetService.getAll()
            .then(response => {
                setTimeSheetList(response.data);
                console.log(response.data);
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
                setMessage("The TimeSheet was deleted successfully!");
                deleteNotification('success');
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                setMessage("The TimeSheet was not deleted successfully!");
                console.log(e);
            });
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
        // {
        //     title: 'Delete',
        //     //render:  (timesheet) => <button onClick={deleteTimeSheet(timesheet.id_time)}>Delete</button> ,
        // },
        {
            title: 'Delete',
            render: (timesheet) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteTimeSheet(timesheet.id_time)}>
                    <a>Delete</a>
                </Popconfirm>

        }
    ];

    const refreshList = () => {
        getAllTimeSheetsMethod();
        setCurrentTimeSheet(null);
        setCurrentIndex(-1);
    };

    const setActiveTimeSheet = (timesheet, index) => {
        setCurrentTimeSheet(timesheet);
        setCurrentIndex(index);
    };

    const componentRef = useRef();
    return (

            <div className="col-md-8">
                <h4>TimeSheet List</h4>

                <Link to={"/add_user"}>
                    <Button type="primary" htmlType="button" icon={<PlusCircleTwoTone />}> Add User </Button>
                </Link>

                <ReactToPrint
                    trigger={() => <Button type="default" htmlType="button"  > Print Report</Button>}
                    content={() => componentRef.current}
                />
                <div ref={componentRef} >
                    <Table rowKey={timesheet => timesheetList.id_time} columns={columns} dataSource={timesheetList}/>
                    {error ? (
                        <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                    ) : null}

                </div>
            </div>
    )

};

export default TimeSheet;