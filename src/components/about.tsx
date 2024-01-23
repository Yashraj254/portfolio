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
        Hello and thank you for visiting my portfolio! I'm an enthusiastic
          Android developer dedicated to crafting intuitive and user-friendly
          mobile applications. My skills have been refined through personal
          projects, relevant courses, open-source contributions, and freelance
          projects providing me with practical experience and keeping me in the
          loop with the latest technologies and industry trends. Let's explore
          the world of Android development together!
          
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
