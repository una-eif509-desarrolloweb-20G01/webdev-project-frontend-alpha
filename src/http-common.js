import axios from "axios";

export default axios.create({
    //https://alpha-taskapp.herokuapp.com/api/v1/users/sign-up
    baseURL: "https://alpha-taskapp.herokuapp.com/api/v1/",
    //baseURL: "http://localhost:8083/api/v1/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});