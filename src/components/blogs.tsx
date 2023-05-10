import React from "react";
import { Blog } from "../../type";
import Link from "next/link";
import BlogItem from "./BlogItem";

const Blogs = (blogs: { data: Blog[] }) => {
  return (
    <section id="blogs" className="w-full min-h-screen p-2 py-16 px-8">
          <h1 className="flex py-4 font-bold text-4xl justify-center">
        My &nbsp;<span className="text-main-color">Blogs</span>{" "}
      </h1>
      {/* <h1> */}
        {/* <div className=" text-center"> */}
          {blogs.data.map((blog: Blog) => (
            <div key={blog.pageId} className="py-2">
              <Link href={"/blogs/" + blog.slug} >
                <BlogItem title={blog.title!!} tags={blog.tags!!} />
              </Link>
              
            </div>
          ))}
        {/* </div> */}
      {/* </h1> */}
    </section>
  );
};

export default Blogs;
