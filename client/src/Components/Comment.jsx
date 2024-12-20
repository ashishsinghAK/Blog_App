import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { Alert, Button, Textarea, TextInput, Modal } from 'flowbite-react';
import FooterComment from './FooterComment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const Comment = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    // console.log(comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            })
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (err) {
            setCommentError(err.message);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getComment/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        getComments();
    }, [postId])

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/like/${commentId}`, {
                method: 'PUT'
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId
                        ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length,
                        }
                        : comment
                ));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const handledisLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/dislike/${commentId}`, {
                method: 'PUT'
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId
                        ? {
                            ...comment,
                            dislikes: data.dislikes,
                            numberOfdisLikes: data.dislikes.length,
                        }
                        : comment
                ));
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId))
            }
        } catch (err) {
            console.log(err.message);
        }
    }


    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                currentUser ? (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p>Signed In as : </p>
                        {/* <img src={currentUser.profilePicture} alt="" /> */}
                        <FaCheck className='text-green-500' />
                        <Link to={'/dashboard?tab=profile'} className='dark:text-white text-blue-500'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ) : (
                    <div className='text-sm text-teal-500 my-5 '>
                        You must be sign in for Comment
                        <Link to={'/sign-in'} className='text-blue-500 hover:underline '>
                            Sign In
                        </Link>
                    </div>
                )
            }

            {
                currentUser && (
                    <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                        <Textarea placeholder='Add Comments...' rows='4' maxLength='200'
                            onChange={(e) => setComment(e.target.value)} value={comment} />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-xs'>{200 - comment.length} word remaining</p>
                            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                                Post
                            </Button>
                        </div>
                        {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}
                    </form>
                )
            }
            {
                comments.length === 0 ? (
                    <p className='text-sm my-5'>No Comments Yet!</p>
                ) : (
                    <>
                        <div className='text-sm my-5 flex items-center gap-1'>
                            <p>Comments</p>
                            <div className='border border-gray-400 py-1 px-2 rounded:sm'>
                                <p>
                                    {comments.length}
                                </p>
                            </div>
                        </div>

                        {comments.map((comment) => (
                            <FooterComment key={comment._id} comment={comment} onLike={handleLike} onDisLike={handledisLike}
                                onDelete={(commentId) => {
                                    setShowModal(true);
                                    setCommentToDelete(commentId)
                                }} />
                        ))}

                    </>
                )
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 
                            dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-300'>
                            Are you sure you want to delete the Comment
                        </h3>
                        <div className='flex justify-center gap-4 '>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>
                                Yes, I'm sure
                            </Button>
                            <Button color='green' onClick={() => setShowModal(false)}>No,Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Comment;
