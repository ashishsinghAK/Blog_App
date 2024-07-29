import { TextInput, Select, FileInput, Button, Alert } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';


const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError,setPublishError] = useState(null);
    const navigate = useNavigate();


    const handleImageUpload = async () => {
        try {
            if (!file) {
                setUploadError('please select a image');
                return;
            }
            setUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setUploadError("Image upload failed");
                    setUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadProgress(null);
                        setUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (err) {
            setUploadError('Image Upload Failed');
            setUploadProgress(null);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch('/api/post/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            const data = await res.json();
            // if(data.success ===false){
            //     setPublishError(data.message);
            //     return;
            // }
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        }catch(err){
            setPublishError("Something went wrong");
        }
    }


    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1' 
                    onChange={(e) => setFormData({...formData,title:e.target.value})}/>
                    <Select onChange={(e) => setFormData({...formData,category:e.target.value})}>
                        <option value='UnCategorised'>Select a Category</option>
                        <option value='JavaScript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' onClick={handleImageUpload}
                    disabled={uploadProgress}>
                        {
                            uploadProgress ? (
                                <div className='w-16 h-16'>
                                   <CircularProgressbar value={uploadProgress}
                                   text={`${uploadProgress || 0}%`}/> 
                                </div>
                            ) :
                            'Upload Image'
                        }
                    </Button>

                </div>
                {
                    uploadError && <Alert color='failure'>{uploadError}</Alert>
                }
                {
                    formData.image && (
                        <img src={formData.image} alt='upload' className='w-full h-72 object-cover'/>
                    )
                }
                <ReactQuill theme='snow' placeholder='write something...' className='h-72 mb-12' required 
                onChange={(value) => setFormData({...formData,content:value})}/>
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
                {
                    publishError && <Alert className='mt-5' color='failure'>{"Title must not same as Previous Posts"}</Alert>
                }

            </form>

        </div>
    )
}


export default CreatePost;