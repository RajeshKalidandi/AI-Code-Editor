import React, { useState } from 'react';
import { Keyboard } from 'lucide-react';

const ShortcutsOverview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverview = () => setIsOpen(!isOpen);

  const shortcuts = [
    { action: 'Save', shortcut: 'Ctrl+S' },
    { action: 'Find', shortcut: 'Ctrl+F' },
    { action: 'Replace', shortcut: 'Ctrl+H' },
    { action: 'Format Code', shortcut: 'Shift+Alt+F' },
    { action: 'Toggle Comment', shortcut: 'Ctrl+/' },
    { action: 'Indent', shortcut: 'Tab' },
    { action: 'Outdent', shortcut: 'Shift+Tab' },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleOverview}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <Keyboard size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Keyboard Shortcuts</h3>
            <ul className="space-y-2">
              {shortcuts.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.action}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded">{item.shortcut}</kbd>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a href="/settings" className="text-blue-600 hover:underline">
                Customize Shortcuts
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortcutsOverview;