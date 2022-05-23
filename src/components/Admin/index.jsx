import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import "font-awesome/css/font-awesome.min.css";
import TopBar from './UI/TopBar'
import SideBar from './UI/SideBar';
import Footer from './UI/Footer';
import axios from 'axios';
import lengthSlice from '../../redux/lengthSlice';
import { wordLengthSelector, topicLengthSelector, userLengthSelector } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import authToken from '../../utils/authToken';

function Dashboard() {
    if (localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }

    const dispatch = useDispatch();
    
    const wordlength = useSelector(wordLengthSelector);
    const topiclength = useSelector(topicLengthSelector);
    const userlength = useSelector(userLengthSelector);

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
    const findAllTopic = () => {
        axios
            .get(
                "http://localhost:8081/rest/topics/list"
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                dispatch(lengthSlice.actions.topicLength(data.length))
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const findAllUser = () => {
        axios
            .get(
                "http://localhost:8081/rest/user/list"
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                dispatch(lengthSlice.actions.userLength(data.length))
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        findAllWords();
        findAllTopic();
        findAllUser();
    }, [])
    return (
        <>
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">
                        <TopBar />
                        {/* Begin Page Content */}
                        <div className="container-fluid">

                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            </div>

                            {/* Content Row */}
                            <div className="row">

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Số lượng bài học</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{wordlength}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fa fa-odnoklassniki fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-success shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Số lượng chủ đề</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{topiclength}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-odnoklassniki fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-info shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Số lượng tài khoản
                                                    </div>
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col-auto">
                                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{userlength}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa fa-user fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="row">

                                <div className="col-lg-6 mb-4">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                                        </div>
                                        <div className="card-body">
                                            <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                                CSS bloat and poor page performance. Custom CSS classes are used to create
                                                custom components and custom utility classes.</p>
                                            <p className="mb-0">Before working with this theme, you should become familiar with the
                                                Bootstrap framework, especially the utility classes.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fa fa-angle-up"></i>
            </a>

        </>
    )
}

export default Dashboard