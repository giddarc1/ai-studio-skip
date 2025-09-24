import Header from "@/components/Header";
import ProjectsWorkflow from "@/components/ProjectsWorkflow";

const Projects = () => {
  return (
    <>
      {/* SEO meta tags */}
      <title>Projects - JewelStudio | Team Collaboration Photoshoot Creation</title>
      <meta name="description" content="Create professional photoshoots with team collaboration. Upload concepts, select models, generate AI images, and work together on stunning jewelry photography." />
      
      <Header />
      <main className="min-h-screen pt-16">
        <ProjectsWorkflow />
      </main>
    </>
  );
};

export default Projects;