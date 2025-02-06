import { ChartBarIcon, ClockIcon, FolderIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { BarChart, LineChart } from "./charts";

const formatDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const Analytics: React.FC = () => {
  const dailyActivity = [4, 6, 8, 5, 7, 9, 8, 7, 10, 6, 8, 9, 11, 8];
  const projectActivity = [12, 8, 15, 10, 7, 5];
  const projectLabels = ["Frontend", "Backend", "Mobile", "API", "Docs", "Tools"];
  const dayLabels = Array.from({ length: 14 }, (_, i) => formatDate(13 - i));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FolderIcon} title="Active Projects" value="12" change="+2" />
        <StatCard icon={UserGroupIcon} title="Collaborators" value="24" change="+5" />
        <StatCard icon={ClockIcon} title="Coding Hours" value="156" change="+12" />
        <StatCard icon={ChartBarIcon} title="Commits" value="284" change="+48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Daily Activity</h3>
          <div className="aspect-[2/1] w-full">
            <LineChart data={dailyActivity} labels={dayLabels} className="w-full h-full" />
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last 14 days</div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Project Activity</h3>
          <div className="aspect-[2/1] w-full">
            <BarChart data={projectActivity} labels={projectLabels} className="w-full h-full" />
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
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      <span className="text-green-500 text-sm font-medium">{change}</span>
    </div>
    <h3 className="text-2xl font-bold mt-4 dark:text-gray-200">{value}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
  </div>
);
