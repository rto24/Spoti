import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import OpenSpots from './pages/OpenSpots'
import MySpots from './pages/MySpots'
import CreateSpot from './pages/CreateSpot'
import Settings from './pages/Settings'

import Onboarding from './pages/Onboarding'
import SpotListing from './pages/SpotListing'

import { ApplicationLayout } from './components/application-layout'


function App() {

  const [showNavbar, setShowNavbar] = useState(false);


  const withLayout = (Component) => {
    return (
      <ApplicationLayout showNavbar={showNavbar} setShowNavbar={setShowNavbar}>
        <Component />
      </ApplicationLayout>
    );
  };


  return (
    <>
      <Routes>
          <Route path="/" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={withLayout(OpenSpots)}/>
          <Route path="/spot/:id" element={withLayout(SpotListing)}/>
          <Route path="/create-spot" element={withLayout(CreateSpot)}/>
          <Route path="/my-spots" element={withLayout(MySpots)}/>
          <Route path="/settings" element={withLayout(Settings)}/>
      </Routes>
    </>
  )
}

export default App;
