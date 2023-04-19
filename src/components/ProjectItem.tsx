import Link from "next/link";
import { title } from "process";
import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface ProjectItemProps {
  title: string;
  backgroundImg: StaticImageData;
  tech: string;
  projectUrl: string;
}

export const ProjectItem: FC<ProjectItemProps> = ({
  title,
  backgroundImg,
  tech,
  projectUrl,
}) => {
  return (
    <div className=" flex items-center justify-center shadow-xl shadow-bg-color rounded-xl group relative  overflow-hidden">
      <Image
        className="rounded-xl group-hover:opacity-10 hover:scale-[1.1]  transition-[0.5s_ease] "
        src={backgroundImg}
        alt="/"
      />
      <div className="absolute flex flex-col w-[100%] h-[100%] p-4  justify-center translate-y-[100%] group-hover:translate-y-0 transition-[0.5s_ease]  bg-gradient-to-b from-[rgba(0,0,0,0)] to-main-color">
        <h3 className="text-2xl text-white  text-center font-bold">{title}</h3>
        <p className="pb-4 pt-2 text-white text-center">{tech}</p>
        {/* <Link href="">
            <p className='text-center py-1 rounded-lg bg-white text-gray-700 font-bold text-sm cursor-pointer'>More Info</p>
        </Link> */}
      </div>
    </div>
  );
};

export default ProjectItem;
