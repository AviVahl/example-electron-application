import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";

export interface KeyboardShortcutsProps {
  onClose: () => void;
}

export const KeyboardShortcuts: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      return () => dialog.close();
    }
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto max-w-md w-full rounded-lg h-fit"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          aria-label="Close dialog"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 pr-8">Keyboard Shortcuts</h2>
        <div className="space-y-3">
          <ShortcutRow label="Home" shortcut="⌘/Ctrl + Shift + E" />
          <ShortcutRow label="Projects" shortcut="⌘/Ctrl + Shift + P" />
          <ShortcutRow label="Analytics" shortcut="⌘/Ctrl + Shift + A" />
          <ShortcutRow label="Messages" shortcut="⌘/Ctrl + Shift + M" />
          <ShortcutRow label="Settings" shortcut="⌘/Ctrl + ," />
          <ShortcutRow label="Show Shortcuts" shortcut="Shift + ?" />
        </div>
      </div>
    </dialog>
  );
};

const KeyCode: React.FC<{ children: string }> = ({ children }) => (
  <span className="inline-flex items-center justify-center min-w-[1.5rem] px-1.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded">
    {children}
  </span>
);

const ShortcutRow: React.FC<{ label: string; shortcut: string }> = ({ label, shortcut }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <div className="flex items-center gap-1 font-mono text-sm text-gray-500 dark:text-gray-400">
      {shortcut.split(" + ").map((key, i) => (
        <>
          {i > 0 && <span>+</span>}
          <KeyCode key={key}>{key}</KeyCode>
        </>
      ))}
    </div>
  </div>
);
