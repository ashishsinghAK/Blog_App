import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import PostCard from '../Components/PostCard';


const Home = () => {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async() => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/getpost`);
            const data = await res.json();
            if(res.ok){
                setPosts(data.post);
            }
        }
        fetchPost();
    },[])

    return (
        <div>
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                    Welcome to my Blog Page, where stories come alive! Dive into a world of captivating narratives, insightful articles, and thought-provoking discussions. Whether you're here for inspiration, knowledge, or entertainment, our blog offers a diverse range of topics to spark your curiosity. Join our community, explore fresh perspectives, 
                    and embark on a journey of discovery with us. Happy reading! </p>

                    <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
                    view more posts</Link>
            </div>
            <div className='mac-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
            {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-2xl font-semibold text-center'>
                            Recent Posts
                        </h2>
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <span>
                        <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                            View all Posts
                        </Link>
                       </span>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home;