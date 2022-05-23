import React, { useEffect, useState } from 'react'
import SideBar from '../UI/SideBar';
import TopBar from '../UI/TopBar';
import Footer from '../UI/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import MyToast from "../MyToast";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

const initialState = {
    name: ""
}

function AllTopic() {
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [show, setShow] = useState(false);
    const [method, setMethod] = useState('');
    const [addState, setAddState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [topicAdd, setTopicAdd] = useState(initialState);
    const [length, setLength] = useState(0);

    const findAllWords = () => {
        axios
            .get(
                "http://localhost:8081/rest/topics/list"
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                setWords(data);
                setLength(data.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteWord = (id) => {
        axios
            .delete("http://localhost:8081/rest/topics/" + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (words != null) {
                setShow(true);
                setTimeout(() => setShow(false), 3000);
                findAllWords();
            } else {
                setShow(false)
            }
        }, 1000);
    };

    const scrollToAdd = () => {
        setAddState(true);
        scroller.scrollTo("scrollToAdd", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    const scrollToEdit = (topic) => {
        setTopicAdd({
            ...topicAdd,
            ...topic,
        })
        setAddState(true);
        setEditState(true);
        scroller.scrollTo("scrollToAdd", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    const saveVocab = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8081/rest/topics", topicAdd)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (words != null) {
                setMethod('post')
                setShow(true);
                setTimeout(() => setShow(false), 3000);
                findAllWords();
            } else {
                setShow(false)
            }
        }, 1000);
        setTopicAdd(initialState)
        setAddState(false)
    }

    const updateVocab = (e) => {
        console.log(topicAdd);
        e.preventDefault();
        axios
            .put("http://localhost:8081/rest/topics", topicAdd)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (words != null) {
                setMethod('post')
                setShow(true);
                setTimeout(() => setShow(false), 3000);
                findAllWords();
            } else {
                setShow(false)
            }
        }, 1000);
        setTopicAdd(initialState)
        setEditState(false)
        setAddState(false)
    }

    const handleTopicAdd = (e) => {
        const { name, value } = e.currentTarget;
        setTopicAdd({ ...topicAdd, [name]: value })
    }

    const searchChange = (e) => {
        setSearchWord(e.currentTarget.value)
    };

    const searchData = () => {
        axios
            .get(
                "http://localhost:8081/rest/topics/search/" +
                searchWord
            )
            .then((response) => response.data)
            .then((data) => {
                setWords(data)
            });
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchData();
        }
    }

    useEffect(() => {
        if (searchWord === "") {
            findAllWords();
        }
    }, [searchWord])

    useEffect(() => {
        findAllWords();
    }, [])
    return (
        <>
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">
                        <TopBar />
                        <div style={{ display: show ? "block" : "none" }}>
                        <MyToast
                                show={show}
                                message={method === 'delete' ? "Topic Deleted Successfully." : method === 'post' ? "Topic Saved Successfully." : "Topic Updated Successfully."}
                                type={method === 'delete' ? "danger" : "success"}
                            />
                        </div>
                        {/* Begin Page Content */}
                        <div className="container-fluid">

                            {/* DataTales Example */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Quản lý danh tài khoản</h6>
                                </div>
                                <div
                                    className="title-search d-flex justify-content-between flex-wrap" style={{ padding: '20px 20px 0px' }}
                                >
                                    <div
                                        className="search-vocl d-flex justify-content-between align-items-center"
                                    >
                                        <input
                                            type="text"
                                            id="search-title-vocl"
                                            name="search-title-vocl"
                                            value={searchWord}
                                            placeholder="Tìm kiếm bộ từ..."
                                            className="input-search"
                                            onChange={searchChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <span className="icon-search" onClick={searchData}
                                        ><i aria-hidden="true" className="fa fa-search"></i
                                        ></span>
                                    </div>
                                    <button
                                        onClick={scrollToAdd}
                                        className="btn btn-primary"
                                        style={{ width: '180px' }}
                                    >Thêm từ vựng
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Tên chủ đề</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Tên chủ đề</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                    words.map((topic) => (<>
                                                        <tr>
                                                            <td>{topic.id}</td>
                                                            <td>{topic.name}</td>
                                                            <td width={'150px'}>
                                                                <span
                                                                    className="btn btn-success btn-circle btn-xs"
                                                                    onClick={() => scrollToEdit(topic)}
                                                                    style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                                    <i className="fa fa-edit" />
                                                                </span>
                                                                <span
                                                                    className="btn btn-danger btn-circle btn-xs"
                                                                    // onClick={() => deleteWord(word.id)}
                                                                    data-toggle="modal" data-target={`#deleteModal${topic.id}`}
                                                                    style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                                    <i className="fa fa-trash" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <div className="modal" id={`deleteModal${topic.id}`} role="dialog" style={{ zIndex: '5000' }}>
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalLongTitle">Danh sách từ vựng</h5>
                                                                        <button type="button" tabIndex="-1" className="close" data-dismiss="modal" >
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <p>Xác nhận xoá <b>{topic.name}</b>?</p>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-danger" onClick={() => deleteWord(topic.id)} data-dismiss="modal">Xoá</button>
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='scrollToAdd'>
                                        {
                                            addState ? (
                                                <>
                                                    <div className='container'>
                                                        <div className="text-center">
                                                            <h1 className="h4 text-gray-900 mb-4">{editState ? 'Sửa từ vựng' : 'Thêm từ vựng'}</h1>
                                                        </div>
                                                        <form className="user">
                                                            <div className="form-group row justify-content-center">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleTopicAdd(e)} value={topicAdd.name} name="name" id="exampleFirstName"
                                                                        placeholder="Topic Name" required />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="d-flex justify-content-center">
                                                                {editState ? (
                                                                    <button
                                                                        type='submit'
                                                                        onClick={updateVocab}
                                                                        className="btn btn-success btn-user m-2" style={{ width: '100px' }}
                                                                    >
                                                                        Sửa
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type='submit'
                                                                        onClick={saveVocab}
                                                                        className="btn btn-success btn-user m-2" style={{ width: '100px' }}
                                                                    >
                                                                        Thêm
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => setAddState(false)}
                                                                    className="btn btn-danger btn-user m-2" style={{ width: '100px' }}
                                                                >
                                                                    Huỷ
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='d-flex justify-content-end'>
                                                    <button
                                                        className="btn btn-primary btn-circle btn-xs"
                                                        onClick={scrollToAdd}
                                                        style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* End Container Fluid */}
                    </div>
                    {/* End of Main Content */}

                    <Footer />
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}

            {/* Scroll to Top Button */}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

        </>
    )
}

export default AllTopic