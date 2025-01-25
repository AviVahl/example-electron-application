import { BellIcon, CogIcon, ComputerDesktopIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import React from "react";

interface AppSettings {
  theme: "system" | "light" | "dark";
  autoSave: boolean;
  notifications: boolean;
}

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = React.useState<AppSettings>({
    theme: "system",
    autoSave: true,
    notifications: true,
  });

  const handleChange = (key: keyof AppSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-2xl w-full space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <CogIcon className="w-6 h-6" />
          Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center gap-2 flex-1">
              <ComputerDesktopIcon className="w-5 h-5" />
              <span className="font-medium dark:text-gray-200">Theme</span>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className="w-32 rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              focus:border-transparent outline-none"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div
            className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            onClick={() => handleChange("notifications", !settings.notifications)}
          >
            <div className="flex items-center gap-2 flex-1">
              <BellIcon className="w-5 h-5" />
              <span className="font-medium dark:text-gray-200">Notifications</span>
            </div>
            <button
              role="switch"
              aria-checked={settings.notifications}
              onClick={(e) => {
                e.stopPropagation();
                handleChange("notifications", !settings.notifications);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.notifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div
            className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            onClick={() => handleChange("autoSave", !settings.autoSave)}
          >
            <div className="flex items-center gap-2 flex-1">
              <DocumentArrowDownIcon className="w-5 h-5" />
              <span className="font-medium dark:text-gray-200">Auto-save</span>
            </div>
            <button
              role="switch"
              aria-checked={settings.autoSave}
              onClick={(e) => {
                e.stopPropagation();
                handleChange("autoSave", !settings.autoSave);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.autoSave ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
