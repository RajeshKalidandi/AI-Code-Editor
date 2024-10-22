import React from 'react';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code size={24} />
          <span className="text-xl font-bold">AI Code Editor</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/editor" className="hover:text-blue-200">Editor</Link></li>
          </ul>
        </nav>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<BulbOutlined />}
        />
      </div>
    </header>
  );
};

export default Header;
