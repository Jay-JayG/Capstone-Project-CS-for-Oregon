import { createContext, useContext, useState } from 'react';

const SpotlightContext = createContext();

export const SpotlightProvider = ({ children }) => {
  const [spotlights, setSpotlights] = useState(null);

  return (
    <SpotlightContext.Provider value={{ spotlights, setSpotlights }}>
      {children}
    </SpotlightContext.Provider>
  );
};

export const useSpotlights = () => useContext(SpotlightContext);