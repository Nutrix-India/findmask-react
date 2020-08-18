import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RoundedIcon from '@base/RoundedIcon';
import { getImage } from '@utils/imageHelper';

const Link = styled.a`
  display: none;
`;

const Download = ({ canvasRef, className }) => {
  const imageName = useSelector(({ data }) => data.image?.name || '');
  const linkRef = useRef();
  const onClick = () => {
    linkRef.current.href = canvasRef.current.toDataURL();
    linkRef.current.download = `nutrix-ind-${imageName}`;
    linkRef.current.click();
  };
  return (
    <>
      <RoundedIcon
        imgSrc={getImage('/images/download.svg')}
        size={50}
        onClick={onClick}
        className={className}
      />
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link ref={linkRef} />
    </>
  );
};

Download.propTypes = {
  canvasRef: PropTypes.objectOf(PropTypes.any).isRequired,
  className: PropTypes.string
};

Download.defaultProps = {
  className: ''
};

export default Download;
