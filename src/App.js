import React from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import TechnicalSkills from './components/TechnicalSkills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main>
          <Home />
          <About />
          <Experience />
          <Education />
          <Skills />
          <TechnicalSkills />
          <Services />
          <Portfolio />
        </main>
        <Footer />
        <ScrollToTop />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;