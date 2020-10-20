import React, {useState, useEffect} from "react";
import {Alert, Table} from 'antd';

import DepartmentService from "../services/department.service";

const initialDepartmentListState = [
    {
        "id_department": 0,
        "department_name": ""
    }
];

const Department = (props) => {
    const [departmentList, setDepartmentList] = useState(initialDepartmentListState);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllDepartmentsMethod();
    },);

    /** Service methods **/
    const getAllDepartmentsMethod = () => {
        DepartmentService.getAll()
            .then(response => {
                setDepartmentList(response.data);
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
            title: 'Department',
            render: (department) => department.department_name
        }
    ];

    return (
        <div>
            <Table rowKey={department => departmentList.id_department} columns={columns} dataSource={departmentList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default Department;