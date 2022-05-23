import React, { useEffect, useState } from 'react'
import SideBar from '../UI/SideBar';
import TopBar from '../UI/TopBar';
import Footer from '../UI/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import MyToast from "../MyToast";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage, setWordsPerPage] = useState(10);
  const [sortDir, setSortDir] = useState("asc");
  const [show, setShow] = useState(false);

  //paging
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const findAllWords = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/user?pageNumber=" +
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
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setCurrentPage(data.number + 1);
        console.log("ha")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteWord = (id) => {
    axios
      .delete("http://localhost:8081/rest/user/" + id)
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
        findAllWords(currentPage);
      } else {
        setShow(false)
      }
    }, 1000);
  };

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
        "http://localhost:8081/rest/user/search/" +
        searchWord +
        "?page=" +
        currentPage +
        "&size=" +
        wordsPerPage
      )
      .then((response) => response.data)
      .then((data) => {
        setWords(data.content)
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setCurrentPage(data.number + 1);
      });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchData();
    }
  }

  useEffect(() => {
    if (searchWord === "") {
      findAllWords(currentPage);
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
                message={"Word Deleted Successfully."}
                type={"danger"}
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
                  className="title-search" style={{ width: '300px', paddingTop: '20px', paddingLeft: '20px' }}
                >
                  <div
                    className="search-vocl d-flex justify-content-between align-items-center"
                  >
                    <input
                      type="text"
                      id="search-title-vocl"
                      name="search-title-vocl"
                      value={searchWord}
                      placeholder="Tìm kiếm..."
                      className="input-search"
                      onChange={searchChange}
                      onKeyDown={handleKeyDown}
                    />
                    <span className="icon-search" onClick={searchData}
                    ><i aria-hidden="true" className="fa fa-search"></i
                    ></span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Họ Tên</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Quyền</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Họ Tên</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Quyền</th>
                          <th>Thao tác</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {
                          words.map((user) => (<>
                            <tr>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.mobile}</td>
                              <td>{user.role.name}</td>
                              <td width={'100px'}>
                                <span
                                  className="btn btn-danger btn-circle btn-xs"
                                  // onClick={() => deleteWord(word.id)}
                                  data-toggle="modal" data-target={`#deleteModal${user.id}`}
                                  style={{ borderRadius: '50%', margin: '0 5px' }}>
                                  <i className="fa fa-trash" />
                                </span>
                              </td>
                            </tr>
                            <div className="modal" id={`deleteModal${user.id}`} role="dialog" style={{ zIndex: '5000' }}>
                              <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Danh sách từ vựng</h5>
                                    <button type="button" tabIndex="-1" className="close" data-dismiss="modal" >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <p>Xác nhận xoá <b>{user.name}</b>?</p>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" onClick={() => deleteWord(user.id)} data-dismiss="modal">Xoá</button>
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
                    {words.length > 0 ? (
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

export default AllUser