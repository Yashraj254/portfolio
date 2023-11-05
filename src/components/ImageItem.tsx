import Image from "next/image";
import React from "react";

interface ImageItemProps {
  children: any;
}

const ImageItem: React.FC<ImageItemProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-center">
      <Image
        src={children[0].props.children[0].props.href}
        width={400}
        height={400}
        alt="Picture of the author"
      />
    </div>
  );
};

export default ImageItem;
