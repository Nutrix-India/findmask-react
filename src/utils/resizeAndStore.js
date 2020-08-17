import Resizer from 'react-image-file-resizer';
import { setImage } from '@actions/index';

const resizeAndStore = ({
  file,
  dispatch,
  extension = 'png',
  width,
  height
}) => {
  Resizer.imageFileResizer(
    file,
    width,
    height,
    'JPEG',
    100,
    0,
    (uri) => {
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
