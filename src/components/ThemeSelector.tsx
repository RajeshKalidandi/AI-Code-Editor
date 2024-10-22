import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <Select
      style={{ width: 120, marginRight: 16 }}
      value={currentTheme}
      onChange={onThemeChange}
    >
      <Option value="vs-dark">Dark</Option>
      <Option value="vs-light">Light</Option>
    </Select>
  );
};

export default ThemeSelector;
