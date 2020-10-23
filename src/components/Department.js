import React, {useState, useEffect} from "react";
import {Alert, Button, Table} from 'antd';

import DepartmentService from "../services/department.service";
import {Link} from "react-router-dom";
import Login from "./Login";

const initialDepartmentListState = [
    {
        "id_department": 0,
        "department_name": ""
    }
];

const Department = (props) => {
    const [departmentList, setDepartmentList] = useState(initialDepartmentListState);
    const [error, setError] = useState(false);

    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

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
            title: 'List of Departments',
            render: (department) => department.department_name
        }
    ];

    const refreshList = () => {
        getAllDepartmentsMethod();
        setCurrentDepartment(null);
        setCurrentIndex(-1);
    };

    const setActiveDepartment = (department, index) => {
        setCurrentDepartment(department);
        setCurrentIndex(index);
    };

    return (
     /*   <div>
            <Link to={"/add_department"}>
                <Button type="primary" htmlType="button">
                    Add
                </Button>
            </Link>
            <Table rowKey={department => departmentList.id_department} columns={columns} dataSource={departmentList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>*/

        <div className="list row">

        <div className="col-md-6">
        <h4>Departments List</h4>
    <Table rowKey={department => departmentList.id_department} columns={columns} dataSource={departmentList}

    />
    <ul className="list-group">
        {departmentList &&
        departmentList.map((departmentList, index) => (
            <li
    className={
        "list-group-item " + (index === currentIndex ? "active" : "")
    }
    onClick={() => setActiveDepartment(departmentList , index)}
    key={index}
        >
        {departmentList.department_name}
        </li>
))}
</ul>


    </div>
    <div className="col-md-6">
        {currentDepartment ? (
                <div>
                <h4>Tutorial</h4>
                <div>
                <label>
                <strong>Title:</strong>
        </label>{" "}
    {currentDepartment.id_department}
</div>
    <div>
    <label>
    <strong>Description:</strong>
    </label>{" "}
    {currentDepartment.department_name}
</div>


    <Link
    to={"/edit_department/" + currentDepartment.id_department}
    className="badge badge-warning"
        >
        Edit
        </Link>
        </div>
) : (
    <div>
    <br />
    <p>Please click on a Department...</p>
    </div>
)}
</div>
    </div>
    )
};

export default Department;