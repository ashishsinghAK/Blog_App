import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import '../index.css';
import Comment from '../Components/Comment';
import PostCard from '../Components/PostCard';

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState(null);
    const [recentPost,setRecentPost] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/getpost?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPosts(data.post[0]);
                    setLoading(false);
                    setError(false);
                }

            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();

    }, [postSlug]);

    useEffect(() => {
        try{
            const fetchPost = async() => {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/getpost?limit=3`);
                const data = await res.json();
                if(res.ok){
                    setRecentPost(data.post);
                }
            };
            fetchPost();
        }catch(err){
            console.log(err.message);
        }
    },[])

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <Spinner />
            </div>
        )
    }
    return (
        <main className='p-3  flex flex-col mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10  self-center font-serif max-w-2xl dark:text:4xl'>
                {posts && posts.title}
            </h1>
            <Link to={`/search?category=${posts && posts.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{posts && posts.category}</Button>
            </Link>

            <img src={posts && posts.image} alt={posts && posts.title} className='mt-10 p-3 
            max-h-[600px] w-full object-cover'/>


            <div dangerouslySetInnerHTML={{ __html: posts && posts.content }} className='p-2 max-w-2xl
            mx-auto w-full post-content'>

            </div>
            { posts && <Comment postId={posts._id}/>}

            <div className='flex flex-col judtify-center items-center mb-5 '>
               <h1 className='text-xl mt-5'>Recent Articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {
                        recentPost && recentPost.map((post) => 
                            <PostCard key={post._id} post={post}/>
                        )
                    }
                </div>
            </div>
        </main>
    )
}

export default PostPage
