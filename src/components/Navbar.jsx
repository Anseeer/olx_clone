import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuthContext from '../context/useAuthContext';

export const Navbar = ({ openModal }) => {
    const [selectedLocation, setSelectedLocation] = useState("India");
    const [searchQuery, setSearchQuery] = useState('');
    const [language, setLanguage] = useState('ENGLISH');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHidden, setHidden] = useState(true);
    const [profileMenu, setProfileMenu] = useState(false)
    const { user, logout } = useAuthContext();

    console.log(user)

    return (
        <nav className='sticky top-0 z-50 w-full bg-white shadow-md'>
            <div className='flex flex-row justify-between w-full bg-gray-200 py-3 px-4 gap-3'>
                <Link to="/">
                    <svg width="46px" height="46px" className='h-8 w-8 md:h-12 md:w-12' viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd">
                        <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
                    </svg>
                </Link>

                <div className="hidden md:flex relative border-2 bg-white border-black rounded mr-2 w-64">
                    <div className="flex items-center p-2">
                        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="ml-2 w-full outline-none"
                        />
                        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <div className="hidden md:flex flex-grow border-2 border-black bg-white rounded">
                    <input
                        type="text"
                        placeholder='Search "Properties"'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 outline-none"
                    />
                    <button className="bg-teal-900 p-2 text-white cursor-pointer">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="flex gap-3 items-center ml-2">
                    <button className="flex items-center mx-2 cursor-pointer" onClick={() => setHidden(!isHidden)}>
                        <span className="font-semibold">{language}</span>
                        <svg className="w-5 h-5 text-gray-500 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <div className={`${isHidden ? 'hidden': 'flex'} absolute flex-col top-15 gap-3 bg-white border border-black rounded-lg`}>
                            <span className='w-full hover:bg-gray-400 px-5 py-2 rounded-t-lg' onClick={() => {
                                setLanguage("English");
                                setHidden(true);
                            }}>English</span>
                            <span className='w-full hover:bg-gray-400 px-5 py-2 rounded-b-lg' onClick={() => {
                                setLanguage("Hindi");
                                setHidden(true);
                            }}>Hindi</span>
                        </div>
                    </button>

                    <button
                        className="mx-2 cursor-pointer"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>

                    {!user ? (
                        <Link className="mx-2 font-semibold underline text-teal-900" onClick={openModal}>Login</Link>
                    ) : (
                        <button className='flex gap-1 items-center cursor-pointer' onClick={() => setProfileMenu(!profileMenu)}>
                            <span className='px-3 py-1 rounded-3xl text-white bg-green-600 uppercase'>{user.email.split("")[0]}</span>
                            <svg className="w-5 h-5 text-gray-500 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}

                    <ul className={`${!profileMenu && 'hidden'} absolute flex flex-col right-15 top-18 z-100 bg-gray-600 w-[150px] gap-3 py-2 px-3 rounded text-white`} onClick={() => setProfileMenu(!profileMenu)}>
                        <li className='cursor-pointer' onClick={() => {
                            setProfileMenu(!profileMenu);
                            logout();
                        }}>Logout</li>

                    </ul>

                    <Link to="/add-product" className="relative rounded-full bg-gradient-to-r from-yellow-300 via-cyan-400 to-blue-500 p-1 cursor-pointer">
                        <div className="bg-white rounded-full px-4 py-1.5 flex items-center justify-center">
                            <span className="font-bold text-lg mr-1">+</span>
                            <span className="font-bold text-lg tracking-wide">SELL</span>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
