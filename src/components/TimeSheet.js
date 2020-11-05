import React, {useState, useEffect} from "react";
import {Alert, Button, Table} from 'antd';

import TimeSheetService from "../services/timesheet.service";
import {Link} from "react-router-dom";

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

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'ID',
            render: (timesheet) => timesheet.id
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
            render: (timesheet) => timesheet.id_user
        },
        {
            title: 'Approved',
            render: (timesheet) => timesheet.approved
        },
        {
            title: 'Payed',
            render: (timesheet) => timesheet.payed
        },
        {
            title: 'Department',
            render: (timesheet) => timesheet.id_department
        },
        {
            title: 'Editar',
            render:  (timesheet) => <a href={"/edit_timesheet/"+timesheet.id}>Editar</a>,

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

    return (
        <div>
            <Table rowKey={timesheet => timesheetList.id_time} columns={columns} dataSource={timesheetList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )

};

export default TimeSheet;