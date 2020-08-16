import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../constants';

const ButtonContainer = styled.div`
  border-radius: 6px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.blueGreen};
  color: ${({ theme }) => theme.colors.paleGreen};
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.05rem;
  cursor: pointer;
  display: inline-block;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    padding: 8px 12px;
    font-size: 12px;
    line-height: 15px;
  }
`;

const Button = ({ label, onClick, className }) => {
  return (
    <ButtonContainer className={className || ''} onClick={onClick}>{label}</ButtonContainer>
  );
};

export default Button;
