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
            title: 'Deparment ID',
            render: (department) => department.id_department
        }
        ,
        {
            title: 'Deparment Name',
            render: (department) => department.department_name
        }
        ,
        {
        title: 'Editar',
        render:  (department) => <a href={"/edit_department/"+department.id_department}>Editar</a>,
 
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
    

        <div className="list row">

        <div className="col-md-6">
        <h4>User List</h4>        <Link to={"/edit_department"}>
        <Button type="primary" htmlType="button">
        Add
        </Button>
        </Link>
    <Table rowKey={user => departmentList.id_user } columns={columns} dataSource={departmentList} size="small" 
        
    />
   
    </div>

    </div>
    )
};

export default Department;