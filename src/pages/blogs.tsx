import BlogItem from "@/components/BlogItem";
import scrollAnimation from "@/utils/scrollAnimation";
import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Blog } from "../../type";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const notionSecret = process.env.NOTION_SECRET;
const notionBlogsDatabaseId = process.env.NOTION_BLOGS_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

const fetchFromNotion = async () => {
  if (!notionSecret || !notionBlogsDatabaseId)
    throw new Error("Missing Notion Secret or Database ID");

  const blogsQuery = await notion.databases.query({
    database_id: notionBlogsDatabaseId,
  });

  const allBlogs: Blog[] = [];

  blogsQuery.results.forEach(async (page: any) => {
    // console.log(page.properties.date.rich_text[0]);
    const blog: Blog = {
      title: page.properties.title.title[0].plain_text,
      description: page.properties.description.rich_text[0].plain_text,
      readTime: page.properties.readTime.rich_text[0].plain_text,
      thumbnail: page.properties.thumbnail.url
        .replace("file/d/", "uc?export=view&id=")
        .replace("/view?usp=drive_link", "")
        .replace("/view?usp=sharing", ""),
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
      date: page.properties.date.date.start,
    };
    allBlogs.push(blog);
  });

  return { allBlogs };
};

const AllBlogsPage = (props: any) => {
  const [blogs, setBlogs] = useState<Blog[]>(props.data.allBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(
    props.data.allBlogs
  ); // [
  const [searchTerm, setSearchTerm] = useState("");

  const h1Ref = useRef<HTMLHeadingElement>(null);

  const handleSearch = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filteredItems = blogs.filter((blog) =>
        blog?.title?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBlogs(filteredItems);
    }
  };

  useEffect(() => {
    scrollAnimation(h1Ref.current, "top");
  }, []);
  //   const blogs = data.allBlogs;

  return (
    <div className="w-full min-h-screen p-2  px-8">
      <Head>
        <meta
          name="description"
          content="Programming blogs on android."
        />
      </Head>
      <h1 ref={h1Ref} className="flex py-4 font-bold text-4xl justify-center">
        My &nbsp;<span className="text-main-color">Blogs</span>{" "}
      </h1>
      <input
        type="text"
        className="w-full bg-bg-color border rounded-xl p-2 my-2"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredBlogs.map((blog: Blog, index: number) => (
        <div key={blog.pageId} className="py-2">
          <Link href={"/blogs/" + blog.slug}>
            <BlogItem
              title={blog.title}
              tags={blog.tags}
              readTime={blog.readTime}
              date={blog.date}
              index={index}
              description={blog.description}
              thumbnail={blog.thumbnail}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetchFromNotion();
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

export default AllBlogsPage;
