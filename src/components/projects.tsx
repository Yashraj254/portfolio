import React, { useEffect, useRef } from "react";
import ProjectItem from "./ProjectItem";
import main from "../images/main.jpg";
import { Project } from "../../type";
import Link from "next/link";

const Projects = (projects: { data: Project[] }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    // console.log("nope", h1Ref);

    if (h1Ref.current !== undefined) {
      //  console.log('hello', h1Ref.current, divRef.current)
      try {
        // scrollAnimation(h1Ref.current, "top");
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, []);
  return (
    <div
      id="projects"
      className="  p-2 py-16 px-8 bg-secondary-bg-color mx-auto"
    >
      <h1 className="flex py-4 font-bold text-4xl justify-center">
        My &nbsp;<span className="text-main-color">Projects</span>{" "}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.data.map((project: Project) => (
          <div key={project.pageId}>
            <Link href={"/projects/" + project.slug}>
              <ProjectItem
                title= {project.title!!}
                backgroundImg={main}
                projectUrl= {project.slug!!}
                tech= {project.tech!!}
              />
            </Link>
          </div>
        ))}
        {/* <ProjectItem
          title="GPT Clone"
          backgroundImg={main}
          projectUrl="/gptClone"
          tech="Android, Jetpack Compose"
        />
        <ProjectItem
          title="MMP Player"
          backgroundImg={main}
          projectUrl="/mmpPlayer"
          tech="Android, Kotlin"
        />
        <ProjectItem
          title="Let's Connect"
          backgroundImg={main}
          projectUrl="/letsConnect"
          tech="Android, Kotlin"
        />
        <ProjectItem
          title="Bridgestone"
          backgroundImg={main}
          projectUrl="/bridgestone"
          tech="Android, Jetpack Compose"
        />
        <ProjectItem
          title="MovieBuzz"
          backgroundImg={main}
          projectUrl="/movieBuzz"
          tech="Android, Java"
        />
        <ProjectItem
          title="Attendance Diary"
          backgroundImg={main}
          projectUrl="/attendanceDiary"
          tech="Android, Java"
        /> */}
      </div>
    </div>
  );
};

export default Projects;
