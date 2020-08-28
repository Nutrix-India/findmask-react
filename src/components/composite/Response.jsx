/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext, useMemo } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { desktopCanvasSize, mobile } from '@constants/index';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import { Context as MobileContext } from '@contexts/MobileContext';
// import Button from '@base/Button';
import ButtonSwitch from '@base/ButtonSwitch';

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

const TextResponse = styled.div`
  padding-top: 10px;
  float: right;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  color: ${({ theme }) => theme.colors.blueGreen};
  text-align: left;
  font-size: 14px;
`;

const ValueContainer = styled.div`
  margin-bottom: 12px;
`;

const Value = styled.span`
  font-weight: bold;
`;

const ColorsInfo = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.blueGreen};
  font-size: 14px;
`;

const ColorInfo = styled.div`
  padding: 6px 0px;
  display: flex;
  align-items: center;
`;

const Color = styled.div`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.blueGreen};
`;

const ColorInfoLabel = styled.div`
  margin-left: 12px;
  position: relative;
  top: -3px;
`;

const JsonPretty = styled(JSONPretty)`
  display: inline-block;
  flex: 0 1 auto;
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
  padding-bottom: 10px;
  float: right;
  flex-shrink: 0;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.blueGreen};
  flex: 1 1 auto;
  text-align: left;
`;

const StyledSwitch = styled(ButtonSwitch)`
  margin: 0px 12px;
`;

// const CopyBtn = styled(Button)`
//   border-radius: 5px;
//   background-color: ${({ theme }) => theme.colors.blueGrey};
//   color: ${({ theme }) => theme.colors.white};
//   text-align: center;
//   padding: 5px;
//   font-size: 12px;
// `;

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

const responseTypes = {
  text: 'response_text',
  json: 'response_json'
};

const Response = ({ className, borderRadius }) => {
  const response = useSelector(({ data }) => data.response);
  // const threshold = useSelector(({ data }) => data.threshold);
  const [width, setWidth] = useState(0);
  const [copyStatus, setCopyStatus] = useState(copyStates.notUsed);
  const [responseType, setResponseType] = useState(responseTypes.text);
  const onResponseTypeChange = (type) => () => {
    setResponseType(type);
  };
  useEffect(() => {
    setWidth(370);
  }, []);

  const responseText = JSON.stringify(response, null, 2);
  const [
    totalFaces,
    facesWithProperMask,
    facesWithImproperMask,
    facesWithoutMask
  ] = useMemo(() => {
    const map = response?.image_details?.face?.id;
    return Object.keys(map).reduce(
      (data, faceId) => {
        const _totalFaces = data[0];
        const _facesWithProperMask = data[1];
        const _facesWithImproperMask = data[2];
        const _facesWithoutMask = data[3];
        return [
          _totalFaces + 1,
          _facesWithProperMask +
            (map[faceId]?.pred_class === 'with_mask' ? 1 : 0),
          _facesWithImproperMask +
            (map[faceId]?.pred_class === 'mask_weared_incorrect' ? 1 : 0),
          _facesWithoutMask +
            (map[faceId]?.pred_class === 'without_mask' ? 1 : 0)
        ];
      },
      [0, 0, 0, 0]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.image_details.face]);

  // const onClickCopy = () => {
  //   if (copyStatus !== copyStates.copying) {
  //     setCopyStatus(copyStates.copying);
  //     navigator.clipboard
  //       .writeText(responseText)
  //       .then(() => {
  //         setCopyStatus(copyStates.copied);
  //       })
  //       .catch((err) => {
  //         // eslint-disable-next-line no-console
  //         console.error(err);
  //       });
  //   }
  // };

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
  const theme = useContext(ThemeContext);

  return (
    <ResponseContainer
      $borderRadius={borderRadius}
      $isMobile={isMobile}
      $width={canvasDimensions.width}
      $height={canvasDimensions.height}
    >
      <HeaderContainer>
        <Header>Response</Header>
        <StyledSwitch
          leftState={{
            label: 'Text',
            defaultSelected: responseType === responseTypes.text,
            onClick: onResponseTypeChange(responseTypes.text)
          }}
          rightState={{
            label: 'Json',
            defaultSelected: responseType === responseTypes.json,
            onClick: onResponseTypeChange(responseTypes.json)
          }}
        />
        {/* <CopyBtn label={copyStatus} onClick={onClickCopy} /> */}
      </HeaderContainer>
      <HRule />
      {responseType === responseTypes.text && (
        <>
          <TextResponse>
            <ValueContainer>
              No. of faces:&nbsp;
              <Value>{totalFaces}</Value>
            </ValueContainer>
            <ValueContainer>
              No. of faces with proper masks:&nbsp;
              <Value>{facesWithProperMask}</Value>
            </ValueContainer>
            <ValueContainer>
              No. of faces with improper masks:&nbsp;
              <Value>{facesWithImproperMask}</Value>
            </ValueContainer>
            <ValueContainer>
              No. of faces without masks:&nbsp;
              <Value>{facesWithoutMask}</Value>
            </ValueContainer>
          </TextResponse>
          <ColorsInfo>
            {[
              { color: theme.colors.green, desc: 'wearing mask properly' },
              { color: theme.colors.yellow, desc: 'wearing mask improperly' },
              { color: theme.colors.red, desc: 'not wearing mask' }
            ].map((colorInfo) => (
              <ColorInfo key={colorInfo.color}>
                <Color $color={colorInfo.color} />
                <ColorInfoLabel>{colorInfo.desc}</ColorInfoLabel>
              </ColorInfo>
            ))}
          </ColorsInfo>
        </>
      )}
      {responseType === responseTypes.json && (
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
      )}
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
