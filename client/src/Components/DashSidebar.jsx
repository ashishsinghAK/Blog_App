import React from 'react'
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import {SignOutSuccess} from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab,setTab] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
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
      <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab==='profile'} label={'User'} icon={HiUser} as='div' className="cursor-pointer">
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  )
}
