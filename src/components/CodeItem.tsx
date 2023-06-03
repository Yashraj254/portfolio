import React, { FC, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { FaCopy } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CodeItemProps {
  children: any;
  language: string;
}
SyntaxHighlighter.registerLanguage("tsx", tsx);

const CodeItem: React.FC<CodeItemProps> = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

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
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeItem;
