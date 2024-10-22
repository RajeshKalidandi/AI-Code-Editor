import React, { useState, useEffect } from 'react';

interface ContextTooltipProps {
  target: string;
  content: string;
}

const ContextTooltip: React.FC<ContextTooltipProps> = ({ target, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      const showTooltip = () => setIsVisible(true);
      const hideTooltip = () => setIsVisible(false);

      targetElement.addEventListener('mouseenter', showTooltip);
      targetElement.addEventListener('mouseleave', hideTooltip);

      return () => {
        targetElement.removeEventListener('mouseenter', showTooltip);
        targetElement.removeEventListener('mouseleave', hideTooltip);
      };
    }
  }, [target]);

  if (!isVisible) return null;

  return (
    <div className="absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
      {content}
    </div>
  );
};

export default ContextTooltip;