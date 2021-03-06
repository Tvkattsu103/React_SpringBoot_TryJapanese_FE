import React, { useCallback, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactAudioPlayer from 'react-audio-player';

function Vocab() {
    const params = useParams();
    const navigate = useNavigate();
    const [vocabs, setVocabs] = useState([]);
    const [length, setLength] = useState(0);
    const [current, setCurrent] = useState(0);
    const [exampleStatus, setExampleStatus] = useState(false);

    useEffect(() => {
        findVocabByID();
    }, []);

    const findVocabByID = useCallback(() => {
        axios
            .get(
                "http://localhost:8081/rest/vocab/"
                + params.id
            )
            .then((response) =>
                response.data
            )
            .then((data) => {
                setVocabs(data);
                setLength(data.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const changeExampleStatus = (status) => {
        setExampleStatus(status)
    }

    useEffect(() => {
        changeExampleStatus(false);
    }, [current])

    console.log(vocabs)
    return (
        <>
            {/* <NavbarComp /> */}
            {/* <div id="main-ct" className="p-child-dkr"> */}
            <div className="jp-kana show-word show-meaning show-soundicon">
                {exampleStatus ? (<ReactAudioPlayer
                    src={vocabs[current]?.exampleAudio}
                    autoPlay
                />) : (<ReactAudioPlayer
                    src={vocabs[current]?.audio}
                    autoPlay
                />)}
                <div className="header-les d-flex justify-content-between">
                    <div className="name-les-back">
                        <Link to="/" className="back-icon">
                            <i aria-hidden="true"
                                className="fa fa-angle-left" />
                        </Link>
                        <span className="name-les">{vocabs[0]?.word.title}</span>
                    </div>
                    {/* --- */}
                    <h3 className="nb-les">
                        <span className="nb-cpl">0</span>/<span
                            className="nb-total"
                        >4</span>
                    </h3>
                </div>
                <div className="utl-volc">
                    <div className="list-vocl item-utl">
                        <div className="el-appear d-flex align-items-center justify-content-end" data-toggle="modal" data-target="#modalVocab">
                            <Tooltip title="Danh s??ch t??? v???ng" placement="left">
                                <span className="open-utl open-list">
                                    <span>
                                        <img src="https://dekiru.vn/img-fix/utl-icon-1.png" alt="" />
                                    </span>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="wp-content-les study-volc" style={{ marginBottom: '50px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="kg-study">
                                <div data-v-e60b73b0="" data-v-348e8e0c="" className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <h3 className="guide-user-les">
                                    </h3> <div className="text-question-les">
                                    </div> <div className="slider-ct-lesson">
                                        <div data-v-348e8e0c="" className="kg-study">
                                            <div data-v-348e8e0c="" className="item-volc">
                                                <div className="vl-study vl-part-child">
                                                    <div className="ct-item">
                                                        <div className="img-volc">
                                                            <img src={exampleStatus ? vocabs[current]?.exampleImg : vocabs[current]?.img} alt="" />
                                                        </div> <div className="info-volc">
                                                            <h3 className="text-japanese">
                                                                {/* <span className="ob-kanji jp-font"></span>  */}
                                                                <span className="ob-kana jp-font">{exampleStatus ? vocabs[current]?.example : vocabs[current]?.kana}</span>
                                                                {/*<span className="ob-romaji">morutaru</span> */}
                                                            </h3> <h3 className="text-vietnamese">{exampleStatus ? vocabs[current]?.exampleMeaning : vocabs[current]?.meaning}</h3>
                                                        </div> <div className="volume-icon" onClick={() => new Audio(exampleStatus ? vocabs[current]?.exampleAudio : vocabs[current]?.audio).play()}>
                                                            <div className="img-icon">
                                                                <img src="https://dekiru.vn/img-fix/icon-volume.png" alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4 className="view-exl-study" onClick={() => changeExampleStatus(!exampleStatus)}>
                                                    <span className="view-exl view-change">{exampleStatus ? "Xem t??? v???ng" :"Xem v?? d???"}</span>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wp-btn-progress-les">
                    <div className="progress-les">
                        <div className="main-bar" style={{ width: `${current / length * 100}%` }}>

                        </div>
                    </div>
                    <div className="btn-result">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <div className="ct-btn-result d-flex justify-content-between">
                                        <div className="left-ct">
                                            <div className="btn-group-les">
                                                <Link to="quiz">
                                                    <span
                                                        className="btn-nav-les btn-practice-les"
                                                    >Luy???n t???p
                                                    </span>
                                                </Link>
                                                {/* --- */}
                                            </div>
                                            <div className="result-ntf">
                                                {/* --- */}
                                                {/* --- */}
                                            </div>
                                        </div>
                                        <div className="right-ct">
                                            <div className="btn-group-les" >
                                                {current !== 0 ? (
                                                    <span className=" btn-back-les btn-nav-les" onClick={() => setCurrent(current - 1)}>
                                                        <i aria-hidden="true" className="fa fa-angle-left" />
                                                        <span>Quay l???i</span>
                                                    </span>
                                                ) : null
                                                }
                                                {current !== length ? (
                                                    <span
                                                        className="btn-nav-les btn-next-les" onClick={() => setCurrent(current + 1)}
                                                    >Ti???p theo
                                                        <i aria-hidden="true"
                                                            className="fa fa-angle-right" />
                                                    </span>
                                                ) : (
                                                    <Link to="quiz">
                                                        <span className="btn-nav-les finish-les">Ho??n th??nh &nbsp;
                                                            <i aria-hidden="true" className="fa fa-angle-double-right" />
                                                        </span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal" id="modalVocab" role="dialog" style={{ zIndex: '5000' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Danh s??ch t??? v???ng</h5>
                            <button type="button" tabIndex="-1" className="close" data-dismiss="modal" >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Kanji</th>
                                        <th scope="col">Kana</th>
                                        <th scope="col">Romaji</th>
                                        <th scope="col">?? ngh??a</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vocabs.length > 0 ? (
                                        vocabs.map((vocab) => (
                                            <tr>
                                                <td>{vocab.kanji}</td>
                                                <td>{vocab.kana}</td>
                                                <td>{vocab.romaji}</td>
                                                <td>{vocab.meaning}</td>
                                            </tr>
                                        ))
                                    ) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default Vocab