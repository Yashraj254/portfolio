import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
// import BackgroundAnimation
import "boxicons/css/boxicons.min.css";
import { RefObject, useEffect, useRef } from "react";
import BackgroundAnimation from "./bgAnimation";
import Typed from "typed.js";
import scrollAnimation from "@/utils/scrollAnimation";
import Image from "next/image";
import projects_image from "../images/projects_image.png";
import projects_banner from "../images/projects_banner.png";

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
      strings: ["Android Developer", "Web Developer", "Blogger"],
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
    <section id="home" className="flex flex-row w-full h-screen py-4">
      <div
        
        className="flex flex-col w-[50%] ml-16 mr-10 justify-center "
      >
        <h3 ref={h3Ref} className="font-bold text-2xl leading-10 ">Hello,It's Me</h3>
        <h1 ref={h1Ref} className=" font-bold text-4xl leading-10">
          Yashraj Singh
        </h1>
        <h3 ref={titleRef} className="font-bold text-2xl leading-10">
          And I'm a <span ref={spanRef} className="text-main-color"></span>
        </h3>
        <p ref={pRef}>
          "Hello and welcome to my portfolio! I am a passionate Android
          developer with a focus on creating intuitive and user-friendly mobile
          applications. I have honed my skills through personal projects and
          courses, which have allowed me to gain practical experience and stay
          up-to-date with the latest technologies and trends in the industry.
        </p>

        <div ref={pRef} className="flex  px-10 py-5 space-x-5 text-3xl ">
          <Link
            href="/projects"
            className="border-2 border-main-color hover:bg-main-color text-main-color hover:text-secondary-bg-color h-8 w-8 flex items-center  rounded-[50%] p-1  hover:shadow-[0_0_1rem]  hover:shadow-main-color"
          >
            <FaGithub />
          </Link>
          <Link
            href="/projects"
            className="border-2 border-main-color hover:bg-main-color text-main-color hover:text-secondary-bg-color h-8 w-8 flex items-center  rounded-[50%] p-2  hover:shadow-[0_0_1rem]  hover:shadow-main-color"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="/projects"
            className="border-2 border-main-color hover:bg-main-color text-main-color hover:text-secondary-bg-color h-8 w-8 flex items-center  rounded-[50%] p-1  hover:shadow-[0_0_1rem]  hover:shadow-main-color"
          >
            <FaTwitter />
          </Link>
        </div>
      </div>

      <div ref={imageRef} className="md:flex flex-col w-[50%] justify-center mr-10">
      {/* <BackgroundAnimation /> */}
      <Image
        className="md:flex flex-col justify-center "
        src={projects_banner}
        alt="My Projects"       
      />
      </div>
    </section>
  );
};

export default HomePage;
