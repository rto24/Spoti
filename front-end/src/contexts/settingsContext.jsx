import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';

// import * as settingsService from '../services/settingsService.js'

const SettingsContext = createContext();


const SettingsProvider = ({children}) => {
  const [building, setBuilding] = useState({building_name: "Avalon Apartments", building_address:"1010 Under the Bridge"})

  /* ------------- Helper functions ------------- */

  const updateBuilding = (building) => {
    setBuilding(building);
  };

  const contextValue = {
    building,
    updateBuilding,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export {SettingsProvider, SettingsContext}
