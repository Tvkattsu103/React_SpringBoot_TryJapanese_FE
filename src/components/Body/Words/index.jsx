import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars'
import ListItemTopicTab from './ListItemTopicTab'
import ListWordsCard from './ListWordsCard'
import NavbarComp from '../../NavBarComp';
import { useNavigate } from 'react-router-dom';
import authToken from "../../../utils/authToken";
import FooterComp from '../../FooterComp';

function Tuvung() {
    const [words, setWords] = useState([]);
    const [wordsShow, setWordsShow] = useState([]);
    const [topics, setTopics] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [searchTopic, setSearchTopic] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [wordsPerPage, setWordsPerPage] = useState(9);
    const [sortDir, setSortDir] = useState("asc");

    //paging
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    //topic id
    const [currentTopicID, setCurrentTopicID] = useState(0);
    const [currentTopicName, setCurrentTopicName] = useState("all");


    const navigate = useNavigate();
    // if (localStorage.jwtToken) {
    //     authToken(localStorage.jwtToken);
    // } else {
    //     navigate("login")
    // }

    useEffect(() => {
        findAllWords(currentPage);
        findAllTopics();
    }, []);

    const findAllWordsByTopic = (topicID, currentPage) => {
        currentPage -= 1;
        axios
            .get(
                "http://localhost:8081/rest/words/topic/" +
                topicID +
                "?page=" +
                currentPage +
                "&size=" +
                wordsPerPage
            )
            .then((response) =>
                console.log("abv",response)
            )
            // .then((data) => {
            //     // setWords(data.content);
            //     setWordsShow(data.content);
            //     setTotalPages(data.totalPages);
            //     setTotalElements(data.totalElements);
            //     setCurrentPage(data.number + 1);
            // })
            // .catch((error) => {
            //     console.log(error);
            //     localStorage.removeItem("jwtToken");
            //     navigate("/login");
            // });
    }
    const findAllWords = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                "http://localhost:8081/rest/words?pageNumber=" +
                currentPage +
                "&pageSize=" +
                wordsPerPage +
                "&sortBy=id&sortDir=" +
                sortDir
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                setWords(data.content);
                setWordsShow(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setCurrentPage(data.number + 1);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("jwtToken");
                navigate("/login");
            });
    }
    const findAllTopics = useCallback(() => {
        axios
            .get(
                "http://localhost:8081/rest/topics/list"
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                setTopics(data);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("jwtToken");
                navigate("/login");
            });
    }, [])

    const changePage = (e) => {
        let targetPage = parseInt(e.currentTarget.value);
        if (searchWord) {
            searchData(targetPage);
        } else {
            findAllWords(targetPage);
        }
        setCurrentPage(targetPage);
    };

    const firstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            if (searchWord) {
                searchData(firstPage);
            } else {
                findAllWords(firstPage);
            }
        }
    };

    const prevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            if (searchWord) {
                searchData(currentPage - prevPage);
            } else {
                findAllWords(currentPage - prevPage);
            }
        }
    };

    const lastPage = () => {
        let condition = Math.ceil(
            totalElements / wordsPerPage
        );
        if (currentPage < condition) {
            if (searchWord) {
                searchData(condition);
            } else {
                findAllWords(condition);
            }
        }
    };

    const nextPage = () => {
        if (
            currentPage <
            Math.ceil(totalElements / wordsPerPage)
        ) {
            if (searchWord) {
                searchData(currentPage + 1);
            } else {
                findAllWords(currentPage + 1);
            }
        }
    };

    const searchChange = (e) => {
        setSearchWord(e.currentTarget.value)
    };

    const searchData = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                "http://localhost:8081/rest/words/search/" +
                searchWord +
                "?page=" +
                currentPage +
                "&size=" +
                wordsPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                setWordsShow(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setCurrentPage(data.number + 1);
            });
    };

    const searchTopicData = () => {
        axios
            .get(
                "http://localhost:8081/rest/topics/search/" +
                searchTopic
            )
            .then((response) => response.data)
            .then((data) => {
                setTopics(data);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchData();
        }
    }

    const searchTopicChange = (e) => {
        setSearchTopic(e.currentTarget.value)
    };

    const changeTopic = (e, name, id) => {
        e.preventDefault();
        setCurrentTopicName(name);
        setCurrentTopicID(id);
        if (id !== 0) {
            findAllWordsByTopic(id, currentPage);
        }
    }

    useEffect(() => {
        if (searchWord === "") {
            findAllWords(currentPage);
        }
    }, [searchWord])

    useEffect(() => {
        searchTopicData();
    }, [searchTopic])

    useEffect(() => {
        // if (currentTopicID === 0) {
        //     setWordsShow(words.filter(word => word.topic.id === currentTopicID))
        // } else {
        //     setWordsShow(wordsTopic)
        // }
        // setWordsShow(words.filter(word => word.topic.id === currentTopicID));
        if (currentTopicID === 0) {
            console.log("hi", words)
            setWordsShow(words)
        } else {

        }
        setSearchWord("");
        firstPage();
    }, [currentTopicID])
    return (
        <>
            <NavbarComp />
            <div id="main-ct" className="p-child-dkr" >
                <div className="container">
                    <div className="row">
                        {/* div left */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
                            <div className="bg-dark-mb"></div>
                            <div
                                className="open-tab-mb justify-content-between align-items-center"
                            >
                                <i aria-hidden="true" className="fa fa-pencil-square-o"></i>
                                <span>Xem chủ đề khác</span>
                                <i
                                    aria-hidden="true"
                                    className="fa fa-angle-right icon-angle"
                                ></i>
                            </div>
                            <div className="tab-vocl-sl">
                                <div
                                    className="title-tab-mb text-right justify-content-between align-items-center"
                                >
                                    <h3 className="name-tt">Danh sách chủ đề</h3>
                                    <span id="close-vocl-tab"
                                    ><i aria-hidden="true" className="fa fa-times"></i
                                    ></span>
                                </div>
                                <div
                                    className="search-vocl d-flex justify-content-between align-items-center"
                                >
                                    <input
                                        type="text"
                                        id="search-topic-vocl"
                                        placeholder="Tìm kiếm chủ đề..."
                                        className="input-search"
                                        name="search-title-vocl"
                                        value={searchTopic}
                                        onChange={searchTopicChange}
                                    />
                                    <span className="icon-search"
                                    ><i aria-hidden="true" className="fa fa-search"></i
                                    ></span>
                                </div>
                                <div
                                    className="wp-tab mCustomS vb vb-visible"
                                    style={{ position: "relative", overflow: "hidden" }}
                                >
                                    <div
                                        className="vb-content"
                                        style={{
                                            display: "block",
                                            overflow: "hidden scroll",
                                            height: "100%",
                                            width: "calc(100% + 17px)",
                                        }}
                                    >
                                        <Scrollbars>
                                            <ListItemTopicTab topics={topics} currentTopicName={currentTopicName} changeTopic={changeTopic} />
                                        </Scrollbars>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* div right */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
                            <div className="wp-ct-vocl" >
                                <div
                                    className="title-search d-flex justify-content-between flex-wrap"
                                >
                                    <h1 className="name-title">
                                        {currentTopicName === "all" ?
                                            "Từ vựng tiếng Nhật"
                                            : (
                                                currentTopicName
                                            )}
                                    </h1>


                                    <div
                                        className="search-vocl d-flex justify-content-between align-items-center bg-white"
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
                                </div>
                                <div>
                                    <ListWordsCard wordsShow={wordsShow} />
                                </div>
                                {wordsShow.length > 0 ? (
                                    <div>
                                        <div style={{ float: "left" }}>
                                            Showing Page {currentPage} of {totalPages}
                                        </div>
                                        <div style={{ float: "right" }}>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        disabled={currentPage === 1 ? true : false}
                                                        onClick={firstPage}
                                                    >
                                                        <i className="fa fa-fast-backward"> First</i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        disabled={currentPage === 1 ? true : false}
                                                        onClick={prevPage}
                                                    >
                                                        <i className="fa fa-step-backward"> Prev</i>
                                                    </button>
                                                </div>
                                                <input name="currentPage"
                                                    className="page-num form-control"
                                                    value={currentPage}
                                                    onChange={changePage}
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        disabled={currentPage === totalPages ? true : false}
                                                        onClick={nextPage}
                                                    >
                                                        <i className="fa fa-step-forward"> Next</i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        disabled={currentPage === totalPages ? true : false}
                                                        onClick={lastPage}
                                                    >
                                                        <i className="fa fa-step-forward"> Last</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComp/>
        </>
    )
}

export default Tuvung