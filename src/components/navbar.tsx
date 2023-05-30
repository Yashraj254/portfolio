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
    <div className="h-16 fixed z-[100] w-full ">
      <div className="h-16 bg-bg-color overflow-hidden flex flex-col flex-end justify-center ">
        <nav className="h-16 text-nav-text-color  fixed overflow-hidden z-[1] w-full   hidden md:flex flex-row  font-bold text-lg space-x-10 px-8 justify-center items-center ">
          <Link
            className="hover:cursor-pointer flex flex-col justify-center "
            activeStyle={{ color: "white" }}
            to="home"
            smooth={true}
            spy={true}
            duration={100}
          >
            Home
          </Link>

          <div >
            <Link
              className="h-16 hover:text-cyan-400 hover:cursor-pointer  flex flex-col justify-end bg-[radial-gradient(ellipse_nearest-corner_at_100%_250%,#3c84cc_0%,#315dc2_80%,#4e95d3_80%)]"
              activeStyle={{ color: "white" }}
              to="blogs"
              smooth={true}
              spy={true}
              duration={100}
            >
              {/* <div className="flex flex-col justify-end"> */}
                Blogs

              {/* </div> */}
            </Link>
            <div className="flex-none z-[0]  h-10 w-full  rounded-[200%] bg-[radial-gradient(ellipse_closest-side,rgb(255,255,255,0.7)_5%,#0C1033)] mx-auto "></div>

          </div>

          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeStyle={{ color: "white" }}
            to="projects"
            smooth={true}
            spy={true}
            duration={100}
          >
            Projects
          </Link>
          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeStyle={{ color: "white" }}
            to="skills"
            smooth={true}
            spy={true}
            duration={100}
          >
            Skills
          </Link>
          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeStyle={{ color: "white" }}
            to="about"
            smooth={true}
            spy={true}
            duration={100}
          >
            About
          </Link>
        </nav>
        <div className=" h-4 z-[4] mt-14 align-bottom bg-[radial-gradient(ellipse_closest-side,rgb(128,21,167,0.7)_5%,rgb(128,21,167,0.7)_5%,#0C1033,#0C1033)] bg-opacity-10" />
      </div>
      <div className="md:hidden flex w-full filter  p-8  justify-end items-center  cursor-pointer ">
        <AiOutlineMenu size={25} onClick={handleNav} />
      </div>
      <div
        className={
          nav ? " md:hidden fixed left-0 top-0 w-full h-full bg-black/70 " : ""
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
