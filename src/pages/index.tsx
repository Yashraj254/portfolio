import About from "@/components/about";
import Blogs from "@/components/blogs";
import HomePage from "@/components/home";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { Client } from "@notionhq/client";
import { GetStaticProps, Metadata } from "next";
import Head from "next/head";
import { useState } from "react";
import { Blog, Project } from "../../type";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Yashraj Singh",
  description: "Yashraj Singh's Portfolio",
};

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
      status: page.properties.status.status.name,
      date: page.properties.date.date.start,
    };
    if (blog.status == "Published") allBlogs.push(blog);
  });

  projectsQuery.results.forEach(async (page: any) => {

    const project: Project = {
      title: page.properties.title.title[0].plain_text,
      sourceCode: page.properties.source_code.url,
      banner: page.properties.banner.url
        .replace("file/d/", "uc?export=view&id=")
        .replace("/view?usp=drive_link", "")
        .replace("/view?usp=sharing", ""),
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
  const [blogs] = useState<Blog[]>(props.data.allBlogs);
  const [projects] = useState<Project[]>(props.data.allProjects);

  return (
    <div>
      <Head>
        <title>Yashraj Singh Jadon</title>
        <link rel="icon" href="/images/my_profile_image.png" sizes="any" />

        <meta name="title" content="Portfolio | Yashraj Singh Jadon" />
        <meta name="description" content="Yashraj Singh Jadon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yash-raj.com" />
        <meta property="og:title" content="Portfolio | Yashraj Singh Jadon" />
        <meta property="og:site_name" content="Yashraj Singh Jadon" />
        <meta property="og:description" content="Yashraj Singh Jadon" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Yashraj Singh Jadon" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
      </Head>
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
