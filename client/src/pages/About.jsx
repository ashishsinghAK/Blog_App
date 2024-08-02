const About = () => {
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-2xl mx-auto p-3 text-center ">
                <div>
                    <h1 className="text-3xl font-semibold text-center my-7">About BlogWith AK</h1>
                    <div className="text-md text-gray-500 flex flex-col gap-6">
                        <p>
                        The Blog page that I created to share my thoughts and ideas with the world.
                        I am aspiring Software Developer and I love to share my knowlwdge and experience
                        that I have learned.
                        I hove you enjoy reading my blog 
                        </p>

                        <p>
                            On this blog page ,you'll find articles related to topic such as web developent,
                            computer science core concepts and programming languages
                        </p>

                        <p>
                            I encourage you to leave comments on my posts and engage with other readers. 
                            I believe that a community of learners can help each other grow and improve
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;