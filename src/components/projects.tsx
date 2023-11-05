import { useRef } from "react";
import { Project } from "../../type";
import ProjectItem from "./ProjectItem";

const Projects = (projects: { data: Project[] }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
 
  return (
    <div id="projects" className="w-full p-2 py-16 px-8 min-h-screen md:px-16 ">
      <h1 ref={h1Ref} className="flex py-4 font-bold text-4xl justify-center">
        My &nbsp;<span className="text-main-color">Projects</span>{" "}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.data.map((project: Project, index: number) => (
          <div key={index} className="hover:z-10">
            <ProjectItem
              title={project.title!!}
              sourceCode={project.sourceCode}
              backgroundImg={project.banner!!}
              projectUrl={project.slug!!}
              tech={project.tech!!}
              tags={project.tags!!}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
