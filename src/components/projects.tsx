import React, { useEffect, useRef } from 'react'
import ProjectItem from './ProjectItem'
import main from '../images/main.jpg'

const Projects = () => {
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
    <div id='projects' className='  p-2 py-16 px-8 bg-secondary-bg-color mx-auto'>
     
     <h1 className='flex py-4 font-bold text-4xl justify-center'>My &nbsp;<span className='text-main-color'>Projects</span> </h1>
     
        <div className='grid md:grid-cols-3 gap-8'>
          <ProjectItem
            title='Property Finder'
            backgroundImg={main}
            projectUrl='/property'
            tech='React JS'
          />
          <ProjectItem
            title='Crypto App'
            backgroundImg={main}
            projectUrl='/crypto'
            tech='React JS'

          />
          <ProjectItem
            title='Netflix App'
            backgroundImg={main}
            projectUrl='/netflix'
            tech='React JS'

          />
          <ProjectItem
            title='Twitch UI'
            backgroundImg={main}
            projectUrl='/twitch'
            tech='Next JS'

          />
          <ProjectItem
            title='Netflix App'
            backgroundImg={main}
            projectUrl='/netflix'
            tech='React JS'

          />
          <ProjectItem
            title='Twitch UI'
            backgroundImg={main}
            projectUrl='/twitch'
            tech='Next JS'

          />
         
        </div></div>
  )
}

export default Projects