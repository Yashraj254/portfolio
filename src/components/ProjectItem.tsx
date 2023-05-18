import Link from "next/link";
import { title } from "process";
import React, { FC, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import scrollAnimation from "@/utils/scrollAnimation";

interface ProjectItemProps {
  title: string;
  backgroundImg: string;
  tech: string;
  projectUrl: string;
  index: number;
}

export const ProjectItem: FC<ProjectItemProps> = ({
  title,
  backgroundImg,
  tech,
  projectUrl,
  index,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index === 0 || index === 1 || index === 2) {
      scrollAnimation(divRef.current, "left");
    }
    if (index === 3 || index === 4 || index === 5) {
      scrollAnimation(divRef.current, "right");
    }
  }, []);

  return (
    <div
      ref={divRef}
      className=" flex items-center justify-center shadow-xl shadow-bg-color rounded-xl group relative  overflow-hidden"
    >
      <Image
        className="rounded-xl group-hover:opacity-10 group-hover:scale-[1.1]  transition-[0.5s_ease] "
        src={backgroundImg}
        width="1920"
        height="1080"
        alt="/"
        loading="eager"
        priority={true}
      />
      <div className="absolute flex flex-col w-[100%] h-[100%] p-4  justify-center translate-y-[100%] group-hover:translate-y-0 transition-[0.5s_ease]  bg-gradient-to-b from-[rgba(0,0,0,0)] to-main-color">
        <h3 className="text-2xl text-white  text-center font-bold">{title}</h3>
        <p className="pb-4 pt-2 text-white text-center">{tech}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
