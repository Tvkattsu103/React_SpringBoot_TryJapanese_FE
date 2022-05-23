import React from 'react'

function ItemTopicTab({href, title, active, onClick}) {
    return (
        <a onClick={onClick}
            href={href}
            className={`d-flex justify-content-between align-items-center item-topic-tab ${active}`}
        ><h2 style={{ fontSize: "16px" }}>
                <span>{title}</span>
            </h2>
            <i aria-hidden="true" className="fa fa-angle-right"></i
            ></a>
    )
}

export default ItemTopicTab