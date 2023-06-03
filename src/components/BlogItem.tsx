import scrollAnimation from "@/utils/scrollAnimation";
import dayjs from "dayjs";
import { title } from "process";
import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { FaClock } from "react-icons/fa";

interface BlogItemProps {
  title?: string;
  description?: string;
  readTime?: string;
  thumbnail?: string;
  tags?: string[];
  date?: string;
  index?: number;
}

const BlogItem: FC<BlogItemProps> = ({
  title,
  tags,
  readTime,
  date,
  index,
  description,
  thumbnail,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index!! % 2 === 0) {
      scrollAnimation(divRef.current, "left");
    } else {
      scrollAnimation(divRef.current, "right");
    }
  }, [divRef, index]);
  return (
    <div ref={divRef}>
      <div className="border border-white/30 flex flex-col md:flex-row group shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
        <div className="flex flex-col justify-center p-4 md:p-2 md:w-[25%]">
          <Image
            className="rounded-xl"
            src={thumbnail!!}
            width="1920"
            height="1080"
            alt={title!!}
            loading="eager"
            priority={true}
          />
        </div>

        <div className="flex flex-col group justify-between md:py-2 md:px-6 pb-2 px-2 w-full">
          <div>
            <h1 className="md:text-2xl text-lg font-bold leading-6">{title}</h1>
            <br />
            <p className="hidden md:block text-nav-text-color">
              {description}
            </p>
            <div className="flex flex-row flex-wrap gap-2 ">
              {tags!!.map((tag) => (
                <h3 className="text-white/25">#{tag}</h3>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <FaClock />
              &nbsp;{readTime}
            </div>
            <h6>{dayjs(date).format("MMMM DD, YYYY")}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
