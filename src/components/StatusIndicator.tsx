import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const StatusIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [modelInfo, setModelInfo] = useState('GPT-3.5');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        {isOnline ? (
          <Wifi className="text-green-500 mr-2" size={18} />
        ) : (
          <WifiOff className="text-red-500 mr-2" size={18} />
        )}
        <span className={isOnline ? 'text-green-500' : 'text-red-500'}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      <div>
        <span className="text-gray-600">Model: {modelInfo}</span>
      </div>
    </div>
  );
};

export default StatusIndicator;