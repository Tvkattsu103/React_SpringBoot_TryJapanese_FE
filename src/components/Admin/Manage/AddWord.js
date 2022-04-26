import React from 'react'
import SideBar from './../UI/SideBar';
import TopBar from './../UI/TopBar';
import Footer from './../UI/Footer';

function AddWord() {
  return (
    <>
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" class="d-flex flex-column">

          {/* Main Content */}
          <div id="content">
            <TopBar />
            {/* Begin Page Content */}
            <div class="container-fluid">

              {/* DataTales Example */}
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Tên bài từ vựng - Thể loại</h6>
                </div>
                <div class="card-body container">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Thêm từ vựng!</h1>
                  </div>
                  <form class="user">
                    {/* <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <select name="cars" id="cars" class="form-control form-control-user">
                          <option value="null" disabled selected>--Chọn thể loại--</option>
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div class="col-sm-6">
                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                          placeholder="Last Name" />
                      </div>
                    </div> */}
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                          placeholder="Kanji" />
                      </div>
                      <div class="col-sm-6">
                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                          placeholder="Kana" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                          placeholder="Romaji" />
                      </div>
                      <div class="col-sm-6">
                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                          placeholder="Dịch nghĩa" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                          placeholder="Câu ví dụ" />
                      </div>
                      <div class="col-sm-6">
                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                          placeholder="Dịch nghĩa ví dụ" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                          placeholder="Ảnh từ vựng" />
                      </div>
                      <div class="col-sm-6">
                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                          placeholder="Ảnh ví dụ" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">

                      <a href="login.html" class="btn btn-success btn-user w-25 m-2">
                        Thêm
                      </a>
                      <a href="login.html" class="btn btn-danger btn-user w-25 m-2">
                        Huỷ
                      </a>
                    </div>
                  </form>
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
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </>
  )
}

export default AddWord