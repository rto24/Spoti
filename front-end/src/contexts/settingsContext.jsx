import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { getUserData } from '../services/authService'
// import * as settingsService from '../services/settingsService.js'

const SettingsContext = createContext();


const SettingsProvider = ({children}) => {
  const [building, setBuilding] = useState({building_name: "Avalon Apartments", building_address:"1010 Under the Bridge"})
  const [userData, setUserData] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);
      } catch (err) {
          console.log(err)
      }
    }
      fetchUserData();
  }, [])


  /* ------------- Helper functions ------------- */

  const updateBuilding = (building) => {
    console.log('newbuilding', building)
    setBuilding(building);
  };

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // }

  const contextValue = {
    building,
    updateBuilding,
    userData,
    // handleLogin
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export {SettingsProvider, SettingsContext}
