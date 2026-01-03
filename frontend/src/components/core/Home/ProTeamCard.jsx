// components/core/Home/ProTeamCard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const ProTeamCard = () => {
  // Get theme state from Redux
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  // Theme-based styles
  const themeStyles = {
    
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    secondaryText: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-600' : 'border-white'
  };

  return (
    <div className={`${themeStyles.background} rounded-3xl p-6 shadow-lg max-w-xs transition-colors duration-300`}>
      <div className="space-y-4">
        {/* Team Photos */}
        <div className="flex -space-x-2">
          
        </div>
        
        {/* Content */}
        <div className="space-y-1">
          
          <p className={`${themeStyles.secondaryText} text-[12px] leading-tight tracking-normal transition-colors duration-300`}>
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProTeamCard;
