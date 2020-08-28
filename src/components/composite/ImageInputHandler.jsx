import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { imageInputModes, mobile } from '@constants/index';
import { setImage, resetData, setImageInputMode } from '@actions/index';
import { apiTypes } from '@actionTypes/index';
import resizeAndStore from '@utils/resizeAndStore';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import Button from '@base/Button';
import Text from '@base/Text';
import { Context as MobileContext } from '@contexts/MobileContext';

const FileInput = styled.input`
  display: none;
`;

const Title = styled(Text)`
  font-size: 16px;
  margin-top: 50px;
  color: ${({ theme }) => theme.colors.blueGreen};
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 66%;
    margin: auto;
    margin-top: 26px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TakePicButton = styled(Button)`
  margin-left: 20px;
`;

const ImageInputHandler = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const resetApp = () => {
    dispatch(resetData());
    dispatch({ type: `${apiTypes.SEND_FOR_ANALYSIS}_RESET_API_CALL` });
    dispatch({ type: `${apiTypes.SEND_FEEDBACK}_RESET_API_CALL` });
  };
  const onClick = () => {
    resetApp();
    dispatch(setImageInputMode(imageInputModes.chooseFile));
    dispatch(setImage({ isLoading: true }));
    inputRef.current.click();
  };
  const canvasDimensions = useCanvasDimensions();
  const handleImageLoad = (evt) => {
    if (evt.target.files[0]) {
      resizeAndStore({
        file: evt.target.files[0],
        dispatch,
        width: canvasDimensions.width,
        height: canvasDimensions.height
      });
    }
  };
  const onTakePicClick = () => {
    resetApp();
    dispatch(setImageInputMode(imageInputModes.takePic));
  };
  const isMobileDevice = useContext(MobileContext);
  return (
    <>
      <Title>
        {'A Deep Learning based '}
        <u>server-less</u>
        <strong> REST API</strong>
        {' client'}
      </Title>
      <FileInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageLoad}
      />
      <ButtonsContainer>
        <Button label="Choose File" onClick={onClick} />
        {!isMobileDevice && (
          <TakePicButton label="Take Picture" onClick={onTakePicClick} />
        )}
      </ButtonsContainer>
    </>
  );
};

export default ImageInputHandler;
