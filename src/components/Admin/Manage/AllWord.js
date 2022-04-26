import React from 'react'
import SideBar from './../UI/SideBar';
import TopBar from './../UI/TopBar';
import Footer from './../UI/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.js';

function AllWord() {
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
                  <h6 class="m-0 font-weight-bold text-primary">Blog Manage</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Content</th>
                          <th>userID</th>
                          <th>Button</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Content</th>
                          <th>userID</th>
                          <th>Button</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        <tr>
                          <th>i.bi</th>
                          <th>i.titl</th>
                          <th>i.conten</th>
                          <th>i.ui</th>
                          <th>
                            {/* <a href="deleteBlog2/i.bid" class="btn btn-danger btn-circle btn-lg"
                              onclick="return confirm('Are You Sure To Delete ?')" style="border-radius:50%; width:20px; height:20px; padding:15px!important">
                              <i class="fas fa-trash" style="font-size:80%;"></i>
                            </a> */}
                          </th>
                        </tr>
                        {/* <c:forEach items="${listblog}" var="i">
                          <tr>
                            <th>${i.bid}</th>
                            <th>${i.title}</th>
                            <th>${i.content}</th>
                            <th>${i.uid}</th>
                            <th>
                              <a href="deleteBlog2/${i.bid }" class="btn btn-danger btn-circle btn-lg"
                                onclick="return confirm('Are You Sure To Delete ?')" style="border-radius:50%; width:20px; height:20px; padding:15px!important">
                                <i class="fas fa-trash" style="font-size:80%;"></i>
                              </a>
                            </th>
                          </tr>
                        </c:forEach> */}
                      </tbody>
                    </table>
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
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>

    </>
  )
}

export default AllWord