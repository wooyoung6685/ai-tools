import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from './styled';
import Navbar from './Navbar';
import Test from './Test';
import Gemini from './Gemini';

const App = () => {
  return (
    <Router>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/gemini" element={<Gemini />} />
          <Route path="/gpt" element={<Test />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;