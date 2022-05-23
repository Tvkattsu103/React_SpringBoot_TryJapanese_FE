import React from 'react'

function PostUseful() {
    return (
        <div className="posts-useful d-none d-lg-block">
            <div className="title-main-block d-flex align-items-end">
                <h5 className="name">Bài viết hữu ích</h5>
                <span className="bar bg-yellow"></span>
            </div>
            <div className="wp-ct-post-useful">
                <div className="row">
                    <div
                        className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    >
                        <div className="item-post-uf bg-white">
                            <h3>
                                <a
                                    href="/blog/detail-20210222153022601.htm"
                                    className="title-uf"
                                >Dự án bảo vệ Thực Tập Sinh/Người lao động nước
                                    ngoài</a
                                >
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostUseful