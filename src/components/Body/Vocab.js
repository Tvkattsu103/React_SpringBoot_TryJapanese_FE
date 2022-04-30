import React, { useCallback, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import history from '../../helpers/history';
import axios from 'axios';
// import NavbarComp from './../NavBarComp';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

function Vocab() {
    const params = useParams();
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
                setLength(data.length - 1);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("jwtToken");
                history.push('/');
            });
    }, [])

    const changeExampleStatus = (status) => {
        setExampleStatus(status)
    }

    useEffect(() => {
        changeExampleStatus(false);
    }, [current])

    // const [musicArray] = useState([
    //     "https://storage.dekiru.vn/Data/2017/08/31/katawakutekkyo-636397873296849216.mp3",
    //     "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    // ]);
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const musicData = musicArray.map((sound) => {
    //         console.log(new Audio(sound));
    //         return { audio: new Audio(sound), play: false };
    //     });


    //     setData(musicData);
    // }, [musicArray]);

    // const playSound = (index) => {
    //     setData((arr) =>
    //         arr.map((sound, i) => {
    //             if (i === index) {
    //                 sound.audio.play();
    //                 // console.log(sound.audio.play());
    //                 return { ...sound, play: true };
    //             }
    //         })
    //     );
    // };
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
                <div className="wp-content-les study-volc" style={{ marginBottom: '50px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="kg-study">
                                <div data-v-e60b73b0="" data-v-348e8e0c="" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <h3 class="guide-user-les">
                                    </h3> <div class="text-question-les">
                                    </div> <div class="slider-ct-lesson">
                                        <div data-v-348e8e0c="" class="kg-study">
                                            <div data-v-348e8e0c="" class="item-volc">
                                                <div class="vl-study vl-part-child">
                                                    <div class="ct-item">
                                                        <div class="img-volc">
                                                            <img src={exampleStatus ? vocabs[current]?.exampleImg : vocabs[current]?.img} alt="" />
                                                        </div> <div class="info-volc">
                                                            <h3 class="text-japanese">
                                                                {/* <span class="ob-kanji jp-font"></span>  */}
                                                                <span class="ob-kana jp-font">{exampleStatus ? vocabs[current]?.example : vocabs[current]?.kana}</span>
                                                                {/*<span class="ob-romaji">morutaru</span> */}
                                                            </h3> <h3 class="text-vietnamese">{exampleStatus ? vocabs[current]?.exampleMeaning : vocabs[current]?.meaning}</h3>
                                                        </div> <div class="volume-icon" onClick={() => new Audio(exampleStatus ? vocabs[current]?.exampleAudio : vocabs[current]?.audio).play()}>
                                                            <div class="img-icon">
                                                                <img src="https://dekiru.vn/img-fix/icon-volume.png" alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4 class="view-exl-study" onClick={() => changeExampleStatus(!exampleStatus)}>
                                                    <span class="view-exl view-change">Xem ví dụ</span>
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
                                                    >Luyện tập
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
                                                    <span class=" btn-back-les btn-nav-les" onClick={() => setCurrent(current - 1)}>
                                                        <i aria-hidden="true" class="fa fa-angle-left" />
                                                        <span>Quay lại</span>
                                                    </span>
                                                ) : null
                                                }
                                                {current !== length ? (
                                                    <span
                                                        className="btn-nav-les btn-next-les" onClick={() => setCurrent(current + 1)}
                                                    >Tiếp theo
                                                        <i aria-hidden="true"
                                                            className="fa fa-angle-right" />
                                                    </span>
                                                ) : (
                                                    <Link to="quiz">
                                                        <span class="btn-nav-les finish-les">Hoàn thành &nbsp;
                                                            <i aria-hidden="true" class="fa fa-angle-double-right" />
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
            {/* </div> */}
        </>
    )
}

export default Vocab