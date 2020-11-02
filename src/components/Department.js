import React, {useState, useEffect} from "react";
import {Alert, Button, notification, Table} from 'antd';

import DepartmentService from "../services/department.service";
import {Link} from "react-router-dom";
import Login from "./Login";
import { EditTwoTone,DeleteTwoTone,PlusCircleTwoTone } from '@ant-design/icons';

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
    },[]);

    /** Notification */
    const [message, setMessage] = useState("");
    const openNotification = () => {
        notification.open({
            message: 'Notification',
            description: message,

        });
    };
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
    const deleteDepartment= (departmentRemoval) => {

        DepartmentService.remove(departmentRemoval)
            .then(response => {
                console.log(response.data);
                console.log("se ejecuto bien");
                setMessage("The Department was deleted successfully!");
                openNotification();
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                setMessage("The Department was not deleted successfully!");
                console.log(e);
            });
    };

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
        title: 'Edit',
        render:  (department) => <a href={"/edit_department/"+department.id_department}> <EditTwoTone /></a>,
 
      },
        {
            title: 'Delete',
            render:  (department) => <DeleteTwoTone onClick={deleteDepartment(department.id_department)} /> ,
            //render:  (user) => <button onClick={showModal}> Delete </button>,

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
        <h4>Department List</h4>        <Link to={"/add_department"}>
        <Button type="primary" htmlType="button" icon={<PlusCircleTwoTone />}>
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