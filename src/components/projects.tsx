import { FolderIcon, ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Project } from "../data/sample-projects";

export interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Projects</h1>
      <div className="flex flex-wrap gap-6">
        {projects.map((project) => (
          <div
            key={project.path}
            className="w-80 h-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg
            hover:shadow-2xl transition-all duration-300 border border-gray-100
            dark:border-gray-700 p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FolderIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500
                dark:hover:text-gray-300 transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.name}</h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">{project.path}</p>

            <div className="flex gap-2 mb-4 flex-wrap">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700
                  text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="w-4 h-4 mr-1" />
              Last opened {formatDate(project.lastOpened)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
