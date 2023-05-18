import React, { FC, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import scrollAnimation from "@/utils/scrollAnimation";

interface SkillItemProps {
  title: string;
  icon: StaticImageData;
  index: number;
}

const SkillItem: FC<SkillItemProps> = ({ title, icon,index }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index%2 === 0) {
      scrollAnimation(divRef.current, "top");
    }
    else {
      scrollAnimation(divRef.current, "bottom");
    }
  }, []);
  return (
   <div ref={divRef}>
     <div  className="flex flex-col justify-center h-24 p-6 shadow-xl bg-secondary-bg-color rounded-xl hover:scale-105  ease-in duration-300 ">
       <div className="grid grid-cols-2 gap-4 justify-center items-center ">
         <div className="m-auto">
           <Image src={icon} width="64" height="64" alt="/" />
         </div>
         <div className="flex flex-col items-center justify-center">
           <h3>{title}</h3>
         </div>
       </div>
     </div>
   </div>
  );
};

export default SkillItem;
