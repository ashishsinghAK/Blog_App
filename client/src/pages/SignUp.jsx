import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import OAuth from "../Components/OAuth";
const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
    
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("Please fill out all the fields");
        }
    
        try {
            setLoading(true);
            setErrorMessage(null);
    
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            // Check if the response status is OK (200-299)
            if (!res.ok) {
                const errorData = await res.json().catch(() => null); // Safely attempt to parse JSON
                setLoading(false);
                return setErrorMessage(errorData?.message || `Error: ${res.statusText}`);
            }
    
            // Parse JSON if response is OK
            const data = await res.json().catch(() => {
                // If JSON parsing fails, handle it gracefully
                setLoading(false);
                setErrorMessage("Failed to parse response from server.");
                return null;
            });
    
            if (data) {
                setLoading(false);
    
                // Check success field from the server
                if (data.success) {
                    navigate('/sign-in');
                } else {
                    setErrorMessage(data.message || "Sign-up failed.");
                }
            }
        } catch (err) {
            console.error('Error during sign up:', err);
            setLoading(false);
            setErrorMessage("An error occurred. Please try again later.");
        }
    };
    

    return (

        <div className="min-h-fit mt-20">

            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
                {/* left side */}
                <div className="flex-1">
                    <Link to="/" className=" font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
                to-pink-500 rounded-lg text-white">BlogWith</span>
                        <span className="font-mono">AK</span>
                    </Link>
                    <p className="text-sm mt-5 mr-5">This is a demo Project. You can sign up with your email and password
                        or with google
                    </p>
                </div>


                {/* right side */}
                <div className="flex-1 ">
                    <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                        <div className="">
                            <Label value="Your Username" />
                            <TextInput type="text" placeholder="Username" id="username" onChange={changeHandler} />
                        </div>

                        <div className="">
                            <Label value="Your Email" />
                            <TextInput type="email" placeholder="Email" id="email" onChange={changeHandler} />
                        </div>

                        <div className="">
                            <Label value="Your Password" />
                            <TextInput type="password" placeholder="Password" id="password" onChange={changeHandler} />
                        </div>

                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className="pl-3">Loading...</span>
                                    </>
                                ) : 'Sign Up'
                            }
                        </Button>
                        <OAuth/>
                    </form>

                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account ?</span>
                        <Link to='/sign-in' className="text-blue-500">
                            Sign In
                        </Link>
                    </div>

                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}

                </div>

            </div>

        </div>
    )
}
export default SignUp;