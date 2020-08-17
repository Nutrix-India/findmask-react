/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { desktopCanvasSize, mobile } from '@constants/index';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import { Context as MobileContext } from '@contexts/MobileContext';
import Button from '@base/Button';

const jsonPrettyTheme = require('react-json-pretty/dist/monikai');

const increaseWidth = keyframes`
  from {
    width: 0px;
    opacity: 0.3;
  }
  to {
    width: ${desktopCanvasSize}px;
    opacity: 1;
  }
`;

const fadeInScale = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0.3;
  }
  to {
    transform: scale(1);
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
  animation-name: ${({ $isMobile }) =>
    $isMobile ? fadeInScale : increaseWidth};
  animation-duration: 1.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    max-height: ${({ $height }) => $height}px;
    margin-left: 0px;
    margin-top: 20px;
    width: ${({ $width }) => $width}px;
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
      navigator.clipboard
        .writeText(responseText)
        .then(() => {
          setCopyStatus(copyStates.copied);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
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

  const isMobile = useContext(MobileContext);
  const canvasDimensions = useCanvasDimensions();
  return (
    <ResponseContainer
      $borderRadius={borderRadius}
      $isMobile={isMobile}
      $width={canvasDimensions.width}
      $height={canvasDimensions.height}
    >
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
          main:
            'line-height:1.3;color:#656565;background-color:transparent;overflow:auto;',
          value: 'color:#2196f3;'
        }}
        data={responseText}
      />
    </ResponseContainer>
  );
};

Response.propTypes = {
  className: PropTypes.string,
  borderRadius: PropTypes.number
};

Response.defaultProps = {
  className: '',
  borderRadius: 0
};

export default Response;
