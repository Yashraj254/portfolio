import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface SkillItemProps {
  title: string;
  icon: StaticImageData;
}

const SkillItem: FC<SkillItemProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-col justify-center h-24 p-6 shadow-xl bg-secondary-bg-color rounded-xl hover:scale-105 ease-in duration-300">
      <div className="grid grid-cols-2 gap-4 justify-center items-center">
        <div className="m-auto">
          <Image src={icon} width="64" height="64" alt="/" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
