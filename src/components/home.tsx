import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import scrollAnimation from "@/utils/scrollAnimation";
import "boxicons/css/boxicons.min.css";
import Image from "next/image";
import { RefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import projects_banner from "../../public/images/projects_banner.png";
import { Metadata } from "next";
import Head from "next/head";

export interface Props {
  divRef: RefObject<HTMLDivElement>;
  h1Ref: RefObject<HTMLHeadingElement>;
}

const HomePage = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typed = new Typed(spanRef.current, {
      strings: ["Android Developer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });

    try {
      scrollAnimation(divRef?.current, "top");
      scrollAnimation(h1Ref?.current, "left");
      scrollAnimation(h3Ref?.current, "top");
      scrollAnimation(titleRef?.current, "right");
      scrollAnimation(pRef?.current, "bottom");
      scrollAnimation(imageRef?.current, "right");
    } catch (error) {
      console.log("Error", error);
    }

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col md:flex-row w-full min-h-screen py-20 px-8"
    >
      <div className="flex flex-col md:w-[50%] md:mr-8 justify-center ">
        <h3 ref={h3Ref} className="font-bold text-xl leading-10 ">
          Hello, It's Me
        </h3>
        <h1 ref={h1Ref} className=" font-bold text-3xl leading-10">
          Yashraj Singh Jadon
        </h1>
        <h3 ref={titleRef} className="font-bold text-xl leading-10">
          And I'm a <span ref={spanRef} className="glow "></span>
        </h3>
        <p ref={pRef} className="text-white/70">
          I'm an Android developer dedicated to crafting intuitive and
          user-friendly mobile applications. Drawing from hands-on experiences
          in personal, freelance, and open-source projects, I bring a practical
          approach to stay current with the latest trends in Android
          development.
        </p>

        <div ref={pRef} className="flex  px-10 py-5 space-x-5 text-3xl ">
          <Link
            href="https://github.com/Yashraj254"
            className=" border-2 border-main-color hover:bg-main-color text-main-color hover:text-secondary-bg-color h-8 w-8 flex items-center  rounded-[50%] p-1  hover:shadow-[0_0_1rem]  hover:shadow-main-color"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/yashraj-singh-47734b179/"
            className="border-2 border-main-color hover:bg-main-color text-main-color hover:text-secondary-bg-color h-8 w-8 flex items-center  rounded-[50%] p-2  hover:shadow-[0_0_1rem]  hover:shadow-main-color"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="https://x.com/Yashraj_254?t=xtuvJc-lExnXaw-JK7XxDg&s=09"
            className="border-2 border-main-color hover:bg-main-color text-main-color hover:text-secondary-bg-color h-8 w-8 flex items-center  rounded-[50%] p-1  hover:shadow-[0_0_1rem]  hover:shadow-main-color"
          >
            <FaTwitter />
          </Link>
        </div>
      </div>

      <div
        ref={imageRef}
        className="md:flex flex-col md:w-[50%] justify-center "
      >
        {/* <BackgroundAnimation /> */}
        <Image
          className="md:flex flex-col justify-center "
          src={projects_banner}
          alt="My Projects"
          priority
        />
      </div>
    </section>
  );
};

export default HomePage;
