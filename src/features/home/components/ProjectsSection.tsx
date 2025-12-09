import { projects } from "@/data/data";
import { Badge } from "@/features/common/components/Badge";
import { ProjectModal } from "@/features/common/components/ProjectModal";
import { Project } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        className="py-20 px-6 bg-[#f8f9fa] dark:bg-[#252525]"
        id="projects"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="text-[#007acc] dark:text-[#39FF14] text-lg mb-4">
              <span>$ cat ./projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-[#2d2d2d] rounded-lg overflow-hidden border border-[#007acc]/20 dark:border-[#39FF14]/20 hover:border-[#007acc]/40 dark:hover:border-[#39FF14]/40 transition-all hover:transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video bg-[#f1f5f9] dark:bg-[#1a1a1a] overflow-hidden">
                  {/* <Badge color="blue">개발중</Badge> */}

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-all "
                    // onError={handleImageError}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#007acc] dark:text-[#39FF14]">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-[#007acc]/10 dark:bg-[#39FF14]/10 text-[#007acc] dark:text-[#39FF14] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-sm text-[#007acc] dark:text-[#39FF14] hover:underline whitespace-nowrap cursor-pointer">
                      {"> View Details"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
