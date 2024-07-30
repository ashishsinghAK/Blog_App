import React,{useEffect, useState} from 'react'
import { FaCheck } from 'react-icons/fa';
import moment from 'moment'

const FooterComment = ({comment}) => {
    const [user,setUser] = useState({});
    useEffect(()=> {
        const getUser = async() => {
            try{
                const res = await fetch(`/api/v1/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
                 
            }catch(err){
                console.log("halla BOL");
            }
        }
        getUser();
    },[comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <FaCheck className='text-green-500 w-4 h-4 rounded-full bg-gray-200' />
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs '>
                    {user ? `@${user.username}` : "anonymous user"}</span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-gray-500 mb-2 '>{comment.content}</p>
        </div>
        


    </div>
  )
}

export default FooterComment;
