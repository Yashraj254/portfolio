
import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import { NotionToMarkdown } from "notion-to-md";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

import { remark } from "remark";
import html from "remark-html";
import { Blog } from "../../../type";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });

const convertToHTML = async (mdString: string) => {
  const processedContent = await remark().use(html).process(mdString);
  let htmlContent = processedContent
    .toString()
    .replaceAll("</pre>", `<button>COPY</button></pre>`);
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
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
    };
    allBlogs.push(blog);
  });
  // console.log("allBlogs", allBlogs);

  return allBlogs;
};

const BlogPage = (props: any) => { 
  const [data, setData] = useState(props);
  const htmlContent = data.htmlContent;
  // console.log("htmlContent", htmlContent);

  return (
    <main
      className="px-6 prose prose-xl prose-zinc prose-p:text-white 
     prose-code:bg-code-bg prose-code:before:content-none
     prose-code:after:content-none prose-code:p-1 prose-code:rounded-md mx-auto "
    >
      <section dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const data = await fetchFromNotion();
  const paths = data.map((blog: Blog) => {
    return {
      params: { slug: blog.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = (context.params as ParsedUrlQuery).slug;
  const data = await fetchFromNotion();
  const blog = data.find((blog: Blog) => blog.slug === slug);
  const mdblocks = await n2m.pageToMarkdown(blog?.pageId as string);
  const mdString = n2m.toMarkdownString(mdblocks);
  // console.log("blog1", data,slug, blog);
  const htmlContent = await convertToHTML(mdString);
  // console.log("htmlContent", htmlContent);
  return {
    props: {
      blog,
      htmlContent,
    },
  };
};
