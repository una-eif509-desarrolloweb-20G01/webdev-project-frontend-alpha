import React, { useState, useEffect } from "react";
import DepartmentService from "../services/department.service";

const EditDepartment = props => {
    const initialDepartmentState = {
        id_department: 0,
        department_name: ""
    };
    const [currentDepartment, setCurrentDepartment] = useState(initialDepartmentState);
    const [message, setMessage] = useState("");

    const [error, setError, submitted, setSubmitted] = useState(false);

    const getDepartment = id => {
        DepartmentService.get(id)
            .then(response => {
                setCurrentDepartment(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDepartment(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDepartment({ ...currentDepartment, [name]: value });
    };



    const updateDepartment = () => {
        DepartmentService.update(currentDepartment.id_department, currentDepartment)
            .then(response => {
                console.log(response.data);
                setMessage("The department was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteDepartment = () => {
        DepartmentService.remove(currentDepartment.id_department)
            .then(response => {
                console.log(response.data);
               // setError(err)
                // /props.history.push("/departments");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
        {currentDepartment ? (
                <div className="edit-form">
                <h4>Department</h4>
                <form>
                <div className="form-group">
            <label htmlFor="department_name">Nombre</label>
            <input
            type="text"
            className="form-control"
            id="department_name"
            name="department_name"
            value={currentDepartment.department_name}
            onChange={handleInputChange}
    />
    </div>



    </form>


<button className="badge badge-danger mr-2" onClick={deleteDepartment}>
        Delete
        </button>

        <button
    type="submit"
    className="badge badge-success"
    onClick={updateDepartment}
        >
        Update
        </button>
        <p>{message}</p>
        </div>
) : (
    <div>
    <br />
    <p>Please click on a Department...</p>
    </div>
)}
</div>
    );
};

export default EditDepartment;