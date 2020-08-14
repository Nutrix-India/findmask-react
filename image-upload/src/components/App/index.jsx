import React, { Component } from 'react';
import styled from 'styled-components';
import ImageUploader from '../ImageUploader';

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h4`
  margin-bottom: 2rem;
`;

class App extends Component {
  componentDidMount(){
    document.title = "Mask Detection | Vinay Kudari"
  }  

  render() {
    return (
      <Wrapper>
        <Title>Mask Detection</Title>
        <ImageUploader />
      </Wrapper>
    );
  }
}

export default App;
