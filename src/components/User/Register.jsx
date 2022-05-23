import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authSlice from '../../redux/authSlice';
import axios from "axios";
import NavbarComp from './../NavBarComp';
import MyToast from "../Admin/MyToast";

const Register = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const initialState = {
        name: "",
        email: "",
        password: "",
        repassword: "",
        mobile: "",
    };

    const [user, setUser] = useState(initialState);

    const userChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const validateUser = () => {
        // axios.post("http://localhost:8081/rest/user/authenticate", {
        //     email: user.email,
        //     password: user.password,
        // }).then((response) => {
        //     console.log(response.data);
        //     localStorage.setItem("jwtToken", response.data.token);
        //     dispatch(authSlice.actions.success({ username: response.data.name, isLoggedIn: true , isAdmin: response.data.authorities[0]==='ROLE_ADMIN' }));
        //     if(response.data.authorities[0]==='ROLE_ADMIN'){
        //         navigate("/admin/dashboard")
        //     } else{
        //         navigate("/");
        //     }

        // }).catch((error) => {
        //     console.log(error);
        //     setShow(true);
        //     resetLoginForm();
        //     setError("Invalid email and password");
        // });

    };

    const resetRegisterForm = () => {
        setUser(initialState);
    };

    return (
        <>
            <NavbarComp />
            <div id="main-ct" className="p-child-dkr" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" style={{ marginTop: '25px' }}>
                            <div className="justify-content-md-center row">
                                <div className="col-5">
                                    <div style={{ display: show ? "block" : "none" }}>
                                        <MyToast show={show} message={message} type={"success"} />
                                    </div>
                                    <div className="bg-light text-dark card" style={{border:'1px solid black'}}>
                                        <div className="card-header" style={{backgroundColor:'#6d9bff', fontWeight: 'bold'}}>
                                            <i className="fa fa-user-plus" /> Đăng ký</div>
                                        <div className="card-body">
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fa fa-user" style={{ width: '16px' }} />
                                                            </span>
                                                        </div>
                                                        <input
                                                            required
                                                            autoComplete="off"
                                                            type="text"
                                                            name="name"
                                                            value={user.name}
                                                            onChange={userChange}
                                                            className="bg-light text-white form-control"
                                                            placeholder="Họ và tên"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
                                                            autoComplete="off"
                                                            name="email"
                                                            placeholder="Email"
                                                            type="text"
                                                            className="bg-light text-dark form-control"
                                                            value={user.email}
                                                            onChange={userChange}
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
                                                            autoComplete="off"
                                                            name="password"
                                                            placeholder="Mật khẩu"
                                                            type="password"
                                                            className="bg-light text-dark form-control"
                                                            value={user.password}
                                                            onChange={userChange}
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
                                                            autoComplete="off"
                                                            name="repassword"
                                                            placeholder="Nhập lại mật khẩu"
                                                            type="password"
                                                            className="bg-light text-dark form-control"
                                                            value={user.repassword}
                                                            onChange={userChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fa fa-phone" style={{ width: '16px' }} />
                                                            </span>
                                                        </div>
                                                        <input
                                                            required
                                                            autoComplete="off"
                                                            name="mobile"
                                                            placeholder="Số điện thoại"
                                                            type="text"
                                                            className="bg-light text-dark form-control"
                                                            value={user.mobile}
                                                            onChange={userChange}
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
                                                <i className="fa fa-sign-in" /> Register
                                            </button>{" "}
                                            <button
                                                type="button"
                                                className="btn btn-info btn-sm"
                                                onClick={resetRegisterForm}
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

export default Register;
