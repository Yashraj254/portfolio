import scrollAnimation from '@/utils/scrollAnimation';
import dayjs from 'dayjs';
import { title } from 'process';
import React, { FC, useEffect, useRef } from 'react'

interface BlogItemProps {
    title: string;
    tags: string[];
    date: string;
    index: number;
  }
  
const BlogItem: FC<BlogItemProps> = ({title,tags,date,index}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index%2 === 0) {
      scrollAnimation(divRef.current, "left");
    }
    else {
      scrollAnimation(divRef.current, "right");
    }
  }, [divRef, index]);
  return (
 <div ref={divRef}>
     <div  className="flex flex-col  justify-start py-2 px-6 shadow-xl bg-secondary-bg-color rounded-xl hover:scale-105 ease-in duration-300">
     {/* <div className="grid grid-cols-2 gap-4 justify-center items-center">
       <div className="m-auto">
         <Image src={icon} width="64" height="64" alt="/" />
       </div>
       <div className="flex flex-col items-center justify-center">
         <h3>{title}</h3>
       </div>
     </div> */}
     <div className='flex flex-row flex-wrap gap-2 '>
         {tags.map((tag) => (
             <div className="px-4 border rounded-xl ">
                 <h3 >{tag}</h3>
             </div>
         ))}
     </div>
     <h1>{title}</h1>
     <h6 className='flex justify-end'>{dayjs(date).format("MMMM DD, YYYY")}</h6>
   </div>
 </div>
  )
}

export default BlogItem