import { Project } from "@/types";
import { useEffect, useState } from "react";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
        aria-label="Close modal message"
      ></div>

      <div
        className={`relative bg-white dark:bg-[#1e1e1e] border-2 border-[#007acc] dark:border-[#39FF14] rounded-lg max-w-4xl w-full max-h-[90vh] transition-all duration-300 ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b border-[#007acc]/20 dark:border-[#39FF14]/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm text-[#007acc] dark:text-[#39FF14]">
              project/{project.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#007acc]/10 dark:hover:bg-[#39FF14]/10 rounded transition-colors cursor-pointer"
            aria-label="Close modal message"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </header>

        <section className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          {/* 프로젝트 이미지 */}
          <div className="mb-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover object-top rounded-lg"
            />
          </div>
          {/* 타이틀 */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#007acc] dark:text-[#39FF14]">
            {project.title}
          </h2>

          {/* 내용 */}
          <p className="text-lg mb-6 leading-relaxed">{project.details}</p>

          {/* 프로젝트 메타 정보 */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-md">
              {/* 기간 */}
              <div className="flex justify-between">
                <span className="font-semibold text-[#007acc] dark:text-[#39FF14] min-w-[100px] md:min-w-[120px]">
                  기간
                </span>
                <span className="text-right flex-1 ml-4">{project.period}</span>
              </div>

              {/* 진행 상태 */}
              <div className="flex justify-between">
                <span className="font-semibold text-[#007acc] dark:text-[#39FF14] min-w-[100px] md:min-w-[120px]">
                  진행 상태
                </span>
                <span className="text-right flex-1 ml-4">{project.status}</span>
              </div>

              {/* 팀 규모 */}
              <div className="flex justify-between">
                <span className="font-semibold text-[#007acc] dark:text-[#39FF14] min-w-[100px] md:min-w-[120px]">
                  팀 규모
                </span>
                <span className="text-right flex-1 ml-4">
                  {project.teamSize}명
                </span>
              </div>

              {/* 담당 역할 */}
              <div className="flex justify-between">
                <span className="font-semibold text-[#007acc] dark:text-[#39FF14] min-w-[100px] md:min-w-[120px]">
                  담당 역할
                </span>
                <span className="text-right flex-1 ml-4">{project.role}</span>
              </div>
            </div>
          </div>

          {/* 개발 기여 */}
          {project.responsibilities && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">개발 기여</h3>

              <ul className="space-y-2">
                {project.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#007acc] dark:text-[#39FF14] mr-2">
                      &gt;
                    </span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 주요 기능 */}
          {/* <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">주요 기능</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-[#007acc] dark:text-[#39FF14] mr-2">
                    &gt;
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div> */}

          {/* 기술 스택 */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">기술 스택</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#007acc]/10 dark:bg-[#39FF14]/10 text-[#007acc] dark:text-[#39FF14] rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-wrap gap-4">
            {project.designUrl && (
              <a
                href={project.designUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-[#007acc] dark:bg-[#39FF14] text-white dark:text-[#1e1e1e] rounded-md hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
              >
                <i className="ri-external-link-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Design
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-[#007acc] dark:bg-[#39FF14] text-white dark:text-[#1e1e1e] rounded-md hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
              >
                <i className="ri-external-link-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 border-2 border-[#007acc] dark:border-[#39FF14] text-[#007acc] dark:text-[#39FF14] rounded-md hover:bg-[#007acc]/10 dark:hover:bg-[#39FF14]/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-github-line w-4 h-4 flex items-center justify-center mr-2"></i>
                View Code
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
