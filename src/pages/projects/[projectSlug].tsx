import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
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
      description: page.properties.description.rich_text[0].plain_text,
      banner: page.properties.banner.url
        .replace("file/d/", "uc?export=view&id=")
        .replace("/view?usp=drive_link", "")
        .replace("/view?usp=sharing", ""),
      tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
      pageId: page.id,
      slug: page.properties.slug.rich_text[0].plain_text,
    };
    allProjects.push(project);
  });

  return allProjects;
};


const ProjectPage = (props: any) => {
  const [data, setData] = useState(props);
  const htmlContent = data.htmlContent;
  const tags = data.project.tags;
  const summary = data.project.description;

  return (
    <div
      className="flex flex-col mt-6 px-8 md:px-20 prose prose-xl prose-zinc prose-p:text-white 
     prose-code:bg-code-bg prose-code:before:content-none
     prose-code:after:content-none prose-code:p-1 prose-code:rounded-md max-w-none mx-auto "
    >
      <Head>
        <title>{data.project.title}</title>
        <meta name="description" content={data.project.description} />
      </Head>
      <Image
        className="rounded-3xl mb-2"
        src={data.project.banner}
        alt={data.project.title}
        width={1920}
        height={1080}
        loading="lazy"
      />

      <h1 className="text-white flex flex-row justify-center mb-0">
        {data.project.title}
      </h1>
      <p className="flex flex-row justify-center">
        <i>{summary}</i>
      </p>
      <div className="flex flex-row flex-wrap gap-2 ">
        {tags.map((tag: any) => (
          <div className="px-4 border rounded-2xl bg-secondary-bg-color">
            <h6 className="text-white">{tag}</h6>
          </div>
        ))}
      </div>
      <section dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
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
  const htmlContent = await convertToHTML(mdString.parent as string);
  return {
    props: {
      project,
      htmlContent,
    },
    revalidate: 60,
  };
};
