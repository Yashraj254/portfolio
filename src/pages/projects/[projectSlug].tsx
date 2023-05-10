
import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import { NotionToMarkdown } from "notion-to-md";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

import { remark } from "remark";
import html from "remark-html";
import { Project } from "../../../type";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

const notion = new Client({ auth: notionSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });

const convertToHTML = async (mdString: string) => {
  const processedContent = await remark().use(html).process(mdString);
//   let htmlContent = processedContent
//     .toString()
//     .replaceAll("</pre>", `<button>COPY</button></pre>`);
  return processedContent.toString();
};

const fetchFromNotion = async () => {
  if (!notionSecret || !notionDatabaseId)
    throw new Error("Missing Notion Secret or Database ID");
  const query = await notion.databases.query({
    database_id: notionDatabaseId,
  });
  const allProjects: Project[] = [];

  query.results.forEach(async (page: any) => {

    const project: Project = {
      title: page.properties.title.title[0].plain_text,
      tech: page.properties.tech.rich_text[0].plain_text,
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
    };
    allProjects.push(project);
  });
  // console.log("allProjects", allProjects);

  return allProjects;
};

const ProjectPage = (props: any) => { 
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

export default ProjectPage;

export const getStaticPaths = async () => {
  const data = await fetchFromNotion();
  const paths = data.map((project: Project) => {
    return {
      params: { projectSlug: project.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = (context.params as ParsedUrlQuery).projectSlug;
  const data = await fetchFromNotion();
  const project = data.find((project: Project) => project.slug === slug);
  const mdblocks = await n2m.pageToMarkdown(project?.pageId as string);
  const mdString = n2m.toMarkdownString(mdblocks);
  // console.log("Project1", data,slug, Project);
  const htmlContent = await convertToHTML(mdString);
  // console.log("htmlContent", htmlContent);
  return {
    props: {
      project,
      htmlContent,
    },
  };
};
