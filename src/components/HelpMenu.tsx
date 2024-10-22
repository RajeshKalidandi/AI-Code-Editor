import React, { useState } from 'react';
import { HelpCircle, Book, MessageCircle, ExternalLink } from 'lucide-react';

const HelpMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <HelpCircle size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <a
              href="/tutorials"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Book className="mr-2" size={18} />
              Tutorials
            </a>
            <a
              href="/faq"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <MessageCircle className="mr-2" size={18} />
              FAQ
            </a>
            <a
              href="https://community.aicodeeditor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <ExternalLink className="mr-2" size={18} />
              Community
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpMenu;