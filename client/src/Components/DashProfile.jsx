import { TextInput, Button, Alert,Modal} from 'flowbite-react';
import {Link} from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {deleteUserFailure,deleteUserStart,deleteUserSuccess,SignOutSuccess} from '../redux/slice/userSlice';

export default function DashProfile() {
    const imageFileUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const { currentUser } = useSelector(state => state.user);
    const [showModal,setShowModal] = useState(false);
    const dispatch = useDispatch();
    const handleDeleteUser = async() => {
        setShowModal(false);
        try{
            dispatch(deleteUserStart());
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/delete/${currentUser._id}`,{
                method:'DELETE'
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserFailure(data.message));
            }
            else{
                dispatch(deleteUserSuccess(data));
            }

        }catch(err){
            dispatch(deleteUserFailure(err.message));
        }
    }

    const handleSignOut = async() => {
        try{
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/signout`,{
                method:'POST'
            });
            const data = await res.json();
            if(!res.ok){
                console.log('Error occured');
            }
            else{
                dispatch(SignOutSuccess());
            }
        }catch(err){

        }
    }
    return (
        <div className='max-w-lg mx-auto p-3 w-full md:ml-[20vw]'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4 '>
                
                <div className='relative w-32 h-32 self-center shadow-md overflow-hidden rounded-full' >
                    
                    <img src={imageFileUrl} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                </div>


                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />

                {
                    currentUser && (
                       <Link to={'/create-post'}>
                         <Button type='button' gradientDuoTone='purpleToBlue' className='w-full' outline>
                            Create a Post
                        </Button>
                       </Link>
                    )
                }


            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
                <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
            </div>
                <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                    <Modal.Header/>
                    <Modal.Body>
                        <div className='text-center'>
                            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 
                            dark:text-gray-200 mb-4 mx-auto'/>
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-300'>
                                Are you sure you want to delete your account
                            </h3>
                            <div className='flex justify-center gap-4 '>
                                <Button color='failure' onClick={handleDeleteUser}>
                                    Yes, I'm sure
                                </Button>
                                <Button color='green' onClick={() => setShowModal(false)}>No,Cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
    );
}
