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
     <div  className="glowCyan flex flex-col justify-center md:h-24 h-16 md:p-6 p-2 shadow-xl  rounded-xl  hover:scale-105 border border-main-color  ease-in duration-300 ">
       <div className=" grid grid-cols-2 md:gap-4 gap-2 p-2 justify-center items-center ">
         <div className="m-auto">
           <Image className="md:p-0 p-2" src={icon} width="64" height="64" alt="/" />
         </div>
         <div className=" flex flex-col items-center justify-center">
           <h3 className="md:text-[1.25rem] text-base">{title}</h3>
         </div>
       </div>
     </div>
   </div>
  );
};

export default SkillItem;
