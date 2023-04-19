import About from "@/components/about";
import HomePage from "@/components/main";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Blogs from "@/components/blogs";
import { GetStaticProps } from "next";
import { Blog } from "../../type";
import { Client } from "@notionhq/client";
import { useState } from "react";


const inter = Inter({ subsets: ["latin"] });

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });


const fetchFromNotion = async () => {
  if (!notionSecret || !notionDatabaseId)
    throw new Error("Missing Notion Secret or Database ID");
  const query = await notion.databases.query({
    database_id: notionDatabaseId,
  });
  const allBlogs: Blog[] = [];

  query.results.forEach(async (page: any) => {


    const blog: Blog = {
      title: page.properties.title.title[0].plain_text,
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
    };
    allBlogs.push(blog);
  });

 
  return allBlogs;
};

export default function Home(props: any) {
  const [data, setData] = useState<Blog[]>(props.data);

  return (
    <div>
      <Navbar />
      <HomePage />
      <Blogs data={data} />
      <Projects />
      <Skills />
      <About />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetchFromNotion();
  return {
    props: {
      data,
    },
  };
};