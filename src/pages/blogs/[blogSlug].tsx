import CodeItem from "@/components/CodeItem";
import { Client } from "@notionhq/client";
import dayjs from "dayjs";
import Markdown from "markdown-to-jsx";
import { GetStaticProps } from "next";
import Image from "next/image";
import { NotionToMarkdown } from "notion-to-md";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { remark } from "remark";
import html from "remark-html";
import { Blog } from "../../../type";
import Head from "next/head";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_BLOGS_DATABASE_ID;

const notion = new Client({ auth: notionSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });

const convertToHTML = async (mdString: string) => {
  const processedContent = await remark().use(html).process(mdString);
  let htmlContent = processedContent.toString().replaceAll("&#x3C;", "<");
  // .replaceAll("</pre>", `<button>COPY</button></pre></container>`)
  // .replaceAll("<pre>", `<container><pre>`);
  // console.log("htmlContent", htmlContent);
  return htmlContent;
};

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

  return allBlogs;
};

const BlogPage = (props: any) => {
  const [data, setData] = useState(props);
  let htmlContent: string = data.htmlContent.toString();

  return (
    <div
      className=" px-6 prose prose-xl prose-zinc prose-p:text-white 
     prose-code:bg-code-bg prose-code:before:content-none
     prose-code:after:content-none prose-code:p-1 prose-code:rounded-md container  max-w-none mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4"
    >
      <Head>
        <title>{data.blog.title}</title>
        <meta name="description" content={data.blog.description} />
      </Head>
      <div className="flex flex-col w-full">
        <Image
          className="rounded-3xl m-0 mt-4"
          src={data.blog.thumbnail}
          alt={data.blog.title}
          width={1920}
          height={1080}
          loading="lazy"
        />
        <div className="text-white flex flex-row w-full justify-between">
          <div className="flex flex-row items-center">
            <FaClock />
            &nbsp;{data.blog.readTime}
          </div>
          <h6>{dayjs(data.blog.date).format("MMMM DD, YYYY")}</h6>
        </div>
        <div className="flex flex-row flex-wrap w-full gap-2 leading-3">
          {data.blog.tags!!.map((tag: any) => (
            <h5 className="text-white/25">#{tag}</h5>
          ))}
        </div>
      </div>
      <Markdown
        options={{
          overrides: {
            code: {
              component: CodeItem,
              props: {
                language: "kotlin",
              },
            },
          },
        }}
      >
        {htmlContent}
      </Markdown>
    </div>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const data = await fetchFromNotion();
  const paths = data.map((blog: Blog) => {
    return {
      params: { blogSlug: blog.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = (context.params as ParsedUrlQuery).blogSlug;
  const data = await fetchFromNotion();
  const blog = data.find((blog: Blog) => blog.slug === slug);
  const mdblocks = await n2m.pageToMarkdown(blog?.pageId as string);
  const mdString = n2m.toMarkdownString(mdblocks);
  const htmlContent = await convertToHTML(mdString.parent as string);
  return {
    props: {
      blog,
      htmlContent,
    },
    revalidate: 60,
  };
};
