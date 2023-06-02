import React, { useEffect, useRef } from "react";
import { Blog } from "../../type";
import Link from "next/link";
import BlogItem from "./BlogItem";
import scrollAnimation from "@/utils/scrollAnimation";

const Blogs = (blogs: { data: Blog[] }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    scrollAnimation(h1Ref.current, "top");

  }, []);
  return (
    <section id="blogs" className="w-full mt-2 min-h-screen p-2 py-16 px-8">
      <h1 ref={h1Ref} className="flex py-4 font-bold text-4xl justify-center">
        My &nbsp;<span className="text-main-color">Blogs</span>{" "}
      </h1>
      {blogs.data.map((blog: Blog,index:number) => (
        <div key={blog.pageId} className="py-2 ">
          <Link href={"/blogs/" + blog.slug}>
            <BlogItem
              title={blog.title!!}
              tags={blog.tags!!}
              readTime={blog.readTime!!}
              date={blog.date!!}
              index={index}
              description={blog.description!!}
              thumbnail={blog.thumbnail!!}
            />
          </Link>
        </div>
      ))}
      <Link className="hover:text-main-color" href={"/allBlogs"}>
      <h5 className="flex flex-row justify-center">Show All &gt;&gt;</h5>
      </Link>
      
    </section>
  );
};

export default Blogs;
