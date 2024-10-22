import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <Select
      style={{ width: 120, marginRight: 16 }}
      value={currentLanguage}
      onChange={onLanguageChange}
    >
      <Option value="javascript">JavaScript</Option>
      <Option value="typescript">TypeScript</Option>
      <Option value="python">Python</Option>
      <Option value="java">Java</Option>
    </Select>
  );
};

export default LanguageSelector;
