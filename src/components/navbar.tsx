import { useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed z-[100] w-full ">
      <div className="text-white/50 bg-bg-color  flex flex-col flex-end justify-center">
        <nav className="h-14 fixed z-[1] w-full   hidden md:flex flex-row  font-bold text-lg space-x-10 px-8  justify-center items-center bg-bg-color">
          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeClass="glowWhite"
            to="home"
            smooth={true}
            spy={true}
            duration={100}
          >
            Home
          </Link>

          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeClass="glowWhite"
            to="blogs"
            smooth={true}
            spy={true}
            duration={100}
          >
            Blogs
          </Link>

          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeClass="glowWhite"
            to="projects"
            smooth={true}
            spy={true}
            duration={100}
          >
            Projects
          </Link>
          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeClass="glowWhite"
            to="skills"
            smooth={true}
            spy={true}
            duration={100}
          >
            Skills
          </Link>
          <Link
            className="hover:text-cyan-400 hover:cursor-pointer"
            activeClass="glowWhite"
            to="about"
            smooth={true}
            spy={true}
            duration={100}
          >
            About
          </Link>
        </nav>
        <div className=" h-2 z-[4] mt-16 align-bottom bg-[radial-gradient(ellipse_closest-side,rgb(0,238,255,0.7)_5%,rgb(0,238,255,0.7)_5%,#1f242d,#1f242d)] bg-opacity-10" />
        <div className="md:hidden fixed flex w-full   p-8  justify-between items-center  cursor-pointer ">
          <span className="text-xl font-bold glow">Yashraj Singh Jadon</span>
          <AiOutlineMenu size={25} onClick={handleNav} />
        </div>
      </div>

      <div
        className={
          nav
            ? "z-10 md:hidden fixed left-0 top-0 w-full h-full bg-black/70 "
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
            <h1 className="text-2xl font-bold">Yashraj Singh Jadon</h1>

            <AiOutlineClose
              color="#13ADC7"
              size={"1.5rem"}
              className="rounded stroke-[8px] shadow-lg shadow-bg-color  cursor-pointer"
              onClick={handleNav}
            />
          </div>
          <div className="py-4 flex flex-col w-full items-start">
            <Link
              className="hover:text-cyan-400 hover:cursor-pointer p-2 text-lg"
              activeClass="glowWhite"
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
              activeClass="glowWhite"
              to="blogs"
              smooth={true}
              spy={true}
              duration={100}
              onClick={() => setNav(false)}
            >
              Blogs
            </Link>

            <Link
              className="hover:text-cyan-400 hover:cursor-pointer p-2 text-lg"
              activeClass="glowWhite"
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
              activeClass="glowWhite"
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
              activeClass="glowWhite"
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
