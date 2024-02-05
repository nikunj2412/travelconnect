import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-100 pt-4 pb-8 xl:pt-8">
      <div className="flex flex-col md:flex-row max-w-screen-lg px-4 mx-auto xl:max-w-screen-xl md:pb-4 justify-between">
        <div className="nav-logo flex items-center gap-2">
          <img
            className="h-8"
            src="public/assets/images/icons/logo.png"
            alt="Travel Connect Logo"
          />
          <h1 className="font-semibold">
            Travel <br /> Connect
          </h1>
        </div>
        <form className="flex flex-col w-full  items-center justify-center sm:w-3/4 max-w-sm md:flex-row md:w-full md:space-x-3">
          <div className=" relative w-full">
            <input
              type="text"
              id='"form-subscribe-Subscribe'
              className=" rounded-lg border-transparent flex-1 md:max-w-max my-4 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Your Email"
            />
          </div>
          <button
            className="flex-shrink-0 w-full  px-4 py-2 md:max-w-max text-base font-semibold text-white bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
        <hr className="mb-4 max-w-screen-lg mx-auto text-gray-400"/>
      <div className="max-w-screen-lg px-4 mx-auto xl:max-w-screen-xl sm:px-6 md:px-8">
        <ul className="flex flex-wrap justify-center pb-6 text-lg font-light">
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div className="text-center">
              <h2 className="mb-4 font-medium">About</h2>
              <ul>
                <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                  <a href="#">About Us</a>
                </li>
                <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                  <a href="#">Features</a>
                </li>
                <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div className="text-center">
              <h2 className="text-md font-medium mb-4">Company</h2>
              <ul>
                <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                  <a href="#">Our Team</a>
                </li>
                <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                  <a href="#">FAQ</a>
                </li>
                <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div className="text-center">
              <h2 className=" text-md font-medium mb-4">Social Media</h2>
              <ul className="flex justify-center gap-3">
                <li className="mb-4 text-orange-600">
                  <a href="#">
                    <FaInstagram />
                  </a>
                </li>
                <li className="mb-4 text-orange-600">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                </li>
                <li className="mb-4 text-orange-600">
                  <a href="#">
                    <FaTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="text-center font-light flex items-center justify-center">
          Created by TravelConnect
        </div>
      </div>
    </footer>
  );
};

export default Footer;
