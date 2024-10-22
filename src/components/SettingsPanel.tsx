import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Form, Input, Switch, Select } from 'antd';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';

const { TabPane } = Tabs;

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
  currentSettings: any;
  onSettingsChange: (newSettings: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  visible,
  onClose,
  currentSettings,
  onSettingsChange,
}) => {
  const [settings, setSettings] = useState(currentSettings);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Modal
      title="Settings"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Editor" key="1">
          <Form layout="vertical">
            <Form.Item label="Font Size">
              <Input
                type="number"
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Tab Size">
              <Input
                type="number"
                value={settings.tabSize}
                onChange={(e) => handleSettingChange('tabSize', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Word Wrap">
              <Switch
                checked={settings.wordWrap === 'on'}
                onChange={(checked) => handleSettingChange('wordWrap', checked ? 'on' : 'off')}
              />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Theme" key="2">
          <ThemeSelector
            currentTheme={settings.theme}
            onThemeChange={(theme) => handleSettingChange('theme', theme)}
          />
        </TabPane>
        <TabPane tab="Language" key="3">
          <LanguageSelector
            currentLanguage={settings.language}
            onLanguageChange={(language) => handleSettingChange('language', language)}
          />
        </TabPane>
        <TabPane tab="AI Model" key="4">
          <Form.Item label="AI Model">
            <Select
              value={settings.aiModel}
              onChange={(value) => handleSettingChange('aiModel', value)}
            >
              <Select.Option value="gpt-3.5-turbo">GPT-3.5 Turbo</Select.Option>
              <Select.Option value="gpt-4">GPT-4</Select.Option>
              <Select.Option value="codex">Codex</Select.Option>
            </Select>
          </Form.Item>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default SettingsPanel;
