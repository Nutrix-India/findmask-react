import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { canvasDimensions, mobile } from '../../constants';
import { isMobileDevice } from '../../utils/deviceHelper';
import Button from '../Button';

const isMobile = isMobileDevice();

const jsonPrettyTheme = require('react-json-pretty/dist/monikai');

const IncreaseWidth = keyframes`
  from {
    ${isMobile ? 'transform: scale(0.5)' : 'width: 0px'};
    opacity: 0.3;
  }
  to {
    ${isMobile ? 'transform: scale(1)' : 'width: ' + canvasDimensions.width + 'px'};
    opacity: 1;
  }
`;

const ResponseContainer = styled.div`
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  background-color: ${({ theme }) => theme.colors.paleGreen};
  padding: 10px;
  margin-left: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 0px;
  opacity: 0;
  animation-name: ${IncreaseWidth};
  animation-duration: 1.2s;
  animation-timing-funtion: ease-out;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    max-height: ${canvasDimensions.height}px;
    margin-left: 0px;
    margin-top: 20px;
    width: ${canvasDimensions.width}px;
    transform: scale(0.5);
  }
`;

const JsonPretty = styled(JSONPretty)`
  display: inline-block;
  flex: 0 1 auto;
  overflow: hidden;
  overflow: auto;
  padding-top: 10px;
  float: right;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  pre {
    text-align: left;
    margin: 0;
    border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
    width: 100%;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  float: right;
  flex-shrink: 0;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.blueGreen};
`;

const CopyBtn = styled(Button)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.blueGrey};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 3px 5px;
  font-size: 12px;
`;

const HRule = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blueGreenGrey};
  flex-shrink: 0;
`;

const copyStates = {
  notUsed: 'Copy',
  copying: 'Copying',
  copied: 'Copied'
};

const Response = ({ className, borderRadius }) => {
  const response = useSelector(({ data }) => data.response);
  const [width, setWidth] = useState(0);
  const [copyStatus, setCopyStatus] = useState(copyStates.notUsed);
  useEffect(() => {
    setWidth(370);
  }, []);

  const responseText = JSON.stringify(response, null, 2);

  const onClickCopy = () => {
    if (copyStatus !== copyStates.copying) {
      setCopyStatus(copyStates.copying);
      const p = navigator.clipboard
        .writeText(responseText)
        .then(() => {
          setCopyStatus(copyStates.copied);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(p);
    }
  };

  useEffect(() => {
    if (copyStatus === copyStates.copied) {
      const timeoutID = window.setTimeout(() => {
        setCopyStatus(copyStates.notUsed);
      }, 2000);
      return () => {
        window.clearTimeout(timeoutID);
      };
    }
  }, [copyStatus]);

  return (
    <ResponseContainer $borderRadius={borderRadius}>
      <HeaderContainer>
        <Header>Response</Header>
        <CopyBtn label={copyStatus} onClick={onClickCopy} />
      </HeaderContainer>
      <HRule />
      <JsonPretty
        $width={width}
        $borderRadius={borderRadius}
        className={className || ''}
        theme={{
          ...jsonPrettyTheme,
          main: 'line-height:1.3;color:#656565;background-color:transparent;overflow:auto;',
          value: 'color:#2196f3;'
        }}
        data={responseText}
      />
    </ResponseContainer>
  );
};

export default Response;
