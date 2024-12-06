// src/App.jsx
import React from 'react';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import Page4 from './Pages/Page4';
import Page5 from './Pages/Page5';
import Page6 from './Pages/Page6';
import Page7 from './Pages/Page7';
import Header from './components/Header' 

const App = () => {
  return (
    <>
      <Header/>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
  
    </>
  );
};

export default App;
