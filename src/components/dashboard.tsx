import * as icons from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { sampleAnalytics } from "../data/sample-analytics";
import { sampleProjects } from "../data/sample-projects";
import { Analytics } from "./analytics";
import { Home } from "./home";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { Messages } from "./messages";
import { Projects } from "./projects";
import { Settings } from "./settings";
import { Sidebar } from "./sidebar";

const menuItems: Sidebar.MenuItem[] = [
  { icon: icons.HomeIcon, name: "Home" },
  { icon: icons.FolderIcon, name: "Projects" },
  { icon: icons.ChartBarIcon, name: "Analytics" },
  { icon: icons.ChatBubbleLeftIcon, name: "Messages" },
  { icon: icons.CogIcon, name: "Settings", sticky: true },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Home";
  });
  const [isExpanded, setIsExpanded] = useState(() => {
    return localStorage.getItem("sidebarExpanded") !== "false";
  });
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", String(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        e.preventDefault();
        setActiveTab("Settings");
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setActiveTab("Home");
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setActiveTab("Projects");
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setActiveTab("Analytics");
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setActiveTab("Messages");
      }
      if (e.shiftKey && e.key === "?") {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        menuItems={menuItems}
      />
      <main
        className={`flex-1 p-6 overflow-auto transition-[margin-left] duration-300
        ${isExpanded ? "ml-64" : "ml-16"}`}
      >
        {renderActiveTabContent(activeTab)}
      </main>
      {isShortcutsModalOpen && <KeyboardShortcuts onClose={() => setIsShortcutsModalOpen(false)} />}
    </div>
  );
}

const renderActiveTabContent = (activeTab: string) => {
  switch (activeTab) {
    case "Home":
      return <Home />;
    case "Settings":
      return <Settings />;
    case "Projects":
      return <Projects projects={sampleProjects} />;
    case "Analytics":
      return <Analytics data={sampleAnalytics} />;
    case "Messages":
      return <Messages />;
    default:
      return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-300">Content for {activeTab} panel goes here</p>
        </div>
      );
  }
};
