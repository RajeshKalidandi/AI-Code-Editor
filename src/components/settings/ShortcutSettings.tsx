import React, { useState } from 'react';

interface ShortcutSettingsProps {
  settings: Record<string, string>;
  updateSettings: (newSettings: Record<string, string>) => void;
}

const defaultShortcuts = {
  'Save': 'Ctrl+S',
  'Find': 'Ctrl+F',
  'Replace': 'Ctrl+H',
  'Format': 'Shift+Alt+F',
};

const ShortcutSettings: React.FC<ShortcutSettingsProps> = ({ settings, updateSettings }) => {
  const [editingShortcut, setEditingShortcut] = useState<string | null>(null);

  const handleShortcutChange = (action: string, newShortcut: string) => {
    updateSettings({ ...settings, [action]: newShortcut });
    setEditingShortcut(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Keyboard Shortcuts</h2>
      <div className="space-y-4">
        {Object.entries({ ...defaultShortcuts, ...settings }).map(([action, shortcut]) => (
          <div key={action} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{action}</span>
            {editingShortcut === action ? (
              <input
                type="text"
                value={shortcut}
                onChange={(e) => handleShortcutChange(action, e.target.value)}
                onBlur={() => setEditingShortcut(null)}
                className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setEditingShortcut(action)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                {shortcut}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortcutSettings;