import { title } from 'process';
import React, { FC } from 'react'

interface BlogItemProps {
    title: string;
    tags: string[];
  }
  
const BlogItem: FC<BlogItemProps> = ({title,tags}) => {
  return (
    <div className="flex flex-col justify-start py-2 px-6 shadow-xl bg-secondary-bg-color rounded-xl hover:scale-105 ease-in duration-300">
    {/* <div className="grid grid-cols-2 gap-4 justify-center items-center">
      <div className="m-auto">
        <Image src={icon} width="64" height="64" alt="/" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3>{title}</h3>
      </div>
    </div> */}
    <div className='flex flex-row gap-4'>
        {tags.map((tag) => (
            <div className="px-4 border rounded-xl ">
                <h3>{tag}</h3>
            </div>
        ))}
    </div>
    <h1>{title}</h1>
    <h6 className='flex justify-end'>Date</h6>
  </div>
  )
}

export default BlogItem