import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import authToken from "../utils/authToken";
import authSlice from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import navbarImage from '../assets/img/navbrand.jpg'

function NavbarComp() {
    const navigate = useNavigate();
    if (localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }

    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("jwtToken");
        dispatch(authSlice.actions.success({ username: "", isLoggedIn: false }));
        navigate("/login")
    };

    const auth = useSelector((state) => state.auth.user);
    console.log("auth",auth)
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div id="menu">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Navbar light expand="md" style={{fontWeight:'600'}}>
                            <Link to={auth.isLoggedIn ? "/" : "/login"}><img src={navbarImage} style={{height:'50px', borderRadius:'15px'}}/></Link>
                                <NavbarToggler onClick={toggle} />
                                <Collapse isOpen={isOpen} navbar>
                                    <Nav className="ml-auto" style={{fontSize:'18px'}}>
                                        {auth.isLoggedIn ? (
                                            <>
                                                <NavItem>
                                                    <Link to="/" className='nav-link'>Từ vựng</Link>
                                                </NavItem>
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret>
                                                        Chào {auth.username}
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem onClick={logout}>
                                                            <i className='fa fa-sign-out' /> Đăng xuất
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </>
                                        ) : (
                                            <>
                                                <NavItem>
                                                    <Link to="/register" className='nav-link'><i className='fa fa-user-plus' />Đăng ký</Link>
                                                </NavItem>
                                                <NavItem>
                                                    <Link to="/login" className='nav-link'><i className='fa fa-sign-in' />Đăng nhập</Link>
                                                </NavItem>
                                            </>
                                        )}
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarComp