import catTownGif from '../assets/cat_town.gif'
import catMagnifyingGlass from '../assets/cat_magnifying_glass.jpeg'
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <header className="bg-gradient-to-r from-primary-light to-primary-dark py-20">
                <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap items-center gap-x-4">
                    <div className="w-full md:w-1/2 mb-12 md:mb-0">
                        <img src={catTownGif} alt="Cityscape" className="rounded-lg shadow-lg"/>
                    </div>
                    <div className="w-full md:w-1/2 text-white ml-8">
                        <h1 className="text-4xl font-bold mb-6">Discover the Gaps in Your City's Market 🐈</h1>
                        <p className="text-xl mb-10">Find out where there's a high demand for businesses like yours with
                            our location-based heatmap.</p>
                        <Link to='/map'
                           className="bg-white hover:bg-gray-200 text-primary font-bold py-3 px-6 rounded-full inline-block uppercase tracking-wider text-xl">Try
                            It Now</Link>
                    </div>
                </div>
            </header>
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0">
                            <h2 className="text-3xl font-bold mb-4">What is our service?</h2>
                            <p className="text-xl mb-6">Our service helps entrepreneurs identify gaps in their city's
                                market by analyzing location-based data. Using our heatmap, you can easily see where
                                there is high demand for certain types of businesses like restaurants, bars, and
                                clinics.</p>
                            <p className="text-xl">With this information, you can make informed decisions about where to
                                open your business and maximize your chances of success.</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img src={catMagnifyingGlass} alt="Heatmap" className="rounded-lg shadow-lg"/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold">Key Features</h2>
                        <p className="text-xl">Our service provides a range of features to help entrepreneurs identify gaps in their city's market.</p>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-gray-100 rounded-lg p-6 flex flex-col h-full">
                                <div className='text-6xl text-center mb-6'>🙀</div>
                                <h3 className="text-xl font-bold mb-2">Location-based Analysis</h3>
                                <p className="text-lg flex-grow">Our service uses location-based data to identify areas with high demand for certain types of businesses.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-gray-100 rounded-lg p-6 flex flex-col h-full">
                                <span className='text-6xl text-center mb-6'>😻</span>
                                <h3 className="text-xl font-bold mb-2">Real-time Insights</h3>
                                <p className="text-lg flex-grow">Our service provides real-time insights to help you stay up-to-date with changing market conditions.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-gray-100 rounded-lg p-6 flex flex-col h-full">
                                <span className='text-6xl text-center mb-6'>🙀</span>
                                <h3 className="text-xl font-bold mb-2">Customizable Search</h3>
                                <p className="text-lg flex-grow">Our service allows you to customize your search to find the perfect location for your business.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-primary-dark text-white">
                <div className="container mx-auto py-8 px-4">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <h3 className="text-xl font-bold mb-2">About Us</h3>
                            <p className="text-lg">Our mission is to provide location-based insights to help businesses identify gaps in the market and make informed decisions about where to start or expand their ventures. With our expertise in data analysis and market research, we are dedicated to helping entrepreneurs achieve their goals and grow their businesses.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                            <ul className="list-unstyled">
                                <li className="mb-4">
                                    Rumanova 1, 040 01 Košice, Slovakida
                                </li>
                                <li className="mb-4">
                                    +421 912 345 678
                                </li>
                                <li className="mb-4">
                                    example@example.com
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center text-sm">
                        <p>&copy; 2023 Company. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home

