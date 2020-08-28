import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useButtonState from '@hooks/useButtonState';
import { mobile } from '@constants/index';

const ButtonContainer = styled.div`
  border-radius: 4px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.blueGreen};
  color: ${({ theme }) => theme.colors.paleGreen};
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.05rem;
  cursor: pointer;
  display: inline-block;
  user-select: none;
  transition: transform 200ms ease-in-out;
  opacity: ${({ $opacity }) => $opacity};
  @media only screen and (max-width: ${mobile.maxWidth}) {
    padding: 8px 12px;
    font-size: 12px;
    line-height: 15px;
  }
  :hover {
    transform: translateY(-2px);
  }
`;

const Button = ({ label, onClick, className }) => {
  const { opacity, onBtnClick } = useButtonState(onClick);
  return (
    <ButtonContainer
      className={className}
      onClick={onBtnClick}
      $opacity={opacity}
    >
      {label}
    </ButtonContainer>
  );
};

Button.propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Button.defaultProps = {
  label: '',
  onClick: () => {},
  className: ''
};

export default Button;
