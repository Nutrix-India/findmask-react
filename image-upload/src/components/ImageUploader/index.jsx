import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import Resizer from 'react-image-file-resizer';
import ImageUploader from 'react-images-upload';
import { appStatus } from '../../constants';
import Button from '../Button';
import PreviewResponse from '../PreviewResponse';

const StyledButton = styled(Button)`
  margin-bottom: 20px;
  cursor: ${({ $status }) => [appStatus.uploading, appStatus.analyziing].includes($status) ? 'not-allowed' : 'pointer'};
`;

const initialState = {
  image: {
    uri: null,
    previewUrl: null,
    name: null
  },
  responseData: {
    response: {},
    header: appStatus.default,
  }
};

const ImageUploaderComponent = () => {
  const [image, setImage] = useState(initialState.image);

  const [responseData, setResponseData] = useState(initialState.responseData);

  const [uploadProgress, setUploadProgress] = useState(0);

  const resetState = () => {
    setResponseData(initialState.responseData);
    setImage(initialState.image);
  };

  const imageUploadHandler = () => {
    if ([appStatus.uploading, appStatus.analyziing].includes(responseData.header)) return;
    setResponseData(state => ({
      ...state,
      header: appStatus.uploading,
    }));
    const form_data = new FormData();
    form_data.append("image", image.uri, image.name);
    let url = process.env.REACT_APP_API_URL;

    axios
      .post(url, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(progressEvent.loaded / progressEvent.total * 100);
          if (progressEvent.loaded === progressEvent.total) {
            setResponseData(state => ({
              ...state,
              header: appStatus.analyziing,
            }));
          }
        },
      })
      .then((res) => {
        setResponseData({
          response: res.data,
          header: appStatus.showingResponse,
        });
      })
      .catch((err) => console.log(err));
  };

  const imageSelectedHandler = (pictures) => {
    const reader = new FileReader();
    if (pictures[0]) {
      Resizer.imageFileResizer(
        pictures[0],
        416,
        416,
        "JPEG",
        100,
        0,
        (uri) => {
          reader.onloadend = () => {
            setImage({
              uri,
              name: pictures[0].name,
              previewUrl: reader.result
            });
          };
          reader.readAsDataURL(uri);
        },
        "blob"
      );
    } else {
      setImage({
        uri: null,
        previewUrl: null,
      });
    }
    resetState();
  };

  return (
    <>
      <ImageUploader
        withIcon
        buttonText='Choose image'
        onChange={imageSelectedHandler}
        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
        maxFileSize={5242880}
        singleImage
        label="Max file size: 5mb, accepted: jpg|gif|png|jpeg"
      />
      {image.previewUrl && (
        <PreviewResponse
          image={image}
          responseData={responseData}
          uploadProgress={uploadProgress}
          resetState={resetState}
        />
      )}
      {image.uri && (
        <StyledButton
          label={responseData.header === appStatus.showingResponse ? appStatus.default : responseData.header}
          onClick={imageUploadHandler} $status={responseData.header}
        />
      )}
    </>
  );
};

export default ImageUploaderComponent;
