import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import "font-awesome/css/font-awesome.min.css";
import TopBar from './UI/TopBar'
import SideBar from './UI/SideBar';
import Footer from './UI/Footer';
import axios from 'axios';
import lengthSlice from '../../redux/lengthSlice';
import {wordLengthSelector} from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard() {
    const dispatch = useDispatch();
    const length = useSelector(wordLengthSelector);
    const findAllWords = () => {
        axios
            .get(
                "http://localhost:8081/rest/words/list"
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                dispatch(lengthSlice.actions.wordLength(data.length))
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        findAllWords();
    }, [])
    return (
        <>
            <div id="wrapper">
                <SideBar length={length} />
                <div id="content-wrapper" class="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">
                        <TopBar />
                        {/* Begin Page Content */}
                        <div class="container-fluid">

                            {/* Page Heading */}
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                            </div>

                            {/* Content Row */}
                            <div class="row">

                                {/* Earnings (Monthly) Card Example */}
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-primary shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Số lượng bài học</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{length}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-user fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Earnings (Monthly) Card Example */}
                                {/* <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-success shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Earnings (Annual)</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-dollar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Earnings (Monthly) Card Example */}
                                {/* <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-info shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Number of Questions
                                                    </div>
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col-auto">
                                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">10</div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-question fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Pending Requests Card Example */}
                                {/* <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-warning shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Number of Blogs</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">15</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-odnoklassniki fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            {/* Content Row */}

                            <div class="row">

                                <div class="col-lg-6 mb-4">
                                    {/* Approach */}
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
                                        </div>
                                        <div class="card-body">
                                            <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                                CSS bloat and poor page performance. Custom CSS classes are used to create
                                                custom components and custom utility classes.</p>
                                            <p class="mb-0">Before working with this theme, you should become familiar with the
                                                Bootstrap framework, especially the utility classes.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* End Page Content */}
                    </div>
                    {/* End of Main Content */}

                    <Footer />
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}

            {/* Scroll to Top Button */}
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fa fa-angle-up"></i>
            </a>

        </>
    )
}

export default Dashboard