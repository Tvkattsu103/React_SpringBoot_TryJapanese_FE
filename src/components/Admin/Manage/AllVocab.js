import React, { useEffect, useState, useRef } from 'react'
import SideBar from './../UI/SideBar';
import TopBar from './../UI/TopBar';
import Footer from './../UI/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import MyToast from "../MyToast";
import { useParams } from "react-router-dom";
import { scroller } from "react-scroll";

const initialState = {
    kanji: "",
    kana: "",
    romaji: "",
    meaning: "",
    example: "",
    exampleMeaning: "",
    img: "",
    exampleImg: "",
    audio: "",
    exampleAudio: "",
    word: { id: "" },
}

function AllVocab() {
    const params = useParams();
    const [vocabs, setVocabs] = useState([]);
    const [show, setShow] = useState(false);
    const [method, setMethod] = useState('')
    const [exampleStatus, setExampleStatus] = useState(false);
    const [addState, setAddState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [vocabAdd, setVocabAdd] = useState(initialState);
    const [length, setLength] = useState(0);

    useEffect(() => {
        setVocabAdd({ ...vocabAdd, word: { id: params.id } })
    }, [])
    const scrollToAdd = () => {
        setAddState(true);
        scroller.scrollTo("scrollToAdd", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    const updateWordQuantity = (quantity) => {
        axios
            .put("http://localhost:8081/rest/words", {id: params.id, quantity: quantity})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const scrollToEdit = (vocab) => {
        setVocabAdd({
            ...vocabAdd,
            kanji: vocab.kanji,
            kana: vocab.kana,
            romaji: vocab.romaji,
            meaning: vocab.meaning,
            example: vocab.example,
            exampleMeaning: vocab.exampleMeaning,
            img: vocab.img,
            exampleImg: vocab.exampleImg,
            audio: vocab.audio,
            exampleAudio: vocab.exampleAudio,
            id: vocab.id
        })
        setAddState(true);
        setEditState(true);
        scroller.scrollTo("scrollToAdd", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    const handleVocabAdd = (e) => {
        const { name, value } = e.currentTarget;
        setVocabAdd({ ...vocabAdd, [name]: value })
    }
    console.log(length)

    const saveVocab = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8081/rest/vocab", vocabAdd)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (vocabs != null) {
                setMethod('post')
                setShow(true);
                setTimeout(() => setShow(false), 3000);
                findVocabByID();
            } else {
                setShow(false)
            }
        }, 1000);
        updateWordQuantity(length+1);
        setVocabAdd(initialState)
        setAddState(false)
    }

    const updateVocab = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8081/rest/vocab", vocabAdd)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (vocabs != null) {
                setMethod('post')
                setShow(true);
                setTimeout(() => setShow(false), 3000);
                findVocabByID();
            } else {
                setShow(false)
            }
        }, 1000);
        setVocabAdd(initialState)
        setEditState(false)
        setAddState(false)
    }

    const findVocabByID = () => {
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
                setLength(data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeExampleStatus = () => {
        setExampleStatus(!exampleStatus)
    }

    const deleteVocab = (id) => {
        axios
            .delete("http://localhost:8081/rest/vocab/" + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (vocabs != null) {
                setMethod('delete')
                setShow(true);
                setTimeout(() => setShow(false), 3000);
                findVocabByID();
            } else {
                setShow(false)
            }
        }, 1000);
        updateWordQuantity(length-1);
        setLength(length-1);
    };

    useEffect(() => {
        findVocabByID();
    }, [])
    return (
        <>
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">
                        <TopBar />
                        <div style={{ display: show ? "block" : "none" }}>
                            <MyToast
                                show={show}
                                message={method === 'delete' ? "Vocab Deleted Successfully." : method === 'post' ? "Vocab Saved Successfully." : "Vocab Updated Successfully."}
                                type={method === 'delete' ? "danger" : "success"}
                            />
                        </div>
                        {/* Begin Page Content */}
                        <div className="container-fluid">

                            {/* DataTales Example */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Quản lý danh sách từ vựng</h6>
                                </div>
                                <div
                                    className="title-search d-flex justify-content-between flex-wrap" style={{ padding: '20px 20px 0px' }}
                                >
                                    <button
                                        onClick={changeExampleStatus}
                                        className={`btn ${exampleStatus ? 'btn-secondary' : 'btn-primary'} `}
                                        style={{ width: '180px' }}
                                    >Câu ví dụ
                                    </button>
                                    <button
                                        onClick={scrollToAdd}
                                        className="btn btn-primary"
                                        style={{ width: '180px' }}
                                    >Thêm từ vựng
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    {exampleStatus ? (
                                                        <>
                                                            <th>Câu ví dụ</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th>Kanji</th>
                                                            <th>Kana</th>
                                                            <th>Romaji</th>
                                                        </>
                                                    )}
                                                    <th>Nghĩa</th>
                                                    <th>Ảnh</th>
                                                    <th>Audio</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>STT</th>
                                                    {exampleStatus ? (
                                                        <>
                                                            <th>Câu ví dụ</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th>Kanji</th>
                                                            <th>Kana</th>
                                                            <th>Romaji</th>
                                                        </>
                                                    )}
                                                    <th>Nghĩa</th>
                                                    <th>Ảnh</th>
                                                    <th>Audio</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                    vocabs.map((vocab, index) => (
                                                        <tr>
                                                            <td width={'50px'}>{index + 1}</td>
                                                            {exampleStatus ? (
                                                                <>
                                                                    <td>{vocab?.example}</td>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <td>{vocab?.kanji}</td>
                                                                    <td>{vocab?.kana}</td>
                                                                    <td>{vocab?.romaji}</td>
                                                                </>
                                                            )}
                                                            <td>{exampleStatus ? vocab?.exampleMeaning : vocab?.meaning}</td>
                                                            <td width={'180px'}><img src={exampleStatus ? vocab?.exampleImg : vocab?.img} className="w-100" /></td>
                                                            <td width={'50px'}><span
                                                                className="btn btn-secondary btn-circle btn-xs"
                                                                onClick={() => new Audio(exampleStatus ? vocab?.exampleAudio : vocab?.audio).play()}
                                                                style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                                <i className="fa fa-volume-up" />
                                                            </span></td>
                                                            <td width={'180px'}>
                                                                <span
                                                                    className="btn btn-success btn-circle btn-xs"
                                                                    onClick={() => scrollToEdit(vocab)}
                                                                    style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                                    <i className="fa fa-edit" />
                                                                </span>
                                                                <span
                                                                    className="btn btn-danger btn-circle btn-xs"
                                                                    onClick={() => deleteVocab(vocab.id)}
                                                                    style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                                    <i className="fa fa-trash" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className='scrollToAdd'>
                                        {
                                            addState ? (
                                                <>
                                                    <div className='container'>
                                                        <div className="text-center">
                                                            <h1 className="h4 text-gray-900 mb-4">{editState ? 'Sửa từ vựng' : 'Thêm từ vựng'}</h1>
                                                        </div>
                                                        <form className="user">
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.kanji} name="kanji" id="exampleFirstName"
                                                                        placeholder="Kanji" required />
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.kana} name="kana" id="exampleLastName"
                                                                        placeholder="Kana" required />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.romaji} name="romaji" id="exampleFirstName"
                                                                        placeholder="Romaji" required />
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.meaning} name="meaning" id="exampleLastName"
                                                                        placeholder="Dịch nghĩa" required />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.example} name="example" id="exampleFirstName"
                                                                        placeholder="Câu ví dụ" required />
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.exampleMeaning} name="exampleMeaning" id="exampleLastName"
                                                                        placeholder="Dịch nghĩa ví dụ" required />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.img} name="img" id="exampleFirstName"
                                                                        placeholder="Ảnh từ vựng" required />
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.exampleImg} name="exampleImg" id="exampleLastName"
                                                                        placeholder="Ảnh ví dụ" required />
                                                                </div>

                                                            </div>
                                                            {(vocabAdd.img !== "" || vocabAdd.exampleImg !== "") && (
                                                                <div className="form-group row">
                                                                    <div className="col-sm-6 mb-3 mb-sm-0 d-flex justify-content-center">
                                                                        <img src={vocabAdd.img} width="150" />
                                                                    </div>
                                                                    <div className="col-sm-6 d-flex justify-content-center">
                                                                        <img src={vocabAdd.exampleImg} width="150" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="form-group row">
                                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.audio} name="audio" id="exampleFirstName"
                                                                        placeholder="Audio" required />
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <input type="text" className="form-control form-control-user" onChange={(e) => handleVocabAdd(e)} value={vocabAdd.exampleAudio} name="exampleAudio" id="exampleLastName"
                                                                        placeholder="Audio ví dụ" required />
                                                                </div>
                                                            </div>
                                                            {(vocabAdd.audio !== "" || vocabAdd.exampleAudio !== "") && (
                                                                <div className="form-group row">
                                                                    <div className="col-sm-6 mb-3 mb-sm-0 d-flex justify-content-center">
                                                                        <div className='btn-circle btn-danger'>
                                                                            <img
                                                                                src="https://dekiru.vn/img-fix/icon-volume.png"
                                                                                style={{ width: '24px' }}
                                                                                onClick={() => new Audio(vocabAdd.audio).play()}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6 d-flex justify-content-center">
                                                                        <div className='btn-circle btn-danger'>
                                                                            <img
                                                                                src="https://dekiru.vn/img-fix/icon-volume.png"
                                                                                style={{ width: '24px' }}
                                                                                onClick={() => new Audio(vocabAdd.exampleAudio).play()}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="d-flex justify-content-center">
                                                                {editState ? (
                                                                    <button
                                                                        type='submit'
                                                                        onClick={updateVocab}
                                                                        className="btn btn-success btn-user m-2" style={{ width: '100px' }}
                                                                    >
                                                                        Sửa
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type='submit'
                                                                        onClick={saveVocab}
                                                                        className="btn btn-success btn-user m-2" style={{ width: '100px' }}
                                                                    >
                                                                        Thêm
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => setAddState(false)}
                                                                    className="btn btn-danger btn-user m-2" style={{ width: '100px' }}
                                                                >
                                                                    Huỷ
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='d-flex justify-content-end'>
                                                    <button
                                                        className="btn btn-primary btn-circle btn-xs"
                                                        onClick={scrollToAdd}
                                                        style={{ borderRadius: '50%', margin: '0 5px' }}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            )
                                        }
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
            </div >
            {/* End of Page Wrapper */}

            {/* Scroll to Top Button */}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
        </>
    )
}

export default AllVocab