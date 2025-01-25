import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

export interface KeyboardShortcutsModalProps {
  onClose: () => void;
}

const shortcuts = [
  { keys: ["⌘/Ctrl", ","], description: "Open settings" },
  { keys: ["⌘/Ctrl", "Shift", "E"], description: "Go to home" },
  { keys: ["Shift", "?"], description: "Show keyboard shortcuts" },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current!.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50 bg-transparent p-0 max-w-[640px] w-full rounded-lg shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg w-full dark:border-gray-700 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer focus:outline-none"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
            >
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-gray-600"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};
