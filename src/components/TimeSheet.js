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
        "id_user": "" ,
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
    },);

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
            title: 'List of TimeSheets',
            render: (timesheet) => timesheet.id_time
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