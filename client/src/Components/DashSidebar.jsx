import React from 'react'
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight,HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import {SignOutSuccess} from '../redux/slice/userSlice';
import { useDispatch,useSelector} from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab,setTab] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=> state.user);

    
    useEffect( () => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
       if(tabFromUrl){
         setTab(tabFromUrl);
       }
    },[location.search]);

    const handleSignOut = async() => {
      try{
          const res = await fetch('/api/v1/signout',{
              method:'POST'
          });
          const data = await res.json();
          if(!res.ok){
              console.log('Error occured');
          }
          else{
              dispatch(SignOutSuccess());
              navigate('/sign-in')
          }
      }catch(err){
          console.log("Error! occured")
      }
  }


  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.ItemGroup className='flex flex-col gap-1'>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab==='profile'} label={currentUser.isAdmin ? 'Admin' : 'User'} icon={HiUser} as='div' className="cursor-pointer">
          Profile
        </Sidebar.Item>
        {
          currentUser && (
            <Link to='/dashboard?tab=posts' >
            <Sidebar.Item active={tab==='posts'} icon={HiDocumentText} as='div'>
              Posts
            </Sidebar.Item>
            </Link>
          )
        }

{
          currentUser && (
            <Link to='/dashboard?tab=users' >
            <Sidebar.Item active={tab==='users'} icon={HiOutlineUserGroup} as='div'>
              Users
            </Sidebar.Item>
            </Link>
          )
        }


        </Link>
        <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  )
}
