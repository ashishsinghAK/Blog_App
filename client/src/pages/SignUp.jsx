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
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false);
            if (res.ok) {
                navigate('/sign-in');
            }
        } catch (err) {
            console.error('Error during sign up:', err);
            setLoading(false);
        }
    }

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