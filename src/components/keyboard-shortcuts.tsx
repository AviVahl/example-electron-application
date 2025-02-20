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
      className="fixed inset-0 m-auto h-fit w-full max-w-md rounded-lg bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close dialog"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h2 className="mb-6 pr-8 text-xl font-semibold text-gray-900 dark:text-gray-100">Keyboard Shortcuts</h2>
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
  <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
    {children}
  </span>
);

const ShortcutRow: React.FC<{ label: string; shortcut: string }> = ({ label, shortcut }) => (
  <div className="flex items-center justify-between">
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
