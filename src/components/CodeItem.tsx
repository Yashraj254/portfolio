import React, { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { FaCopy } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CodeItemProps {
  children: any;
  language: string;
}
SyntaxHighlighter.registerLanguage("tsx", tsx);

const CodeItem: React.FC<CodeItemProps> = ({ children, language }) => {
  const [copied, setCopied] = useState(false);
  let childrens: any = [];
  children.forEach((element: any) => {
    let child = element.toString().replace(/\n$/, "");
    childrens.push(child);
  });
  if (childrens[0].startsWith("<")) {
    childrens = "";
    children.map((child: any) => {
      if (typeof child === "string") childrens += child;
      else {
        childrens += child["props"].href.split("&quot")[0] + '"';
      }
    });
    childrens = childrens.replaceAll("“", '"');
    console.log(childrens);
  } else {
    childrens[0] = childrens[0].replaceAll("“", '"');
  }
  return (
    <div className="code relative">
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className="absolute z-10 ">
          {copied ? <FaPaste color="Cyan" /> : <FaCopy />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={materialDark}
        showLineNumbers={true}
      >
        {childrens}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeItem;
