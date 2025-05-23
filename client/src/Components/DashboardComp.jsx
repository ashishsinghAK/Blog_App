import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';

const DashboardComp = () => {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getuser?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUser);
                    setLastMonthUsers(data.lastMonthUser);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/getpost?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.post);
                    setTotalPosts(data.totalPost);
                    setLastMonthPosts(data.lastMonthPost);
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        const fetchComments = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/comment/getcomment?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser])

    return (
        <div className='p-3 md:mx-auto'>
            <div className='flex flex-wrap gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-red-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full  text-5xl p-3
                    shadow-lg '/>
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500 '>Last Month</div>
                    </div>
                </div>


                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-red-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'>{totalComments}</p>
                        </div>
                        <HiAnnotation className='bg-indigo-600 text-white rounded-full  text-5xl p-3
                    shadow-lg '/>
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500 '>Last Month</div>
                    </div>
                </div>

                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-red-500 text-md uppercase'>Total Posts</h3>
                            <p className='text-2xl'>{totalPosts}</p>
                        </div>
                        <HiDocumentText className='bg-lime-600 text-white rounded-full  text-5xl p-3
                    shadow-lg '/>
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className='text-gray-500 '>Last Month</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                <div className='flex flex-col ww-full md:w-auto shadow-md p-2 rounded-md 
                dark:bg-gray-800'>
                    <div className='flex justify-center p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Users</h1>
                        <Button outline gradientDuoTone='purpleToBlue'><Link to={"/dashboard?tab=users"}>See all</Link></Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User Name</Table.HeadCell>
                            <Table.HeadCell>User Email</Table.HeadCell>
                        </Table.Head>

                        {users && users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.email}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>

                <div className='flex flex-col ww-full md:w-auto shadow-md p-2 rounded-md 
                dark:bg-gray-800'>
                    <div className='flex justify-center p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Comments</h1>
                        <Button outline gradientDuoTone='purpleToBlue'><Link to={"/dashboard?tab=comments"}>See all</Link></Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comment Content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>

                        {comments && comments.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <p className='line-clam-2'>{comment.content}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.numberOfLikes}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>

                <div className='flex flex-col ww-full md:w-auto shadow-md p-2 rounded-md 
                dark:bg-gray-800'>
                    <div className='flex justify-center p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Posts</h1>
                        <Button outline gradientDuoTone='purpleToBlue'><Link to={"/dashboard?tab=posts"}>See all</Link></Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Post Category</Table.HeadCell>
                            
                        </Table.Head>

                        {posts && posts.map((post) => (
                            <Table.Body key={post._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img src={post.image} alt="" className='w-14 h-10 
                                        rounded-md bg-gray-500'/>
                                    </Table.Cell>
                                    <Table.Cell className='w-98'>
                                        {post.title}
                                    </Table.Cell>
                                    <Table.Cell className='w-5 '>
                                        {post.category}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default DashboardComp;
