import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: inline-block;
  margin: auto;
  height: 8px;
  border-radius: 8px;
  width: 60%;
  background-color: #676767;
`;


const Bar = styled.div.attrs(({ value }) => ({
  style: {
    width: `${value}%`
  }
}))`
  height: 100%;
  background-color: #189fdc;
  transition: width 300ms ease;
  border-radius: 8px;
`;

const Progressbar = ({ value }) => {
  return (
    <Wrapper>
      <Container>
        <Bar value={value} />
      </Container>
    </Wrapper>
  );
};

export default Progressbar;
