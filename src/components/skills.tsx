import { useEffect, useRef } from "react";
import android_icon from "../../public/images/android_icon.svg";
import compose_icon from "../../public/images/compose_icon.png";
import css_icon from "../../public/images/css_icon.svg";
import firebase_icon from "../../public/images/firebase_icon.svg";
import github_icon from "../../public/images/github_icon.svg";
import html_icon from "../../public/images/html_icon.svg";
import java_icon from "../../public/images/java_icon.svg";
import javascript_icon from "../../public/images/javascript_icon.svg";
import kotlin_icon from "../../public/images/kotlin_icon.svg";
import nextjs_icon from "../../public/images/nextjs_icon.svg";
import react_icon from "../../public/images/react_icon.svg";
import tailwind_icon from "../../public/images/tailwind_icon.svg";
import typescript_icon from "../../public/images/typescript_icon.svg";
import SkillItem from "./SkillItem";

const Skills = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
 
  return (
    <section id="skills" className="w-full min-h-screen p-2 py-16 px-8">
      <h1 ref={h1Ref} className="flex justify-center text-4xl font-bold p-4">Technical &nbsp;<span className='text-main-color'>Skills</span></h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
      <SkillItem title="Java" icon={java_icon} index={0}/>
        <SkillItem title="Kotlin" icon={kotlin_icon} index={1}/>
        <SkillItem title="Android" icon={android_icon} index={2}/>
        <SkillItem title="Jetpack Compose" icon={compose_icon} index={3}/>
        <SkillItem title="Firebase" icon={firebase_icon} index={4}/>
        <SkillItem title="Github" icon={github_icon} index={5}/>
        <SkillItem title="HTML" icon={html_icon} index={6}/>
        <SkillItem title="CSS" icon={css_icon} index={7}/>
        <SkillItem title="JavaScript" icon={javascript_icon} index={8}/>
        <SkillItem title="React" icon={react_icon} index={9}/>
        <SkillItem title="Tailwind" icon={tailwind_icon} index={10}/>
        <SkillItem title="Next JS" icon={nextjs_icon} index={11}/>
        <SkillItem title="Typescript" icon={typescript_icon} index={12}/>
        
      </div>
    </section>
  );
};

export default Skills;
