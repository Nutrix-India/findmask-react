import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { imageDimensions, imageInputModes, mobile } from '../../constants';
import { setImage, resetData, setImageInputMode } from '../../store/actions';
import { apiTypes } from '../../store/actionTypes';
import Button from '../Button';
import { Context as MobileContext } from '../../context/MobileContext';

const FileInput = styled.input`
  display: none;
`;

const TItle = styled.div`
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.05rem;
  margin-top: 50px;
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

const resizeAndStore = (file, dispatch) => {
    Resizer.imageFileResizer(
      file,
      imageDimensions.width,
      imageDimensions.height,
      'JPEG',
      100,
      0,
      (uri) => {
        console.log(uri);
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            setImage({
              uri,
              name: file.name,
              previewUrl: reader.result
            })
          );
        };
        reader.readAsDataURL(uri);
      },
      'blob'
    );
};

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
  const handleImageLoad = (evt) => {
    resizeAndStore(evt.target.files[0], dispatch);
  };
  const onTakePicClick = () => {
    resetApp();
    dispatch(setImageInputMode(imageInputModes.takePic));
  };
  const isMobileDevice = useContext(MobileContext);
  return (
    <>
      <TItle>Only choose file types <strong>JPG | GIF | PNG | JPEG</strong></TItle>
      <FileInput ref={inputRef} type="file" accept="image/*" onChange={handleImageLoad} />
      <ButtonsContainer>
        <Button label="Choose File" onClick={onClick} />
        {!isMobileDevice && <TakePicButton label="Take Picture" onClick={onTakePicClick} />}
      </ButtonsContainer>
    </>
  );
};

export default ImageInputHandler;
