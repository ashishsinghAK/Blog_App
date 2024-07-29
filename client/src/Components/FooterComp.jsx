import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

const FooterComp = () => {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">

                <div className="grid w-full justify-between sm:flex md:grid-cols-1">

                    <div className="mt-5 ">

                        <Link to="/" className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
                to-pink-500 rounded-lg text-white">BlogWith</span>
                            <span className="font-mono">AK</span>
                        </Link>

                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm;gap-6">
                        <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>

                            <Footer.Link href="https://rainbow-dasik-1e9fb6.netlify.app/"
                                targer='_blank' >
                                    Connectify(Code Editor)
                            </Footer.Link>

                            <Footer.Link href="/about"
                                targer='_blank'>
                                Blog with AK
                            </Footer.Link>

                        </Footer.LinkGroup>
                        </div>

                        <div>
                        <Footer.Title title='Follow us' />
                        <Footer.LinkGroup col>

                            <Footer.Link href="https://github.com/ashishsinghAK"
                                targer='_blank' >
                                    Github
                            </Footer.Link>

                            <Footer.Link href="https://www.linkedin.com/in/ashish-kumar-singh-a852b426a/"
                                targer='_blank'>
                                LinkedIn
                            </Footer.Link>

                        </Footer.LinkGroup>
                        </div>


                    </div>

                </div>

                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Blog's with AK" year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center lg:mt-3">
                        <Footer.Icon href="#" icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsTwitter}/>
                        <Footer.Icon href='https://github.com/ashishsinghAK' icon={BsGithub}/>
                        <Footer.Icon href='#' icon={BsDribbble}/>
                    </div>
                </div>

            </div>

        </Footer>
    )
}

export default FooterComp;