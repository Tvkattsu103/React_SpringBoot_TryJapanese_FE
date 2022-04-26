import React, { useCallback, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import history from '../../helpers/history';
import axios from 'axios';
import NavbarComp from './../NavBarComp';
import { useParams } from "react-router-dom";

function Quiz() {
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

    const changeExampleStatus = () => {
        setExampleStatus(!exampleStatus)
    }

    return (
        <>
            <div className="jp-kana show-word show-meaning show-soundicon">
                <div className="audio-preload hidden">
                    <div className="audio-preload hidden">
                        <audio src="/sound/select.mp3" preload="metadata"></audio>
                        <audio src="/sound/false.mp3" preload="metadata"></audio>
                        <audio src="/sound/true.mp3" preload="metadata"></audio>
                        <audio src="/sound/result.mp3" preload="metadata"></audio>
                        <audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tachiagarikonkuriitodasetsu-636397873308423806.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/buraketto-636397873286684379.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/katawakutekkyo-636397873296849216.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/morutaru-636397873301668070.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/doraiuooru-636397873299113263.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/gyakutappu-636397873295021691.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/roodo-rooraa-636397873303367912.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/konkuriitokugi-636397873304500712.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tonbo-636397873319697867.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/burudoozaa-636397873290357389.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/domakonkuriitodasetsu-636397873291621584.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/ashiba-636397873288475348.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/sumitsubo-636397873307107511.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tansokou-636397873339855302.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/kessokusen-636397873298240325.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/baibureetaa-636397873284805242.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/sukeeru-636397873305307654.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tekkingumi-636397873313151527.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tekkin-636397873311951341.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/baaru-636397873303951573.mp3"
                            preload="metadata"
                        ></audio>
                        <audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tachiagarikonkuriitodasetsu-vd-636397873307805375.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/buraketto-vd-636397873285729914.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/katawakutekkyo-vd-636397873295994566.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/morutaru-vd2-636397873300695090.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/doraiuooru-vd-636397873293366914.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/gyakutappu-vd-636397873294212501.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/roodo-rooraa-vd-636397873302259073.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/konkuriitokugi-vd-636397873324407991.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tonbo-vd-636397873313852292.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/burudoozaa-vd-636397873289621142.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/domakonkuriitodasetsu-vd-636397873291066956.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/ashiba-vd-636397873283456497.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/sumitsubo-vd-636397873306296045.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tansokou-vd-636397873314443578.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/kessokusen-vd-636397873297694807.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/baibureetaa-vd-636397873298785883.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/sukeeru-vd-636397873314851893.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tekkingumi-vd-636397873312624484.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/tekkin-vd-636397873310723949.mp3"
                            preload="metadata"
                        ></audio
                        ><audio

                            src="https://storage.dekiru.vn/Data/2017/08/31/baaru-vd-636397873308823728.mp3"
                            preload="metadata"
                        ></audio>
                    </div>
                </div>
                <div className="header-les d-flex justify-content-between">
                    <div className="name-les-back">
                        <a href="/" className="back-icon">
                            <i aria-hidden="true"
                                className="fa fa-angle-left" />
                        </a>
                        <span className="name-les">{vocabs[0]?.word.title}</span>
                    </div>
                    <h3 data-v-e60b73b0="" class="score">
                        <span data-v-e60b73b0="" class="ani-star">
                            <i data-v-e60b73b0="" aria-hidden="true" class="fa fa-star-o star1"/>
                            <i data-v-e60b73b0="" aria-hidden="true" class="fa fa-star-o star2"/>
                            <i data-v-e60b73b0="" aria-hidden="true" class="fa fa-star-o star3"/>
                        </span>
                        <i data-v-e60b73b0="" aria-hidden="true" class="fa fa-star-o star-main"/>
                        <span data-v-e60b73b0="" class="total-current">0</span>
                        <span data-v-e60b73b0="" class="total-les">/ 10</span>
                        <span data-v-e60b73b0="">điểm</span>
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
                    {/* <div className="change-type-display item-utl">
                    <div
                        className="el-appear d-flex align-items-center justify-content-end"
                    >
                        <h3 className="text">
                            <a href="!#">Cấu hình hiển thị</a>
                        </h3>
                        <a href="!#"
                            className="open-utl open-type"
                        >
                        <span
                        ><img
                                    src="/img-fix/utl-icon-2.png"
                                    alt="" /></span
                            ></a>
                    </div>
                    <div className="list-type animated fadeIn fadeOut">
                        <ul >
                            <li className="item-type text-right">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="type-display-volc"
                                        id="kanji-type"
                                        value="jp-kanji"
                                        className="form-check-input"
                                    />
                                    <label

                                        htmlFor="kanji-type"
                                        className="form-kanji text-type"
                                    ><span className="text-label">Kanji</span>
                                        <span
                                            className="icon-input icon-no-checked"
                                        ><i
                                            aria-hidden="true"
                                            className="fa fa-square-o"
                                        ></i
                                            ></span>
                                        <span className="icon-input icon-checked"
                                        ><i aria-hidden="true"
                                            className="fa fa-check-square-o"
                                            /></span></label>
                                </div>
                            </li>
                            <li className="item-type text-right">
                                <div className="form-check">
                                    <input
                                        name="type-display-volc"
                                        type="radio"
                                        id="kana-type"
                                        value="jp-kana"
                                        className="form-check-input"
                                    />
                                    <label
                                        htmlFor="kana-type"
                                        className="form-kana text-type"
                                    ><span className="text-label">Kana</span>
                                        <span
                                            className="icon-input icon-no-checked"
                                        ><i
                                                aria-hidden="true"
                                                className="fa fa-square-o"
                                            /></span>
                                        <span className="icon-input icon-checked"
                                        ><i aria-hidden="true"
                                            className="fa fa-check-square-o"
                                            /></span></label>
                                </div>
                            </li>
                            <li className="item-type text-right">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="type-display-volc"
                                        id="romaji-type"
                                        value="jp-romaji"
                                        className="form-check-input"
                                    />
                                    <label

                                        htmlFor="romaji-type"
                                        className="form-romaji text-type"
                                    ><span className="text-label">Romaji</span>
                                        <span

                                            className="icon-input icon-no-checked"
                                        ><i

                                            aria-hidden="true"
                                            className="fa fa-square-o"
                                        ></i
                                            ></span>
                                        <span className="icon-input icon-checked"
                                        ><i

                                            aria-hidden="true"
                                            className="fa fa-check-square-o"
                                        ></i></span
                                        ></label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> */}
                </div>
                <div className="wp-content-les study-volc">
                    <div className="container">
                        <div className="row">
                            <div className="kg-study">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 offset-xl-1">
                                    <h3 class="guide-user-les">Lắng nghe từ và lựa chọn đáp án đúng</h3>
                                    <div class="slider-ct-lesson type-select-img">
                                        <div class="wp-item-question">
                                            <div class="volume-suggest d-flex justify-content-between align-items-center text-center">
                                                <div class="volume-listen d-flex align-items-center">
                                                    <div class="volume-icon">
                                                        <div class="img-icon">
                                                            <img src="/img-fix/icon-volume.png" alt="" />
                                                        </div>
                                                    </div>
                                                    <h5 class="guide-listen">Ấn vào icon để nghe</h5>
                                                </div>
                                                <div class="suggest-btn">
                                                    <a href="javascript:;" class="btn-open-suggest bg-yellow">Gợi ý</a>
                                                </div>
                                            </div>
                                            <div data-v-348e8e0c="" class="kg-study">
                                                <div data-v-348e8e0c="" class="wp-item-select d-flex flex-wrap">
                                                    <div class="item-volc">
                                                        <div class="vl-study vl-part-child">
                                                            <div class="ct-item">
                                                                <div class="img-volc">
                                                                    <img src="https://storage.dekiru.vn/Data/2018/06/13/tonbo-636644960089950004.jpg?w=600&amp;h=400&amp;mode=crop" alt="" />
                                                                </div>
                                                                <div class="info-volc">
                                                                    <h3 class="text-vietnamese">Là sàn
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-volc">
                                                        <div class="vl-study vl-part-child">
                                                            <div class="ct-item">
                                                                <div class="img-volc">
                                                                    <img src="https://storage.dekiru.vn/Data/2017/09/01/xeuidat-636398623676590939.jpg?w=600&amp;h=400&amp;mode=crop" alt="" />
                                                                </div>
                                                                <div class="info-volc">
                                                                    <h3 class="text-vietnamese">Xe ủi đất
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-volc">
                                                        <div class="vl-study vl-part-child">
                                                            <div class="ct-item">
                                                                <div class="img-volc">
                                                                    <img src="https://storage.dekiru.vn/Data/2018/06/13/tekkingumi-636644967603926217.jpg?w=600&amp;h=400&amp;mode=crop" alt="" />
                                                                </div>
                                                                <div class="info-volc">
                                                                    <h3 class="text-vietnamese">Buộc sắt
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                <span
                                                    className="btn-nav-les btn-practice-les"
                                                >Luyện tập
                                                </span>
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
                                                    <span class="btn-nav-les finish-les">Hoàn thành &nbsp;
                                                        <i aria-hidden="true" class="fa fa-angle-double-right" />
                                                    </span>
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
        </>
    )
}

export default Quiz