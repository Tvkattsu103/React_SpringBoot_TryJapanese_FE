import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authSlice from '../../redux/authSlice';
import axios from "axios";
import NavbarComp from './../NavBarComp';

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState();
    const [show, setShow] = useState(true);

    const initialState = {
        email: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);

    const credentialChange = (e) => {
        localStorage.removeItem("jwtToken");
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateUser = () => {
        axios.post("http://localhost:8081/rest/user/authenticate", {
            email: user.email,
            password: user.password,
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem("jwtToken", response.data.token);
            dispatch(authSlice.actions.success({ username: response.data.name, isLoggedIn: true , isAdmin: response.data.authorities[0]==='ROLE_ADMIN' }));
            if(response.data.authorities[0]==='ROLE_ADMIN'){
                navigate("/admin/dashboard")
            } else{
                navigate("/");
            }
            
        }).catch((error) => {
            console.log(error);
            setShow(true);
            resetLoginForm();
            setError("Invalid email and password");
        });

    };

    const resetLoginForm = () => {
        setUser(initialState);
    };

    useEffect(() => {
        localStorage.removeItem("jwtToken");
    },[])

    return (
        <>
            <NavbarComp />
            <div id="main-ct" className="p-child-dkr" >
                <div className="container" style={{marginTop:'110px'}}>
                    <div className="row">
                        <div className="col-lg-12" style={{ marginTop: '20px' }}>
                            <div className="justify-content-md-center row">
                                <div className="col-5">
                                    {show && props.message && (
                                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                                            {props.message}
                                        </Alert>
                                    )}
                                    {show && error && (
                                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                            {error}
                                        </Alert>
                                    )}
                                    <div className="bg-light text-dark card" style={{border:'1px solid black'}}>
                                        <div className="card-header" style={{backgroundColor:'#6d9bff', fontWeight: 'bold'}}>
                                            <i className="fa fa-sign-in" /> Đăng nhập</div>
                                        <div className="card-body">
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fa fa-envelope" />
                                                            </span>
                                                        </div>
                                                        <input
                                                            required
                                                            name="email"
                                                            placeholder="Email"
                                                            type="text"
                                                            className="bg-light text-dark form-control"
                                                            value={user.email}
                                                            onChange={credentialChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fa fa-lock" style={{ width: '16px' }} />
                                                            </span>
                                                        </div>
                                                        <input
                                                            required
                                                            name="password"
                                                            placeholder="Mật khẩu"
                                                            type="password"
                                                            className="bg-light text-dark form-control"
                                                            value={user.password}
                                                            onChange={credentialChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{ textAlign: 'right' }}>
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm"
                                                onClick={validateUser}
                                                disabled={user.email.length === 0 || user.password.length === 0}
                                            >
                                                <i className="fa fa-sign-in" /> Đăng nhập
                                            </button>{" "}
                                            <button
                                                type="button"
                                                className="btn btn-info btn-sm"
                                                onClick={resetLoginForm}
                                                disabled={user.email.length === 0 || user.password.length === 0}
                                            >
                                                <i className="fa fa-undo" /> Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
