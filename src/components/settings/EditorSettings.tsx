import React from 'react';

interface EditorSettingsProps {
  settings: {
    fontSize: number;
    tabSize: number;
    wordWrap: string;
    lineNumbers: string;
    minimap: boolean;
  };
  updateSettings: (newSettings: any) => void;
}

const EditorSettings: React.FC<EditorSettingsProps> = ({ settings, updateSettings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    updateSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Editor Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Font Size</label>
          <input
            type="number"
            name="fontSize"
            value={settings.fontSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tab Size</label>
          <input
            type="number"
            name="tabSize"
            value={settings.tabSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Word Wrap</label>
          <select
            name="wordWrap"
            value={settings.wordWrap}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Line Numbers</label>
          <select
            name="lineNumbers"
            value={settings.lineNumbers}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="minimap"
              checked={settings.minimap}
              onChange={handleChange}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Show Minimap</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditorSettings;