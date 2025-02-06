export interface Project {
  name: string;
  path: string;
  lastOpened: Date;
  tech: string[];
}

export const sampleProjects: Project[] = [
  {
    name: "Task Manager",
    path: "/home/projects/tasks",
    lastOpened: new Date("2024-01-10"),
    tech: ["React", "React Router"],
  },
  {
    name: "Personal Blog",
    path: "/home/projects/blog",
    lastOpened: new Date("2024-01-15"),
    tech: ["React", "Next.js"],
  },
  {
    name: "Portfolio",
    path: "/home/projects/portfolio",
    lastOpened: new Date("2024-01-05"),
    tech: ["React", "Tailwind"],
  },
];
