import React, { useCallback, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { scoreSelector } from '../../redux/selectors';
import scoreSlice from '../../redux/scoreSlice';

function Complete() {
    const params = useParams();
    const score = useSelector(scoreSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [vocabs, setVocabs] = useState([]);
    const [length, setLength] = useState(0);

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

    const handleRestudy = () => {
        dispatch(scoreSlice.actions.resetScore());
        navigate(`/vocab/${params.id}`)
    }

    const handleHomePage = () => {
        dispatch(scoreSlice.actions.resetScore());
        navigate('/')
    }
    let remark;
    const userScore = score / length * 100;
    if (userScore <= 30) {
        remark = 'Cố gắng luyện tập nhiều hơn nhé!';
    } else if (userScore > 30 && userScore <= 50) {
        remark = 'Lần sau may mắn hơn nhé!';
    } else if (userScore <= 70 && userScore > 50) {
        remark = 'Bạn có thể làm tốt hơn nữa!';
    } else if (userScore >= 71 && userScore <= 84) {
        remark = 'Bạn làm rất tốt!';
    } else {
        remark = 'Bạn là một thiên tài!';
    }

    return (
        <>
            <div className="jp-kana show-word show-meaning show-soundicon pyro">
                <div className="before"></div>
                <div className="after"></div>
                <div className="header-les d-flex justify-content-between">
                    <div className="name-les-back">
                        <a href="/" className="back-icon">
                            <i aria-hidden="true"
                                className="fa fa-angle-left" />
                        </a>
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
                        <div className="el-appear d-flex align-items-center justify-content-end" data-toggle="modal" data-target="#exampleModalCenter">
                            <Tooltip title="Danh sách từ vựng" placement="left">
                                <span className="open-utl open-list">
                                    <span>
                                        <img src="https://dekiru.vn/img-fix/utl-icon-1.png" alt="" />
                                    </span>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="wp-content-les study-volc">
                    <div className="container">
                        <div className="row">
                            <div className="kg-study">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <div className="ct-cpl-screen">
                                        <div className="info-cpl text-center">
                                            <h2 className="above-text">Hoàn thành!</h2>
                                            <h4 className="below-text">Chúc mừng bạn đã hoàn thành xong bài học</h4>
                                            <div className="score-bg-title">
                                                <img src="https://dekiru.vn/img-fix/score-bg.png" alt="" />
                                            </div>
                                            <div style={{ marginTop: '50px' }}>
                                                <h2 style={{ marginBottom: '80px' }}>Điểm đạt được</h2>
                                                <h1 style={{ color: 'red' }}>{userScore}%</h1>
                                                <h3>{remark}</h3>
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
                        <div className="main-bar" style={{ width: '0px' }}></div>
                    </div>
                    <div className="btn-result">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <div className="ct-btn-result d-flex justify-content-between">
                                        <div className="left-ct">
                                            <div className="btn-group-les">
                                                <span onClick={handleRestudy}
                                                    className="btn-nav-les btn-restudy-les"
                                                ><i data-v-e60b73b0="" aria-hidden="true" className="fa fa-angle-left" />Học lại
                                                </span>
                                                {/* --- */}
                                            </div>
                                        </div>
                                        <div className="right-ct">
                                                <div className="btn-group-les">
                                                    <span onClick={handleHomePage}
                                                    className="btn-nav-les btn-result-corect-les">Hoàn thành
                                                    </span>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal" id="exampleModalCenter" role="dialog" style={{ zIndex: '5000' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
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
                                        <th scope="col">Ý nghĩa</th>
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
        </>
    )
}

export default Complete