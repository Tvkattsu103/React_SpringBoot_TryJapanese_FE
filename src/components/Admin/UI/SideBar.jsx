import React from 'react'
import { Link } from 'react-router-dom';
import {wordLengthSelector, topicLengthSelector, userLengthSelector} from '../../../redux/selectors';
import { useSelector } from 'react-redux';
import navbarImage from '../../../assets/img/navbrand.jpg'

function SideBar() {
    const wordlength = useSelector(wordLengthSelector);
    const topiclength = useSelector(topicLengthSelector);
    const userlength = useSelector(userLengthSelector);
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* Sidebar - Brand */}
            <Link to="/admin/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"/>
                </div>
                <img className="sidebar-brand-text mx-3" src={navbarImage} style={{height:'50px', borderRadius:'15px'}}/>
                {/* <div className="sidebar-brand-text mx-3">THTiengNhat</div> */}
            </Link>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                    <i className="fa fa-home fa-tachometer-alt" style={{fontSize:'20px', color:'white'}}/>
                    <span style={{fontWeight: 'bold', color:'white', marginLeft:'5px'}}>Dashboard</span>
                </Link>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider" />

            {/* Heading */}
            <div className="sidebar-heading">
                Manage
            </div>

            {/* Nav Item - Tables */}
            <li className="nav-item">
                <Link className="nav-link" to="/admin/listtopic">
                    <i className="fa fa-odnoklassniki" style={{fontSize:'20px', color:'white'}}/>
                    <span style={{fontWeight: 'bold', color:'white', marginLeft:'5px'}}>Chủ đề ({topiclength})</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/admin/listword">
                    <i className="fa fa-odnoklassniki" style={{fontSize:'20px', color:'white'}}/>
                    <span style={{fontWeight: 'bold', color:'white', marginLeft:'5px'}}>Từ vựng ({wordlength})</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/admin/listuser">
                    <i className="fa fa-user" style={{fontSize:'20px', color:'white'}}/>
                    <span style={{fontWeight: 'bold', color:'white', marginLeft:'5px'}}>Tài khoản ({userlength})</span>
                </Link>
            </li>

            {/* Nav Item - Tables */}
            {/* <li className="nav-item ">
                    <a className="nav-link" href="blog-browse">
                        <i className="fas fa-fw fa-table"/>
                        <span>Blog <span style="${numberBlogNotBrowse==0? '': 'color:red'}">(${numberBlogNotBrowse})</span></span></a>
                </li>

                <li className="nav-item ">
                    <a className="nav-link" href="question-browse">
                        <i className="fas fa-fw fa-table"/>
                        Question <span style="${numberQuestionNotBrowse==0? '': 'color:red'}">(${numberQuestionNotBrowse})</span>
                </li> */}

            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            {/* <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div> */}
        </ul>
    )
}

export default SideBar