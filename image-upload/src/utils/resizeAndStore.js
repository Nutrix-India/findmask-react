import Resizer from 'react-image-file-resizer';
import { setImage } from '../store/actions';
import { imageDimensions } from '../constants';

const resizeAndStore = ({ file, dispatch, extension = 'png' }) => {
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
            name: file.name || `${window.btoa(Date.now())}.${extension}`,
            previewUrl: reader.result
          })
        );
      };
      reader.readAsDataURL(uri);
    },
    'blob'
  );
};

export default resizeAndStore;
