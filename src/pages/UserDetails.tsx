import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";

interface IPosts {
    userId: number
    id: number
    title: string
    body: string
}

interface IComments {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

function UserDetails(props) {
    const [imageUrl] = useState('https://scott88lee.github.io/FMX/img/avatar.jpg');
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentId, setcommentId] = useState();
    const [show, setShow] = useState(false);

    const handleCommentsModalClose = () => {
        setShow(false);
    };
    const handleCommentsModalShow = (commentId) => {
        setcommentId(commentId);
        setShow(true);
    };


    const {user} = props.location.state
    useEffect(() => {
        async function fetchData() {
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                .then(res => {
                    setPosts(res.data);
                })
        }

        fetchData();
    }, [posts, user.id]);

    useEffect(() => {
        async function fetchData() {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${commentId}/comments`)
                .then(res => {
                    setComments(res.data);
                })
        }
        fetchData();
    }, [commentId, user.id]);

    return (
        <>
            <div className="container">
                <div className="row mt-5 align-items-center">
                    <div className="col-8">
                        <h1 className="display-2">{user.name}</h1>
                    </div>

                    <div className="col-4 text-right">
                        <img src={imageUrl} width="75%" height="auto" alt="user-image"/>
                    </div>
                </div>

                <div className="ml-1 mb-5 user-info">
                    <h3 className="my-4">Email Adresi: <span className="text-muted ml-2">{user.email}</span></h3>

                    <h3 className="my-4">Yaşadığı Şehir: <span className="text-muted ml-2">{user.address.city}</span>
                    </h3>

                    <h3 className="my-4">Telefon Numarası: <span className="text-muted ml-2">{user.phone}</span></h3>

                    <h3 className="my-4">Web Sitesi: <span className="text-muted ml-2">{user.website}</span></h3>
                </div>

                {/* Jsondan gelen gönderiler listeleniyor /user-details/:id */}
                {
                    posts.map((post: IPosts) => (
                        <div key={post.id} className="row mb-5">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.body}</p>
                                    <a type="button" className="w-50" onClick={() => handleCommentsModalShow(post.id)}>Yorumlar</a>
                                </div>

                                <Modal className="mt-2" show={show} onHide={handleCommentsModalClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Yorumlar</Modal.Title>
                                    </Modal.Header>

                                    {/* Jsondan gelen commentler listeleniyor => modal içerisinde*/}
                                    <Modal.Body>
                                        {
                                            comments.map((comment: IComments) => (
                                                <div key={comment.id} className="card p-3 m-3">
                                                    <h5 className="text-muted">{comment.email}</h5>
                                                    <h5 className="card-title"><strong>{comment.name}</strong></h5>
                                                    <p className="card-text">{comment.body}</p>
                                                </div>
                                            ))
                                        }
                                    </Modal.Body>

                                    <Modal.Footer className="d-block">
                                        <div className="container">
                                            <form>
                                                <h3 className="text-muted text-center w-100 mt-2 mb-4">Gönderi Hakkında Yorum Yapın</h3>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Email"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Başlık"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                        <textarea className="form-control"
                                                                  id="exampleFormControlTextarea1"
                                                                  minLength={10}
                                                                  placeholder="İçerik (En Az 10 Karakter Giriniz)"
                                                        />
                                                </div>

                                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                                            </form>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default UserDetails;
