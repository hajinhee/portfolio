import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [activeHref, setActiveHref] = useState("#home");
  const fullText = "Interactive Web Experience Developer";

  /** 오늘 날짜 */
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  /** 프로젝트 섹션으로 이동 */
  const handleMoveToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveHref("#projects");

    const targetElement = document.getElementById("projects");
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 text-[#007acc] dark:text-[#39FF14] text-lg">
          <span>[Hajinhee/Portfolio] &gt; </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">Hajinhee</h1>

        <div className="text-xl md:text-2xl mb-8 h-8 flex items-center justify-center">
          <span>{displayText}</span>
          <span
            className={`ml-1 w-3 h-6 bg-[#007acc] dark:bg-[#39FF14] ${
              showCursor ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          ></span>
        </div>

        <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          프론트엔드 기술과 창의적 사고를 결합해 사용자 친화적 웹 경험을 만드는
          개발자입니다. 현대적인 스택과 감각적인 UI로 비즈니스 성과를 높이는
          솔루션을 제공합니다.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            onClick={handleMoveToProjects}
            className="px-8 py-3 bg-[#007acc] dark:bg-[#39FF14] text-white dark:text-[#1e1e1e] rounded-md hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
          >
            &gt; View Projects
          </a>
          <a
            href="assets/pdfs/resume.pdf"
            download={`${year}${month}${day}_하진희.pdf`}
            className="px-8 py-3 border-2 border-[#007acc] dark:border-[#39FF14] text-[#007acc] dark:text-[#39FF14] rounded-md hover:bg-[#007acc]/10 dark:hover:bg-[#39FF14]/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            &gt; Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
