import React, { useEffect, useState } from 'react'
import { FaCheck, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import moment from 'moment'
import { useSelector } from 'react-redux';

const FooterComment = ({ comment, onLike, onDisLike, onDelete }) => {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (err) {
                console.log("halla BOL");
            }
        }
        getUser();
    }, [comment])
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <FaCheck className='text-green-500 w-4 h-4 rounded-full bg-gray-200' />
            <div className='flex-1'>
                <div className=''>
                    <div className='flex items-center'>
                        <span className='font-bold mr-1 text-xs '>
                            {user ? `@${user.username}` : "anonymous user"}</span>
                        <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>

                    </div>
                    <span className='ml-2'>{user.isAdmin && <span className='bg-gray-500 rounded p-.5'>admin</span>}</span>
                </div>
                <p className='text-gray-500 mt-3 mb-2'>{comment.content}</p>
                <div className='flex gap-2'>
                    <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500
                    ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-600'}`}>
                        <FaThumbsUp />
                    </button>
                    <p className='text-gray-500'>{
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
                    }</p>
                    <button type='button' onClick={() => onDisLike(comment._id)} className={`text-gray-400 hover:text-blue-500
                    ${currentUser && comment.dislikes.includes(currentUser._id) && '!text-blue-600'}`}>
                        <FaThumbsDown />
                    </button>
                    <p className='text-gray-500'>{
                        comment.numberOfdisLikes > 0 && comment.numberOfdisLikes + " " + (comment.numberOfdisLikes === 1 ? "dislike" : "dislikes")
                    }</p>

                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <>
                                <button type='button' onClick={() => onDelete(comment._id)}
                                    className='text-gray-500 hover:text-red-500'>
                                    Delete
                                </button>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default FooterComment;
