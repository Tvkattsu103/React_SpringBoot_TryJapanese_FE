import React, { useCallback, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import {scoreSelector} from '../../redux/selectors';
import scoreSlice from '../../redux/scoreSlice';

function Quiz() {
    const params = useParams();
    const dispatch = useDispatch();
    const score = useSelector(scoreSelector);

    const [vocabs, setVocabs] = useState([]);
    const [length, setLength] = useState(0);
    const [current, setCurrent] = useState(0);
    const [quizRemain, setQuizRemain] = useState([])
    const [quiz3, setQuiz3] = useState({})
    const [quiz, setQuiz] = useState({})
    const [quizRandom1, setQuizRandom1] = useState({})
    const [quizRandom2, setQuizRandom2] = useState({})
    const [showHint, setShowHint] = useState(false);
    const [selectState, setSelectState] = useState('');
    const [correctState, setCorrectState] = useState('');
    const [incorrectState, setIncorrectState] = useState('');
    // const [score, setScore] = useState(0);
    const [correctSound, setCorrectSound] = useState(false);
    const [incorrectSound, setIncorrectSound] = useState(false);
    const [check, setCheck] = useState(false);

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
                setLength(data.length - 1);
                const first = data[Math.floor(Math.random() * (data.length))];
                setQuiz(first);

                setQuizRemain(data.filter((vocab) => vocab.id !== first.id));
                const quizRandomA = data.filter((vocab) => vocab.id !== first.id);
                const first1 = quizRandomA[Math.floor(Math.random() * (quizRandomA.length))];
                setQuizRandom1(first1);
                const quizRandomB = quizRandomA.filter((vocab) => vocab.id !== first1.id);
                const first2 = quizRandomB[Math.floor(Math.random() * (quizRandomB.length))];
                setQuizRandom2(first2);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    const handleQuizRandom = () => {
        const first = quizRemain[Math.floor(Math.random() * (quizRemain.length))];
        setQuiz(first);
        setQuizRemain(quizRemain.filter((vocab) => vocab.id !== first.id));
        const quizRandomA = vocabs.filter((vocab) => vocab.id !== first.id);
        const first1 = quizRandomA[Math.floor(Math.random() * (quizRandomA.length))];
        setQuizRandom1(first1);
        const quizRandomB = quizRandomA.filter((vocab) => vocab.id !== first1.id);
        const first2 = quizRandomB[Math.floor(Math.random() * (quizRandomB.length))];
        setQuizRandom2(first2);
        const random = Math.floor((Math.random() * 100) + 1);
        if (random % 5 === 0) {
            setQuiz3({ quiz, quizRandom1, quizRandom2 })
        } else if (random % 3 === 0) {
            setQuiz3({ quizRandom1, quiz, quizRandom2 })
        } else {
            setQuiz3({ quizRandom2, quizRandom1, quiz })
        }
    }

    const handleShowHint = () => {
        if (showHint === false) {
            setShowHint(!showHint)
        }
    }

    const handleSelectState = (id) => {
        setSelectState(id);
    }

    const handleCheck = () => {
        if (selectState === '') {
            return;
        }
        if (selectState === quiz.id) {
            setCorrectState(selectState);
            setCorrectSound(true);
            dispatch(scoreSlice.actions.correctAnswer(1));
        } else {
            setIncorrectState(selectState);
            setCorrectState(quiz.id);
            setIncorrectSound(true);
        }
        setSelectState('')
        setCheck(true);
    }
    const handleNext = () => {
        setCurrent(current + 1);
        setCorrectState('');
        setIncorrectState('');
        setCorrectSound(false);
        setIncorrectSound(false);
        setCheck(false);

        handleQuizRandom();
    }
    useEffect(() => {
        const random = Math.floor((Math.random() * 100) + 1);
        if (random % 5 === 0) {
            setQuiz3({ quiz, quizRandom1, quizRandom2 })
        } else if (random % 3 === 0) {
            setQuiz3({ quizRandom1, quiz, quizRandom2 })
        } else {
            setQuiz3({ quizRandom2, quizRandom1, quiz })
        }
    }, [quiz, quizRandom1, quizRandom2])


    return (
        <>
            <div className="jp-kana show-word show-meaning show-soundicon">
                <ReactAudioPlayer
                    src={quiz?.audio}
                    autoPlay
                />
                {correctSound && (
                    <ReactAudioPlayer
                        src="https://dekiru.vn/sound/true.mp3"
                        autoPlay
                    />
                )}
                {incorrectSound && (
                    <ReactAudioPlayer
                        src="https://dekiru.vn/sound/false.mp3"
                        autoPlay
                    />
                )}

                <div className="header-les d-flex justify-content-between">
                    <div className="name-les-back">
                        <a href="/" className="back-icon">
                            <i aria-hidden="true"
                                className="fa fa-angle-left" />
                        </a>
                        <span className="name-les">{vocabs[0]?.word.title}</span>
                    </div>
                    <h3 className="score">
                        <span className="ani-star">
                            <i aria-hidden="true" className="fa fa-star-o star1" />
                            <i aria-hidden="true" className="fa fa-star-o star2" />
                            <i aria-hidden="true" className="fa fa-star-o star3" />
                        </span>
                        <i aria-hidden="true" className="fa fa-star-o star-main" />
                        <span className="total-current">{score}</span>
                        <span className="total-les">/ {length + 1}</span>
                        <span >điểm</span>
                    </h3>
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
                                    <h3 className="guide-user-les">Lắng nghe từ và lựa chọn đáp án đúng</h3>
                                    <div className="slider-ct-lesson type-select-img">
                                        <div className="wp-item-question">
                                            <div className="volume-suggest d-flex justify-content-between align-items-center text-center">
                                                <div className="volume-listen d-flex align-items-center">
                                                    <div className="volume-icon">
                                                        <div className="img-icon" onClick={() => new Audio(quiz?.audio).play()}>
                                                            <img src="https://dekiru.vn/img-fix/icon-volume.png" alt="" />
                                                        </div>
                                                    </div>
                                                    <h5 className="guide-listen">Ấn vào icon để nghe</h5>
                                                </div>
                                                <div className="suggest-btn" >
                                                    {showHint ? (<span className="text-suggest animated fadeInRight">
                                                        <span className="ob-kana jp-font">{quiz?.kana}</span>
                                                    </span>) : null}
                                                    <span className="btn-open-suggest bg-yellow" onClick={handleShowHint} style={{ cursor: 'pointer' }}>Gợi ý</span>
                                                </div>
                                            </div>
                                            <div className="kg-study">
                                                <div className="wp-item-select d-flex flex-wrap">
                                                    {
                                                        Object.values(quiz3).map((quiz) => {
                                                            return <div className={`item-volc ${selectState === quiz?.id ? 'selected-status' : ''} ${correctState === quiz?.id ? 'correct-status' : ''} ${incorrectState === quiz?.id ? 'incorrect-status' : ''}`} onClick={() => handleSelectState(quiz?.id)}>
                                                                <div className="vl-study vl-part-child">
                                                                    <div className="ct-item">
                                                                        <div className="img-volc">
                                                                            <img src={quiz?.img} alt="" />
                                                                        </div>
                                                                        <div className="info-volc">
                                                                            <h3 className="text-vietnamese">{quiz?.meaning}
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
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
                        <div className="main-bar" style={{ width: `${current / length * 100}%` }}></div>
                    </div>
                    <div className="btn-result">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <div className="ct-btn-result d-flex justify-content-between">
                                        <div className="left-ct">
                                            <div className="btn-group-les">
                                                {/* --- */}
                                            </div>
                                            <div className="result-ntf">
                                                {correctSound && (
                                                    <div className="corect result-type d-flex align-items-center animated tada">
                                                        <i aria-hidden="true" className="fa fa-check-circle">
                                                        </i><span >Chính xác</span>
                                                    </div>
                                                )}
                                                {incorrectSound && (
                                                    <div className="incorect result-type d-flex align-items-center animated tada">
                                                        <i aria-hidden="true" className="fa fa-times-circle">
                                                        </i><span >Không chính xác</span>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="right-ct">
                                            {
                                                !check ? (
                                                    <div className="btn-group-les" onClick={handleCheck}>
                                                        <span className="btn-nav-les btn-check-les">Kiểm tra</span>
                                                    </div>
                                                ) : (
                                                    current === length ? (
                                                        <Link to={`/vocab/${params.id}/complete`}>
                                                            <div className="btn-group-les">
                                                                <span className="btn-nav-les finish-les">Hoàn thành &nbsp;
                                                                    <i aria-hidden="true" className="fa fa-angle-double-right" />
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    ) : (

                                                        <div className="btn-group-les" onClick={handleNext}>
                                                            <span className="btn-nav-les btn-next-les">Tiếp theo<i aria-hidden="true" className="fa fa-angle-right"></i></span>
                                                        </div>
                                                    )
                                                )
                                            }
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Danh sách từ vựng</h5>
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

export default Quiz