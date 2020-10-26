import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Home from "./components/Home";
import Department from "./components/Department";
import TimeSheet from "./components/TimeSheet";
import AddDepartment from "./components/AddDepartment";
import EditDepartment from "./components/EditDepartment";
import Signup from "./components/Signup";
import User from "./components/User";
function App() {
    const {Header, Content, Footer} = Layout;
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <Router>
        <Layout className="layout">
        <Header>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
        <Link to={"/login"}>
        Login
        </Link>
        </Menu.Item>
        <Menu.Item key="1">
        <Link to={"/signup"}>
        Sign up
    </Link>
    </Menu.Item>

    <Menu.Item key="2">
        <a href="/login" className="nav-link" onClick={logOut}>
        LogOut
        </a>
        </Menu.Item>
     
        <Menu.Item key="2">
        <a href="/Department" className="nav-link"  >
        Department
        </a>
        </Menu.Item>
     
    
        </Menu>


        </Header>
        <Content style={{padding: '0 50px'}}>
<Breadcrumb style={{margin: '16px 0'}}>
<Breadcrumb.Item>Home</Breadcrumb.Item>
    </Breadcrumb>
    <div className="site-layout-content">
        <Switch>
            <Route exact path={["/", "/home"]} component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/department" component={Department}/>
            <Route exact path="/timesheet" component={TimeSheet}/>
            <Route exact path="/add_department" component={AddDepartment}/>
            <Route exact path="/edit_department/:id" component={EditDepartment}/>
            <Route exact path="/user" component={User}/>
            <Route exact path="/signup" component={Signup}/>
    </Switch>
    </div>
    </Content>
    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    </Router>
);
}

export default App;