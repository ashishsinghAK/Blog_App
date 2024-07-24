import { Link } from "react-router-dom";
import { Label, TextInput,Button } from "flowbite-react";
const SignUp = () => {
    return (
        <div className="min-h-screen mt-20">

            <diV className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
                {/* left side */}
                <div classname="flex-1">
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
                    <form className="flex flex-col gap-4">
                        <div className="">
                            <Label value="Your Username"/>
                            <TextInput type="text" placeholder="Username" id="username" />
                        </div>

                        <div className="">
                            <Label value="Your Email"/>
                            <TextInput type="text" placeholder="Email" id="email" />
                        </div>

                        <div className="">
                            <Label value="Your Password"/>
                            <TextInput type="text" placeholder="Password" id="password" />
                        </div>

                        <Button gradientDuoTone='purpleToPink' type='submit'>
                            Sign Up
                            </Button>
                    </form>

                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account ?</span>
                        <Link to='/sign-in' className="text-blue-500">
                        Sign In
                        </Link>
                    </div>


                </div>

            </diV>

        </div>
    )
}
export default SignUp;