import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useSelector } from "react-redux";
import image from '../../../public/assets/images/icons/logo.png';
const Header = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
console.log("Logged User",loggedUser)
  return (
    <header className="sticky top-0 z-10 bg-slate-100">
      <nav className="flex md:flex-row justify-between items-center py-2 px-4 md:px-12">
        <div className="nav-logo flex items-center gap-2 md:mb-0 transition-all duration-300 transform md:transform-none">
          <img className="h-8" src="/assets/images/icons/logo.png" alt="Travel Connect Logo" />
          <h1 className="font-semibold">Travel <br/> Connect</h1>
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <RxHamburgerMenu className="text-orange-600 font-semibold text-2xl" />
          </button>
        </div>

        <div className={`nav-links mb-4 md:mb-0 ${isMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 sm:top-0 left-0 w-full md:w-auto bg-slate-100 md:bg-transparent transition-all duration-300 ease-in-out py-5 px-7`}>
          <ul className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 md:items-center">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/destinations" onClick={closeMenu}>Destinations</Link></li>
            <li><Link to="/packages" onClick={closeMenu}>Packages</Link></li>
            <li>
              {loggedUser ? (
                <Link to="/profile">
                <img className='h-9 rounded-full' src={loggedUser?.profileImg}/>
                </Link>
              ): (<Link to="/signin" onClick={closeMenu}><button className="login-btn">Login</button></Link>)}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
