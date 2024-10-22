import React from 'react';

interface ModelSettingsProps {
  settings: {
    name: string;
    type: string;
  };
  updateSettings: (newSettings: any) => void;
}

const ModelSettings: React.FC<ModelSettingsProps> = ({ settings, updateSettings }) => {
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings, name: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings, type: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">AI Model Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <select
            value={settings.name}
            onChange={handleModelChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="GPT-3.5">GPT-3.5</option>
            <option value="GPT-4">GPT-4</option>
            <option value="Codex">Codex</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={settings.type}
            onChange={handleTypeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="online">Online</option>
            <option value="local">Local</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ModelSettings;