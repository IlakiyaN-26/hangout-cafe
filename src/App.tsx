import React from 'react';
import './App.css';
import CakeSlider from './components/CakeSlider';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <header>Hangout Cafe</header>
      <CakeSlider />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
