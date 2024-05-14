import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Arial, sans-serif';
`;

export const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 50px;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
