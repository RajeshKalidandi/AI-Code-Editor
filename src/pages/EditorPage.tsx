import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import LanguageSelector from '../components/LanguageSelector';
import ThemeSelector from '../components/ThemeSelector';
import StatusIndicator from '../components/StatusIndicator';
import GitIntegration from '../components/GitIntegration';
import RefactoringSuggestions from '../components/RefactoringSuggestions';
import SettingsPanel from '../components/SettingsPanel';
import { Layout, Menu, Button } from 'antd';
import { FileOutlined, SettingOutlined, BranchesOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const EditorPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [collapsed, setCollapsed] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    theme: 'vs-dark',
    language: 'javascript',
    aiModel: 'gpt-3.5-turbo',
  });

  useEffect(() => {
    // Load saved code from localStorage
    const savedCode = localStorage.getItem('editorCode');
    if (savedCode) {
      setCode(savedCode);
    }
    const savedSettings = localStorage.getItem('editorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem('editorCode', newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleApplyRefactoringSuggestion = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem('editorCode', newCode);
  };

  const handleSettingsChange = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem('editorSettings', JSON.stringify(newSettings));
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className="dark:bg-gray-900">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="dark:bg-gray-800">
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className="dark:bg-gray-800">
          <Menu.Item key="1" icon={<FileOutlined />}>
            Files
          </Menu.Item>
          <Menu.Item key="2" icon={<BranchesOutlined />}>
            Git
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background dark:bg-gray-800" style={{ padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
            <StatusIndicator />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background dark:bg-gray-800" style={{ padding: 24, minHeight: 360 }}>
            <CodeEditor
              code={code}
              language={language}
              theme={theme}
              onChange={handleCodeChange}
            />
          </div>
        </Content>
        <Sider width={300} className="dark:bg-gray-800">
          <GitIntegration />
          <RefactoringSuggestions
            code={code}
            language={language}
            onApplySuggestion={handleApplyRefactoringSuggestion}
          />
        </Sider>
      </Layout>
      <Button
        onClick={() => setSettingsVisible(true)}
        icon={<SettingOutlined />}
        style={{ position: 'absolute', top: 16, right: 16 }}
      >
        Settings
      </Button>
      <SettingsPanel
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        currentSettings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </Layout>
  );
};

export default EditorPage;
