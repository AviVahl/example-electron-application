import { BellIcon, CogIcon, ComputerDesktopIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import React from "react";

interface AppSettings {
  theme: "system" | "light" | "dark";
  autoSave: boolean;
  notifications: boolean;
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState<AppSettings>({
    theme: "system",
    autoSave: true,
    notifications: true,
  });

  const handleChange = (key: keyof AppSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <CogIcon className="h-6 w-6" />
          Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="flex flex-1 items-center gap-2">
              <ComputerDesktopIcon className="h-5 w-5" />
              <span className="font-medium dark:text-gray-200">Theme</span>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className="w-32 rounded border border-gray-300 bg-white px-3 py-1 text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div
            className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => handleChange("notifications", !settings.notifications)}
          >
            <div className="flex flex-1 items-center gap-2">
              <BellIcon className="h-5 w-5" />
              <span className="font-medium dark:text-gray-200">Notifications</span>
            </div>
            <button
              role="switch"
              aria-checked={settings.notifications}
              onClick={(e) => {
                e.stopPropagation();
                handleChange("notifications", !settings.notifications);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
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
            className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => handleChange("autoSave", !settings.autoSave)}
          >
            <div className="flex flex-1 items-center gap-2">
              <DocumentArrowDownIcon className="h-5 w-5" />
              <span className="font-medium dark:text-gray-200">Auto-save</span>
            </div>
            <button
              role="switch"
              aria-checked={settings.autoSave}
              onClick={(e) => {
                e.stopPropagation();
                handleChange("autoSave", !settings.autoSave);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
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
