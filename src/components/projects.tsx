import { FolderIcon, ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { Project } from "../data/sample-projects";

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
      <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white">Projects</h1>
      <div className="flex flex-wrap gap-6">
        {projects.map((project) => (
          <div
            key={project.path}
            className="flex h-80 w-80 flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                <FolderIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
              </div>
              <button className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </button>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{project.name}</h3>

            <p className="mb-4 truncate text-sm text-gray-500 dark:text-gray-400">{project.path}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="mr-1 h-4 w-4" />
              Last opened {formatDate(project.lastOpened)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
