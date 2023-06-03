import { Client } from "@notionhq/client";
import Markdown from "markdown-to-jsx";
import { GetStaticProps } from "next";
import { NotionToMarkdown } from "notion-to-md";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { Blog } from "../../../type";
import CodeItem from "@/components/CodeItem";

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
  const [copied, setCopied] = useState("");
  let buttonId = 0;
  let codeId = 0;
  let clipboard: any;
  let htmlContent: string = data.htmlContent.toString();

  // const copyToClipBoard = (elementId: string) => {
  //   console.log("copyToClipBoard",elementId);

  //   // var text = document.getElementById(elementId)?.innerText;
  //   // navigator.clipboard.writeText(text || "");
  //   }

  // useEffect(() => {
  //   const handleClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (target.classList.contains('my-button')) {

  //   var text = document.getElementById(target.id.replaceAll('button','code'))?.innerText;
  //   navigator.clipboard.writeText(text || "");

  //       // Button click event handling
  //       // Your logic here
  //     }
  //   };

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, []);
  // htmlContent.match(/<\/code><button>/g || [])?.forEach((codeBlock: string) => {
  //   let modifiedCodeBlock = codeBlock.replace(
  //     "<button>",
  //     `<button class="my-button"  id ='${
  //       "button" + buttonId
  //     }'>`
  //   );
  //   htmlContent = htmlContent.replace(codeBlock, modifiedCodeBlock);
  //   buttonId++;
  // });
  // // store the modifier htmlContent in a variable

  // htmlContent.match(/<pre><code>/g || [])?.forEach((codeBlock: string) => {
  //   let modifiedCodeBlock = codeBlock.replace(
  //     "<code>",
  //     `<code language='kotlin' id ='${"code" + codeId}'>`
  //   );
  //   htmlContent = htmlContent.replace(codeBlock, modifiedCodeBlock);

  //   codeId++;
  // });
  // console.log("htmlContent", htmlContent);

  return (
    // <SyntaxHighlighter language="kotlin" style={dark}>
    <section
      className=" px-6 prose prose-xl prose-zinc prose-p:text-white 
     prose-code:bg-code-bg prose-code:before:content-none
     prose-code:after:content-none prose-code:p-1 prose-code:rounded-md container  max-w-none mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4"
      // dangerouslySetInnerHTML={{ __html: htmlContent }}
    >
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
    </section>
    // </SyntaxHighlighter>
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
  // console.log("blog1", data,slug, blog);
  const htmlContent = await convertToHTML(mdString);
  // console.log("htmlContent", htmlContent);
  return {
    props: {
      blog,
      htmlContent,
    },
    revalidate: 60,
  };
};
