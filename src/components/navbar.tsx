// import Link from "next/link";
import { useState } from "react";
import { Link } from "react-scroll";
// import menu icon from react-icons
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import AiOutlineMenu from 'react-icons/ai'

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed z-[100] w-full ">
      <nav className="hidden md:flex flex-row h-16 font-bold text-lg space-x-10 px-8  justify-end items-center bg-bg-color">
        <Link       
          className="hover:text-cyan-400 hover:cursor-pointer"
          activeClass="text-cyan-400"
          to="home"
          smooth={true}
          spy={true}
          duration={100}
        >
          Home
        </Link>

        <Link
          className="hover:text-cyan-400 hover:cursor-pointer"
          activeClass="text-cyan-400"
          to="blogs"
          smooth={true}
          spy={true}
          duration={100}
        >
          Blogs
        </Link>

        <Link
          className="hover:text-cyan-400 hover:cursor-pointer"
          activeClass="text-cyan-400"
          to="projects"
          smooth={true}
          spy={true}
          duration={100}
        >
          Projects
        </Link>
        <Link
          className="hover:text-cyan-400 hover:cursor-pointer"
          activeClass="text-cyan-400"
          to="skills"
          smooth={true}
          spy={true}
          duration={100}
        >
          Skills
        </Link>
        <Link
          className="hover:text-cyan-400 hover:cursor-pointer"
          activeClass="text-cyan-400"
          to="about"
          smooth={true}
          spy={true}
          duration={100}
        >
          About
        </Link>
      </nav>
      <div className="md:hidden flex w-full   p-8  justify-end items-center  cursor-pointer ">
        <AiOutlineMenu size={25} onClick={handleNav} />
      </div>
      <div
        className={
          nav
            ? " md:hidden fixed left-0 top-0 w-full h-full bg-black/70 "
            : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-full bg-bg-color p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 h-screen ease-in duration-500"
          }
        >
          <div className="flex flex-row justify-between items-center w-full h-8">
            <h1 className="text-2xl font-bold">Portfolio</h1>

            <AiOutlineClose
              color="#13ADC7"
              size={"1.5rem"}
              className="rounded stroke-[8px] shadow-lg shadow-bg-color  cursor-pointer"
              onClick={handleNav}
            />
          </div>
          <div className="py-4 flex flex-col">
           
            <Link
              className="hover:text-cyan-400 hover:cursor-pointer p-2 text-lg"
              activeClass="text-cyan-400"
              to="home"
              smooth={true}
              spy={true}
              duration={100}
              onClick={() => setNav(false)}
            >
              Home
            </Link>

            <Link
              className="hover:text-cyan-400 hover:cursor-pointer p-2 text-lg"
              activeClass="text-cyan-400"
              to="projects"
              smooth={true}
              spy={true}
              duration={100}
              onClick={() => setNav(false)}
            >
              Projects
            </Link>
            <Link
              className="hover:text-cyan-400 hover:cursor-pointer p-2 text-lg"
              activeClass="text-cyan-400"
              to="skills"
              smooth={true}
              spy={true}
              duration={100}
              onClick={() => setNav(false)}
            >
              Skills
            </Link>

            <Link
              className="hover:text-cyan-400 hover:cursor-pointer p-2 text-lg"
              activeClass="text-cyan-400"
              to="about"
              smooth={true}
              spy={true}
              duration={100}
              onClick={() => setNav(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
