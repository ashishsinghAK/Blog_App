import React from 'react'
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

export default function DashSidebar() {
    const location = useLocation();
    const [tab,setTab] = useState('');
    useEffect( () => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
       if(tabFromUrl){
         setTab(tabFromUrl);
       }
    },[location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab==='profile'} label={'User'} icon={HiUser} as='div' className="cursor-pointer">
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  )
}
