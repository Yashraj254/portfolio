import React, { useEffect, useRef } from "react";
import Image from "next/image";
import bg_login from "../images/bg_login.png";
// import all images from images folder
import bridgestone from "../images/bridgestone.png";
import bridgestone_bg from "../images/bridgestone_bg.png";
import html_icon from "../images/html_icon.svg";
import javascript_icon from "../images/javascript_icon.svg";
import react_icon from "../images/react_icon.svg";
import nextjs_icon from "../images/nextjs_icon.svg";
import tailwind_icon from "../images/tailwind_icon.svg";
import github_icon from "../images/github_icon.svg";
import css_icon from "../images/css_icon.svg";
import firebase_icon from "../images/firebase_icon.svg";
import SkillItem from "./SkillItem";
import java_icon from "../images/java_icon.svg";
import kotlin_icon from "../images/kotlin_icon.svg";
import typescript_icon from "../images/typescript_icon.svg";
import android_icon from "../images/android_icon.svg";
import compose_icon from "../images/compose_icon.png";

const Skills = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (h1Ref.current !== undefined) {
      //  console.log('hello', h1Ref.current, divRef.current)
      try {
        // scrollAnimation(divRef.current, "left");
        // scrollAnimation(h1Ref.current, "top");
        // scrollAnimation(imgRef.current, "right");
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, []);
  return (
    <section id="skills" className="w-full min-h-screen p-2 py-16 px-8">
      <h1 className="flex justify-center text-4xl font-bold p-4">Technical &nbsp;<span className='text-main-color'>Skills</span></h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      <SkillItem title="Java" icon={java_icon} />
        <SkillItem title="Kotlin" icon={kotlin_icon} />
        <SkillItem title="Android" icon={android_icon} />
        <SkillItem title="Jetpack Compose" icon={compose_icon} />
        <SkillItem title="Firebase" icon={firebase_icon} />
        <SkillItem title="Github" icon={github_icon} />
        <SkillItem title="HTML" icon={html_icon} />
        <SkillItem title="CSS" icon={css_icon} />
        <SkillItem title="JavaScript" icon={javascript_icon} />
        <SkillItem title="React" icon={react_icon} />
        <SkillItem title="Tailwind" icon={tailwind_icon} />
        <SkillItem title="Next JS" icon={nextjs_icon} />
        <SkillItem title="Typescript" icon={typescript_icon} />
        
      </div>
    </section>
  );
};

export default Skills;
