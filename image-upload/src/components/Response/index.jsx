import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JSONPretty from 'react-json-pretty';

const jsonPrettyTheme = require('react-json-pretty/dist/monikai');

const JsonPretty = styled(JSONPretty)`
  display: inline-block;
  overflow: hidden;
  padding-left: 20px;
  width: ${({ $width }) => `${$width}px`};
  transition: width 1s ease;
  pre {
    float: right;
  }
`;

const Response = ({ responseData, responseWidth }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(responseWidth);
  }, [responseWidth]);
  return (
    <JsonPretty
      $width={width}
      theme={{
        ...jsonPrettyTheme,
        main: 'line-height:1.3;color:#656565;background-color:transparent;overflow:auto;',
        value: 'color:#2196f3;'
      }}
      data={JSON.stringify(responseData.response, null, 2)}
    />
  );
};

export default Response;
