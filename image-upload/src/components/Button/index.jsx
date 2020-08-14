import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  border-radius: 40px;
  padding: 8px 32px;
  background-color: #3f4257;
  color: white;
  font-size: 1rem;
  width: 124px;
  cursor: pointer;
  margin: auto;
  &:hover {
    background-color: #545972;
  }
`;

const Button = ({ label, onClick, className }) => {
  return (
    <ButtonContainer className={className || ''} onClick={onClick}>{label}</ButtonContainer>
  );
};

export default Button;
