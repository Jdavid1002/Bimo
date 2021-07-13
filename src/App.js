import React from 'react'
// CSS
import './css/index.css'
import './css/animation.css'
import './css/bootstrap.css'

// Components
import Navbar from './views/All/Navbar';
import Footer from './views/All/Footer';
import Router from './Configuration/Router';

function App() {
  return (
    <div>
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
