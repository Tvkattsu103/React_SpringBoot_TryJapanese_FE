import React from 'react'
import { Link } from 'react-router-dom';
import {wordLengthSelector} from '../../../redux/selectors';
import { useSelector } from 'react-redux';

function SideBar() {
    const length = useSelector(wordLengthSelector);
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* Sidebar - Brand */}
            <Link to="/admin/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">THTiengNhat</div>
            </Link>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <li className="nav-item ">
                <Link className="nav-link" to="/admin/dashboard">
                    <i className="fa fa-home fa-tachometer-alt"></i>
                    <span>Dashboard</span>
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
                <Link className="nav-link" to="/admin/listword">
                    <i className="fa fa-odnoklassniki fa-table"></i>
                    <span>Từ vựng ({length})</span>
                </Link>
            </li>

            {/* Nav Item - Tables */}
            {/* <li className="nav-item ">
                    <a className="nav-link" href="blog-browse">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Blog <span style="${numberBlogNotBrowse==0? '': 'color:red'}">(${numberBlogNotBrowse})</span></span></a>
                </li>

                <li className="nav-item ">
                    <a className="nav-link" href="question-browse">
                        <i className="fas fa-fw fa-table"></i>
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