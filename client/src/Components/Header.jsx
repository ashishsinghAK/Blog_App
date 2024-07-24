import { Link ,useLocation} from "react-router-dom";
import { Navbar, TextInput, Button } from 'flowbite-react';
import { FaMoon, FaSearch } from "react-icons/fa";
const Header = () => {
    const path = useLocation().pathname;
    return (
        <div>

            <Navbar className="border-b-2">
                <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold
                dark:text-white">
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
                to-pink-500 rounded-lg text-white">BlogWith</span>
                    <span className="font-mono">AK</span>
                </Link>

                <form>
                    <TextInput type="text" placeholder="Seach..." rightIcon={FaSearch}
                        className="hidden lg:inline bg-gray-100" />
                </form>

                <Button className="w-12 h-10 lg:hidden bg-gray-200">
                    <FaSearch />
                </Button>

                <div className="flex gap-2 md:order-2">
                    <Button className="w-12 h-10  " color='gray'>
                        <FaMoon />
                    </Button>
                    <Link to="/sign-in">
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                    <Navbar.Toggle />
                </div>


                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to="/">
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path ==="/about"} as={'div'}>
                        <Link to="/about">
                            About
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path ==="/projects"} as={'div'}>
                        <Link to="/project">
                            Projects
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>

            </Navbar>

        </div>
    );
};


export default Header;