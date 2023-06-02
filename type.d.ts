export type Blog = {
    title?: string;
    description?: string;
    readTime?: string;
    thumbnail?: string;
    tags?: string[];
    slug?: string;
    pageId?:string;
    date?:string;
    mdString?:string;
}

export type Project = {
    title?: string;
    sourceCode?: string;
    banner?: string;
    tech?: string;
    tags?: string[];
    description?: string;
    slug?: string;
    pageId?:string
    mdString?:string
}