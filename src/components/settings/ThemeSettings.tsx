import React, { useState } from 'react';

interface ThemeSettingsProps {
  settings: {
    name: string;
    customThemes: string[];
  };
  updateSettings: (newSettings: any) => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ settings, updateSettings }) => {
  const [newThemeName, setNewThemeName] = useState('');

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings, name: e.target.value });
  };

  const handleAddCustomTheme = () => {
    if (newThemeName && !settings.customThemes.includes(newThemeName)) {
      const updatedThemes = [...settings.customThemes, newThemeName];
      updateSettings({ ...settings, customThemes: updatedThemes });
      setNewThemeName('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Theme Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Theme</label>
          <select
            value={settings.name}
            onChange={handleThemeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
            <option value="hc-black">High Contrast</option>
            {settings.customThemes.map((theme) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Add Custom Theme</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter theme name"
            />
            <button
              onClick={handleAddCustomTheme}
              className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;