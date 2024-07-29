import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Table, TableHead } from 'flowbite-react'


const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore,setShowMore] = useState(true);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.post);
          if(data.post.length<9){
            setShowMore(false);
          }
        }
      }
      if (currentUser.isAdmin) {
        fetchPost();
      }
    } catch (err) {
      console.log("Error");
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(`/api/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        //console.log("Fetched additional posts:", data.post);
        setUserPost((prev) => [...prev, ...data.post]);
        if (data.post.length < 9) {
          setShowMore(false);
        }
      } 
    } catch (err) {
      console.error("Error fetching additional posts:", err);
    }
  };


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-full'>
      {currentUser.isAdmin && userPost.length > 0 ?
        (<>
          <Table>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              {/* <Table.HeadCell>Edit</Table.HeadCell> */}
            </Table.Head>
            {
              userPost.map((post) => (
                <Table.Body className='divide-y '>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>'
                      <Link to={`/post/${post.slug}`} className=''>
                        <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className='font-medium text-red-900 dark:text-white'>{post.title}</Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>
                    {/* <Table.Cell>
                      <span>
                        Edit
                      </span>
                    </Table.Cell> */}
                  </Table.Row>
                </Table.Body>
              ))
            }
          </Table>
          {
            showMore && (
              <button className='w-full text-teal-500 self-center text-sm py-7' onClick={handleShowMore}>
                Show More</button>
            )
          }
        </>) :
        (<p>You have no post yet!</p>)}
    </div>
  )
}

export default DashPost;
