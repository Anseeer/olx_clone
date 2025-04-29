import React, { useState, useEffect } from 'react';

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    const loadingStages = [
      { message: 'Initializing', duration: 1000 },
      { message: 'Loading resources', duration: 1500 },
      { message: 'Preparing interface', duration: 1000 },
      { message: 'Almost there...', duration: 500 }
    ];

    let currentStage = 0;

    const stageInterval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        setLoadingStage(currentStage);
        currentStage++;
      } else {
        clearInterval(stageInterval);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 1500);

    return () => clearInterval(stageInterval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="space-y-4">
          {/* Animated Loading Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>

          {/* Loading Stages */}
          <div className="space-y-3">
            {['Initializing', 'Loading resources', 'Preparing interface', 'Almost there...'].map((stage, index) => (
              <div 
                key={stage} 
                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                  index <= loadingStage 
                    ? 'bg-blue-500 w-full' 
                    : 'bg-gray-200 w-1/4'
                }`}
              ></div>
            ))}
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 animate-pulse">
              {['Initializing', 'Loading resources', 'Preparing interface', 'Almost there...'][loadingStage]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
