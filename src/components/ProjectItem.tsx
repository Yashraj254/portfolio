import Link from "next/link";
import { title } from "process";
import React, { FC, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import scrollAnimation from "@/utils/scrollAnimation";

interface ProjectItemProps {
  title: string;
  sourceCode: string;
  tags: string[];
  backgroundImg: string;
  tech: string;
  projectUrl: string;
  index: number;
}

export const ProjectItem: FC<ProjectItemProps> = ({
  title,
  sourceCode,
  tags,
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
    <div ref={divRef}>
      <div className="projectItem flex flex-col hover:scale-[1.2] ease-out duration-300">
        <Link href={"/projects/" + projectUrl}>
          <Image
            className="rounded-t-xl  "
            src={backgroundImg}
            width="1920"
            height="1080"
            alt={title}
            loading="eager"
            priority={true}
          />
          <div className="w-full bg-bg-color bg-gradient-to-b from-[rgb(0,238,255,0.1)] from-10% to-[rgb(0,238,255,0.0)] ">
            <div className="flex flex-row flex-wrap gap-x-2">
              {tags.map((tag) => (
                <h3 className="text-white/25">#{tag}</h3>
              ))}
            </div>
          </div>
        </Link>
        <div className="py-2 rounded-b-2xl bg-bg-color/90  hiddenItems  flex-col justify-center items-center w-full gap-2">
          <div className=" h-2 z-[4] w-full bg-[radial-gradient(ellipse_closest-side,rgb(0,238,255,0.7)_5%,rgb(0,238,255,0.7)_5%,#1f242d,#1f242d)] bg-opacity-10" />
          <Link
            className="bg-gradient-to-b glowOnHover w-full flex flex-row justify-center"
            href={"/projects/" + projectUrl}
          >
            Read More
          </Link>
          <div className="h-2 z-[4] w-full bg-[radial-gradient(ellipse_closest-side,rgb(0,238,255,0.7)_5%,rgb(0,238,255,0.7)_5%,#1f242d,#1f242d)] bg-opacity-10" />
          <Link
            className="bg-gradient-to-b glowOnHover  w-full flex flex-row justify-center"
            href={sourceCode}
          >
            Source Code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
