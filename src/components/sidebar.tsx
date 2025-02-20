import React, { memo, useCallback, useEffect, useMemo } from "react";

import * as icons from "@heroicons/react/24/outline";

export namespace Sidebar {
  export interface MenuItem {
    icon: React.ElementType;
    name: string;
    sticky?: boolean;
  }

  export interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    menuItems: MenuItem[];
  }
}

export const Sidebar = memo(function Sidebar({
  activeTab,
  setActiveTab,
  isExpanded,
  setIsExpanded,
  menuItems,
}: Sidebar.Props) {
  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSidebar]);

  const { regularItems, stickyItems } = useMemo(
    () => ({
      regularItems: menuItems.filter((item) => !item.sticky),
      stickyItems: menuItems.filter((item) => item.sticky),
    }),
    [menuItems],
  );

  return (
    <div
      className={`fixed flex h-screen flex-col bg-gray-100 text-gray-900 transition-[width] duration-300 ease-in-out dark:bg-gray-900 dark:text-white ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div
          className={`transition-opacity duration-150 ${
            isExpanded ? "visible w-full opacity-100" : "invisible absolute w-0 opacity-0"
          }`}
        >
          <h1 className="text-xl font-bold">Example</h1>
        </div>
        {isExpanded ? (
          <button
            onClick={toggleSidebar}
            title="Minimize Sidebar"
            className="group relative rounded p-1 transition-opacity duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <icons.XMarkIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            title="Expand Sidebar"
            className="group relative flex items-center justify-center rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <icons.ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1">
        {regularItems.map(({ icon: Icon, name }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            title={!isExpanded ? name : undefined}
            className={`group relative flex w-full items-center px-5 py-4 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeTab === name ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          >
            <Icon className="h-6 w-6 min-w-[24px]" />
            <span
              className={`ml-4 whitespace-nowrap transition-opacity duration-150 ${
                isExpanded ? "visible relative opacity-100" : "invisible absolute opacity-0"
              }`}
            >
              {name}
            </span>
          </button>
        ))}
      </nav>
      {stickyItems.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          {stickyItems.map(({ icon: Icon, name }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              title={!isExpanded ? name : undefined}
              className={`group relative flex w-full items-center px-5 py-4 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeTab === name ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            >
              <Icon className="h-6 w-6 min-w-[24px]" />
              <span
                className={`ml-4 whitespace-nowrap transition-opacity duration-150 ${
                  isExpanded ? "visible relative opacity-100" : "invisible absolute opacity-0"
                }`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
