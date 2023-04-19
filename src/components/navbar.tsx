import Link from "next/link";
import React, { useState } from "react";
// import menu icon from react-icons
import { Fa500Px, FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
// import AiOutlineMenu from 'react-icons/ai'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed z-[100] w-full ">
      <nav className="hidden md:flex flex-row h-16 font-bold text-lg space-x-10 px-8  justify-end items-center bg-bg-color">
        <Link
          href="#home"
          scroll={false}
          className={
            router.asPath == "/#home"
              ? "text-cyan-400"
              : "hover:text-cyan-400 transition scroll-smooth"
          }
        >
          Home
        </Link>

        <Link
          href="#blogs"
          scroll={false}
          className={
            router.asPath == "/#blogs"
              ? "text-cyan-400"
              : "hover:text-cyan-400 transition scroll-smooth"
          }
        >
          Blogs
        </Link>

        <Link
          href="#projects"
          scroll={false}
          className={
            router.asPath == "/#projects"
              ? "text-cyan-400"
              : "hover:text-cyan-400 transition scroll-smooth"
          }
        >
          Projects
        </Link>
        <Link
          scroll={false}
          href="#skills"
          className={
            router.asPath == "/#skills"
              ? "text-cyan-400"
              : "hover:text-cyan-400 transition scroll-smooth"
          }
        >
          Skills
        </Link>
        <Link
          scroll={false}
          href="#about"
          className={
            router.asPath == "/#about"
              ? "text-cyan-400"
              : "hover:text-cyan-400 transition scroll-smooth"
          }
        >
          About
        </Link>
      </nav>
      <div className="md:hidden flex w-full h-16 fixed px-8  justify-end items-center  cursor-pointer ">
        <AiOutlineMenu size={25} onClick={handleNav} />
      </div>
      <div
        className={
          nav
            ? " md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 "
            : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-bg-color p-10 ease-in duration-500"
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
              href="#home"
              scroll={false}
              className={
                router.asPath == "/#home"
                  ? "text-cyan-400 py-4 "
                  : "hover:text-cyan-400 py-4 transition scroll-smooth"
              }
              onClick={() => setNav(false)}
            >
              Home
            </Link>
            <Link
              href="#blogs"
              scroll={false}
              className={
                router.asPath == "/#blogs"
                  ? "text-cyan-400 py-4 "
                  : "hover:text-cyan-400 py-4 transition scroll-smooth"
              }
              onClick={() => setNav(false)}
            >
              Home
            </Link>

            <Link
              href="#projects"
              scroll={false}
              className={
                router.asPath == "/#projects"
                  ? "text-cyan-400 py-4 "
                  : "hover:text-cyan-400 py-4 transition scroll-smooth"
              }
              onClick={() => setNav(false)}
            >
              Projects
            </Link>
            <Link
              href="#skills"
              scroll={false}
              className={
                router.asPath == "/#skills"
                  ? "text-cyan-400 py-4 "
                  : "hover:text-cyan-400 py-4 transition scroll-smooth"
              }
              onClick={() => setNav(false)}
            >
              Skills
            </Link>

            <Link
              href="#about"
              scroll={false}
              className={
                router.asPath == "/#about"
                  ? "text-cyan-400 py-4 "
                  : "hover:text-cyan-400 py-4 transition scroll-smooth"
              }
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
