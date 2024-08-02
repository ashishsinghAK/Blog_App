import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { FaMoon, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch, } from 'react-redux';
import { toggleTheme } from '../redux/slice/themeSlice';
import { SignOutSuccess } from '../redux/slice/userSlice';
import { useEffect, useState } from "react";


const Header = () => {
    const imageFileUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const { currentUser } = useSelector(state => state.user);
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const location = useLocation();
    const { theme } = useSelector((state) => state.theme);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermfromUrl = urlParams.get('searchTerm');
        if(searchTermfromUrl){
            setSearchTerm(searchTermfromUrl);
        }
    }, [location.search])


    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/v1/signout', {
                method: 'POST'
            });
            const data = await res.json();
            if (!res.ok) {
                console.log('Error occured');
            }
            else {
                dispatch(SignOutSuccess());
                navigate('/sign-in')
            }
        } catch (err) {
            console.log("Error! occured")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }


    return (
        <div>

            <Navbar className="border-b-2">
                <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold
                dark:text-white">
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
                to-pink-500 rounded-lg text-white">BlogWith</span>
                    <span className="font-mono">AK</span>
                </Link>
                <form onSubmit={handleSubmit}>
                    <TextInput type="text" placeholder="Seach..." rightIcon={FaSearch}
                        className="hidden lg:inline bg-gray-100" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                </form>
                <Button className="w-12 h-10 lg:hidden bg-gray-200">
                    <FaSearch />
                </Button>
                <div className="flex gap-2 md:order-2">
                    <Button className="w-12 h-10  " color='gray' pill onClick={() => dispatch(toggleTheme())}>
                        <FaMoon />
                    </Button>
                    {
                        currentUser ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt='user' img={imageFileUrl} rounded />
                                    // <Avatar alt='user' img={currentUser.profilePicture} rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className='block text-sm'>@{currentUser.username}</span>
                                    <span className='block text-sm font-medium truncate'>
                                        @{currentUser.email}
                                    </span>
                                </Dropdown.Header>
                                <Link to={'/dashboard?tab=profile'}>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <Link to='/sign-in'>
                                <Button gradientDuoTone='purpleToBlue' outline >
                                    Sign In
                                </Button>
                            </Link>
                        )
                    }
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to="/">
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to="/about">
                            About
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};


export default Header;