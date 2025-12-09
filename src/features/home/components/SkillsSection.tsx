import { skills } from "@/data/data";

export function SkillsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="text-[#007acc] dark:text-[#39FF14] text-lg mb-4">
            <span>$ ls -a skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Technical Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-[#f8f9fa] dark:bg-[#2d2d2d] p-6 rounded-lg border border-[#007acc]/20 dark:border-[#39FF14]/20 hover:border-[#007acc]/40 dark:hover:border-[#39FF14]/40 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-[#007acc] dark:text-[#39FF14]">
                ./{skillGroup.category.toLowerCase()}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    {/* Use a JSX expression to render the ">" character safely */}
                    <span className="text-[#007acc] dark:text-[#39FF14] mr-2">
                      {">"}
                    </span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
