import Image from "next/image";
import { useEffect, useRef } from "react";
import my_profile_image from "../../public/images/my_profile_image.png";
import scrollAnimation from "@/utils/scrollAnimation";

const About = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {

    if (h1Ref.current !== undefined) {
      try {
        scrollAnimation(divRef.current, "left");
        scrollAnimation(h1Ref.current, "top");
        scrollAnimation(imgRef.current, "right");
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, []);
  return (
    <section
      id="about"
      className=" flex flex-col md:flex-row w-full  min-h-screen p-2 py-16 px-8"
    >
      <div
        ref={divRef}
        className="flex flex-col md:ml-20 md:mr-10 justify-center p-2 py-16"
      >
        <h1 ref={h1Ref} className="font-bold text-4xl leading-10 ">
          About <span className="text-main-color">Me</span>
        </h1>
        <h3 className=" font-bold text-2xl leading-10">
          <span>Android Developer</span>
        </h3>
        <p className="text-white/70 floatImage">
          "Hello and welcome to my portfolio! I am a passionate Android
          developer with a focus on creating intuitive and user-friendly mobile
          applications. I have honed my skills through open source projects and
          courses, which have allowed me to gain practical experience and stay
          up-to-date with the latest technologies and trends in the industry.
          
        </p>
      </div>

      <div className="flex flex-col w-[100%] justify-center md:mx-20 ">
        {/* <BackgroundAnimation /> */}

        <Image
          ref={imgRef}
          src={my_profile_image}
          alt="me"
          className="floatImage mr-16 animate-[floatImage_ease-in-out_4s_infinite]"
        />
      </div>
    </section>
  );
};

export default About;
