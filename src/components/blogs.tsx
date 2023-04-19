import React from "react";
import { Blog } from "../../type";
import Link from "next/link";

const Blogs = (blogs: { data: Blog[] }) => {
  return (
    <section id="blogs" className="w-full min-h-screen p-2 py-16 px-8">
      <h1>
        <div className=" text-center">
          {blogs.data.map((blog: Blog) => (
            <div key={blog.pageId}>
              <Link href={"/blogs/" + blog.slug}>
                <h1>{blog.title}</h1>
              </Link>
              <p>{blog.tags}</p>
            </div>
          ))}
        </div>
      </h1>
    </section>
  );
};

export default Blogs;
