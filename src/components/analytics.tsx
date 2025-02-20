import { ChartBarIcon, ClockIcon, FolderIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { BarChart, LineChart } from "./charts";

export interface AnalyticsStats {
  activeProjects: number;
  activeProjectsChange: number;
  collaborators: number;
  collaboratorsChange: number;
  codingHours: number;
  codingHoursChange: number;
  commits: number;
  commitsChange: number;
}

export interface AnalyticsData {
  stats: AnalyticsStats;
  dailyActivity: number[];
  projectActivity: number[];
  projectLabels: string[];
}

const formatDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const Analytics: React.FC<{ data: AnalyticsData }> = ({ data }) => {
  const dayLabels = Array.from({ length: 14 }, (_, i) => formatDate(13 - i));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FolderIcon}
          title="Active Projects"
          value={data.stats.activeProjects.toString()}
          change={`+${data.stats.activeProjectsChange}`}
        />
        <StatCard
          icon={UserGroupIcon}
          title="Collaborators"
          value={data.stats.collaborators.toString()}
          change={`+${data.stats.collaboratorsChange}`}
        />
        <StatCard
          icon={ClockIcon}
          title="Coding Hours"
          value={data.stats.codingHours.toString()}
          change={`+${data.stats.codingHoursChange}`}
        />
        <StatCard
          icon={ChartBarIcon}
          title="Commits"
          value={data.stats.commits.toString()}
          change={`+${data.stats.commitsChange}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Daily Activity</h3>
          <div className="aspect-[2/1] w-full">
            <LineChart data={data.dailyActivity} labels={dayLabels} className="h-full w-full" />
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last 14 days</div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Project Activity</h3>
          <div className="aspect-[2/1] w-full">
            <BarChart data={data.projectActivity} labels={data.projectLabels} className="h-full w-full" />
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Commits per project</div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  change: string;
}> = ({ icon: Icon, title, value, change }) => (
  <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
    <div className="flex items-center justify-between">
      <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      <span className="text-sm font-medium text-green-500">{change}</span>
    </div>
    <h3 className="mt-4 text-2xl font-bold dark:text-gray-200">{value}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
  </div>
);
