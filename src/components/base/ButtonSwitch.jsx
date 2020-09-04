import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '@base/Text';

const borderRadius = 5;

const Container = styled.div`
  border-radius: ${borderRadius}px;
  display: grid;
  align-items: center;
  min-width: 80px;
  grid-template: 1fr / 1fr 1fr;
  border: 1px solid ${({ theme }) => theme.colors.blueGreen};
  cursor: pointer;
`;

const Btn = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 3px 5px;
  font-size: 12px;
  ${({ isSelected, theme }) =>
    isSelected
      ? `background-color: ${theme.colors.blueGreen} !important; color: ${theme.colors.paleGreen};`
      : `color: ${theme.colors.blueGreen};`}
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueGrey};
  }
  transition: all 250ms ease;
`;

const LeftBtn = styled(Btn)`
  border-top-left-radius: ${borderRadius - 2}px;
  border-bottom-left-radius: ${borderRadius - 2}px;
`;

const RightBtn = styled(Btn)`
  border-top-right-radius: ${borderRadius - 2}px;
  border-bottom-right-radius: ${borderRadius - 2}px;
`;

const noOp = () => {};

const states = {
  left: 'state_left',
  right: 'state_right'
};

const getSelectedState = ({ leftState, rightState }) => {
  if (leftState.defaultSelected) return states.left;
  if (rightState.defaultSelected) return states.right;
  return states.left;
};

const ButtonSwitch = ({ leftState, rightState, className }) => {
  const [selectedState, setSelectedState] = useState(
    getSelectedState({ leftState, rightState })
  );
  const btnClicked = (state, callback) => (e) => {
    setSelectedState(state);
    if (typeof callback === 'function') callback(e);
  };
  return (
    <Container className={className}>
      <LeftBtn
        onClick={btnClicked(states.left, leftState?.onClick || noOp)}
        isSelected={selectedState === states.left}
      >
        {leftState?.label || ''}
      </LeftBtn>
      <RightBtn
        onClick={btnClicked(states.right, rightState?.onClick || noOp)}
        isSelected={selectedState === states.right}
      >
        {rightState?.label || ''}
      </RightBtn>
    </Container>
  );
};

ButtonSwitch.propTypes = {
  leftState: PropTypes.objectOf(PropTypes.any).isRequired,
  rightState: PropTypes.objectOf(PropTypes.any).isRequired,
  className: PropTypes.string
};

ButtonSwitch.defaultProps = {
  className: ''
};

export default ButtonSwitch;
