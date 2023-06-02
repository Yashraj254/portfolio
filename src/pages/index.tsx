import About from "@/components/about";
import HomePage from "@/components/home";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Blogs from "@/components/blogs";
import { GetStaticProps } from "next";
import { Blog, Project } from "../../type";
import { Client } from "@notionhq/client";
import { useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const notionSecret = process.env.NOTION_SECRET;
const notionBlogsDatabaseId = process.env.NOTION_BLOGS_DATABASE_ID;
const notionProjectsDatabaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

const fetchFromNotion = async () => {
  if (!notionSecret || !notionBlogsDatabaseId || !notionProjectsDatabaseId)
    throw new Error("Missing Notion Secret or Database ID");

  const blogsQuery = await notion.databases.query({
    database_id: notionBlogsDatabaseId,
  });

  const projectsQuery = await notion.databases.query({
    database_id: notionProjectsDatabaseId,
  });

  const allBlogs: Blog[] = [];
  const allProjects: Project[] = [];

  blogsQuery.results.forEach(async (page: any) => {
    // console.log(page.properties.date.rich_text[0]);
    const blog: Blog = {
      title: page.properties.title.title[0].plain_text,
      description: page.properties.description.rich_text[0].plain_text,
      readTime: page.properties.readTime.rich_text[0].plain_text,
      thumbnail: page.properties.thumbnail.files[0].file.url,
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
      date: page.properties.date.date.start,
    };
    allBlogs.push(blog);
  });

  projectsQuery.results.forEach(async (page: any) => {
    // console.log(page.properties.banner.files[0]);

    const project: Project = {
      title: page.properties.title.title[0].plain_text,
      sourceCode: page.properties.source_code.url,
      banner: page.properties.banner.files[0].file.url,
      tech: page.properties.tech.rich_text[0].plain_text,
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
    };
    allProjects.push(project);
  });

  return { allBlogs, allProjects };
};

export default function Home(props: any) {
  const [blogs, setBlogs] = useState<Blog[]>(props.data.allBlogs);
  const [projects, setProjects] = useState<Blog[]>(props.data.allProjects);

  return (
    <div >
      <Navbar />
      <HomePage />
      <Blogs data={blogs} />
      <Projects data={projects} />
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
    revalidate: 60,
  };
};
