import React from 'react'

function SearchInput({placeholder}) {
    return (
        <div
            className="search-vocl d-flex justify-content-between align-items-center"
        >
            <input
                type="text"
                id="search-topic-vocl"
                placeholder={placeholder}
                className="input-search"
            />
            <span className="icon-search"
            ><i aria-hidden="true" className="fa fa-search"></i
            ></span>
        </div>
    )
}

export default SearchInput