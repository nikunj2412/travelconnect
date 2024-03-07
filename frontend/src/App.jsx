import React from 'react'
import Header from './component/common/Header'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Destinations from './pages/Destinations'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Footer from './component/common/Footer'
import Package from './pages/Package'
import PackageDetail from './component/Destination/Packges/PackageDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/destinations" element={<Destinations/>}/>
        <Route path="/packages" element={<Package/>}/>
        <Route path="/package/:id" element={<PackageDetail />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App