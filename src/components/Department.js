import React, {useState, useEffect, useRef} from "react";
import {Alert, Button, notification, Popconfirm, Table} from 'antd';

import DepartmentService from "../services/department.service";
import {Link} from "react-router-dom";
import Login from "./Login";
import { EditTwoTone,DeleteTwoTone,PlusCircleTwoTone } from '@ant-design/icons';
import ReactToPrint from "react-to-print";

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

    // const [message, setMessage] = useState("");
    const openNotification = (msg, typ, desc) => {
        notification.open({
            message: msg,
            type: typ,
            description: desc
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
                openNotification(
                    "Delete Successful!",
                    "success",
                    "The Department was deleted successfully."
                );
                refreshList();
            })
            .catch(e => {
                console.log("no se ejecuto bien");
                openNotification(
                    "Delete Unsuccessful!",
                    "error",
                    "The Department was not deleted."
                );
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
            render: (department) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteDepartment(department.id_department)}>
                    <a>Delete</a>
                </Popconfirm>
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

    const componentRef = useRef();
    return (
        <div className="list row">
            <div className="col-md-6">
            <h4>Department List</h4>
                <Link to={"/add_department"}>
                    <Button type="primary" htmlType="button" icon={<PlusCircleTwoTone />}>
                        Add
                    </Button>
                </Link>
                <ReactToPrint
                    trigger={() => <Button type="default" htmlType="button"  > Print Report</Button>}
                    content={() => componentRef.current}
                />
                <div ref={componentRef} >
                    <Table rowKey={user => departmentList.id_user } columns={columns} dataSource={departmentList} size="small"/>
                </div>
            </div>
        </div>
    )
};

export default Department;