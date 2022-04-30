import React from 'react'
import { Link } from 'react-router-dom'

function WordsCard({href, src, title, wordsnumber}) {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4">
            <div className="item-list">
                <div className="img-thumbnail-words">
                    <Link to={href}
                    ><img
                            src={src}
                            alt={title}
                            className="w-100"
                        /></Link>
                </div>
                <div className="wp-ct-item bg-white">
                    <h3>
                        <a
                            href={href}
                            className="name-words"
                        >{title}</a>
                    </h3>
                    <div
                        className="sub-info d-flex justify-content-between"
                    >
                        {/* <span className="free">Miễn phí</span> */}
                        <span className="nb-word">{wordsnumber} từ vựng</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WordsCard