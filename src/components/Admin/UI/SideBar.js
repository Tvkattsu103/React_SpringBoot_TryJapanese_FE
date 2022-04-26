import React from 'react'

function SideBar() {
    return (
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* Sidebar - Brand */}
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="dashboard">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">THTiengNhat</div>
            </a>

            {/* Divider */}
            <hr class="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <li class="nav-item ">
                <a class="nav-link" href="dashboard">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            {/* Divider */}
            <hr class="sidebar-divider" />

            {/* Heading */}
            <div class="sidebar-heading">
                Manage
            </div>

            {/* Nav Item - Tables */}
            <li class="nav-item">
                <a class="nav-link" href="blog">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Từ vựng (10)</span>
                </a>
            </li>

            {/* Nav Item - Tables */}
            {/* <li class="nav-item ">
                    <a class="nav-link" href="blog-browse">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Blog <span style="${numberBlogNotBrowse==0? '': 'color:red'}">(${numberBlogNotBrowse})</span></span></a>
                </li>

                <li class="nav-item ">
                    <a class="nav-link" href="question-browse">
                        <i class="fas fa-fw fa-table"></i>
                        Question <span style="${numberQuestionNotBrowse==0? '': 'color:red'}">(${numberQuestionNotBrowse})</span>
                </li> */}

            {/* Divider */}
            <hr class="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    )
}

export default SideBar