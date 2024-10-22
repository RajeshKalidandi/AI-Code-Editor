import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import HelpMenu from './components/HelpMenu';
import WelcomeTour from './components/WelcomeTour';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [showWelcomeTour, setShowWelcomeTour] = useState(() => {
    return localStorage.getItem('welcomeTourShown') !== 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCloseWelcomeTour = () => {
    setShowWelcomeTour(false);
    localStorage.setItem('welcomeTourShown', 'true');
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router>
        <div className={`app ${isDarkMode ? 'dark' : ''}`}>
          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
          <Footer />
          <HelpMenu />
          <WelcomeTour visible={showWelcomeTour} onClose={handleCloseWelcomeTour} />
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;
