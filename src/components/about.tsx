import Link from "next/link";
import React, { FC, useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import BackgroundAnimation from "./bgAnimation";
import Image from "next/image";
import profile_image from "../images/profile_image.png";
// import { scrollAnimation } from "@/utils/scrollAnimation";
import { Props } from "./main";

const About = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // console.log("nope", h1Ref);

    if (h1Ref.current !== undefined) {
      //  console.log('hello', h1Ref.current, divRef.current)
      try {
        // scrollAnimation(divRef.current, "left");
        // scrollAnimation(h1Ref.current, "top");
        // scrollAnimation(imgRef.current, "right");
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, []);
  return (
    <section id="about" className=" flex flex-col md:flex-row w-full min-h-screen bg-secondary-bg-color p-2 py-16 px-8">
      <div ref={divRef} className="flex flex-col ml-20 mr-10 justify-center p-2 py-16">
        <h1 ref={h1Ref} className="font-bold text-4xl leading-10 ">
          About <span className="text-main-color">Me</span>
        </h1>
        <h3 className=" font-bold text-2xl leading-10">
          <span>Android Developer</span>
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          ipsum harum vero obcaecati repellendus porro ullam sed molestias
          iusto, quos illo dicta odit error voluptate nostrum assumenda facere
          libero neque.
        </p>
      </div>

      <div className="flex flex-col w-[90%] justify-center mx-20 ">
        {/* <BackgroundAnimation /> */}

        <Image
          ref={imgRef}
          src={profile_image}
          alt="me"
          height="500"
          className=" mr-16 animate-[floatImage_ease-in-out_4s_infinite] "
        />
      </div>
    </section>
  );
};

export default About;
