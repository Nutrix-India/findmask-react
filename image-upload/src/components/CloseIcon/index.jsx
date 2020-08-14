import React from 'react';
import styled from 'styled-components';


const Icon = styled.div`
  display: inline-flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  cursor: pointer;
  background-color: #3f4257;
  color: white;
  font-size: 1.2rem;
  line-height: 64%;
`;

const CloseIcon = ({ onClick, className, size }) => {
  return (<Icon onClick={onClick} className={className || ''} $size={size}>&times;</Icon>);
};

export default CloseIcon;
