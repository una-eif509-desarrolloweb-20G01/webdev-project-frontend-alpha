import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const EditTimeSheet = props => {
    const initialTimeSheetState = {
        id_timesheet: null,
        timesheet_name: ""
    };
    const [currentUser, setcurrentUser] = useState(initialTimeSheetState);
    const [message, setMessage] = useState("");

    const [error, setError, submitted, setSubmitted] = useState(false);

    const getUser = id => {
        UserService.get(id)
            .then(response => {
                setcurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { email, value } = event.target;
        setcurrentUser({ ...currentUser, [email]: value });
    };



    const updateUser = () => {
        UserService.update(currentUser.id_user, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The User was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        UserService.remove(currentUser.id_user)
            .then(response => {
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
        {currentUser ? (
                <div className="edit-form">
                <h4>User</h4>
                <form>
                <div className="form-group">
            <label htmlFor="user_email">Email: </label>
            <input type="text" className="form-control" id="user_email" name="user_email" value={currentUser.email} onChange={handleInputChange} />

            <label htmlFor="first_name">Name: </label>
            <input type="text" className="form-control" id="first_name" name="first_name" value={currentUser.firstname} onChange={handleInputChange} />
    
            <label htmlFor="last_name">Last name: </label>
            <input type="text" className="form-control" id="last_name" name="last_name" value={currentUser.lastname} onChange={handleInputChange} />
    

            <label htmlFor="username">Username: </label>
            <input type="text" className="form-control" id="username" name="username" value={currentUser.username} onChange={handleInputChange} />
    

    </div>



    </form>


<button className="badge badge-danger mr-2" onClick={deleteUser}>
        Delete
        </button>

        <button
    type="submit"
    className="badge badge-success"
    onClick={updateUser}
        >
        Update
        </button>
        <p>{message}</p>
        </div>
) : (
    <div>
    <br />
    <p>Please click on a User...</p>
    </div>
)}
</div>
    );
};

export default EditTimeSheet;