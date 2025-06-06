import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import Landing from './pages/Landing.jsx'
import UserProtectionWrapper from './pages/UserProtectionWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainLanding from './pages/CaptainLanding.jsx'
import CaptainProtectionWrapper from './pages/CaptainProtectionWrapper.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
import Userlogin from './pages/Userlogin.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Userlogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/landing' element={<UserProtectionWrapper><Landing/></UserProtectionWrapper>} />
        <Route path='/user/logout' element={<UserProtectionWrapper><UserLogout/></UserProtectionWrapper>} />
        <Route path='/captain-landing' element={<CaptainProtectionWrapper><CaptainLanding/></CaptainProtectionWrapper>}/>
        <Route path='/captain/logout' element={<CaptainProtectionWrapper><UserLogout/></CaptainProtectionWrapper>} />
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/captain-riding' element = {<CaptainRiding/>}/>
      </Routes>
    </>
  )
}

export default App
