import type { AnalyticsData } from "../components/analytics";

export const sampleAnalytics: AnalyticsData = {
  stats: {
    activeProjects: 12,
    activeProjectsChange: 2,
    collaborators: 24,
    collaboratorsChange: 5,
    codingHours: 156,
    codingHoursChange: 12,
    commits: 284,
    commitsChange: 48,
  },
  dailyActivity: [4, 6, 8, 5, 7, 9, 8, 7, 10, 6, 8, 9, 11, 8],
  projectActivity: [12, 8, 15, 10, 7, 5],
  projectLabels: ["Frontend", "Backend", "Mobile", "API", "Docs", "Tools"],
};
