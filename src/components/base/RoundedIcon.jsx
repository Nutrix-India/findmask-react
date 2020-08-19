import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useButtonState from '@hooks/useButtonState';

const Icon = styled.div`
  display: inline-flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.blueGreen};
  opacity: ${({ $opacity }) => $opacity};
  transition: transform 200ms ease-in-out;
  :hover {
    transform: translateY(-2px);
  }
`;

const Image = styled.img`
  max-width: 50%;
`;

const RoundedIcon = ({ onClick, className, size, imgSrc }) => {
  const { opacity, onBtnClick } = useButtonState(onClick);
  return (
    <Icon
      onClick={onBtnClick}
      className={className}
      $size={size}
      $opacity={opacity}
    >
      <Image src={imgSrc} />
    </Icon>
  );
};

RoundedIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired
};

RoundedIcon.defaultProps = {
  onClick: () => {},
  className: ''
};

export default RoundedIcon;
