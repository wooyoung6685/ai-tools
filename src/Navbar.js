import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from './styled';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/gemini')}>Gemini</Button>
      <Button onClick={() => navigate('/gpt')}>GPT</Button>
    </div>
  );
};

export default Navbar;