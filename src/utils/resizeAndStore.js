import Resizer from 'react-image-file-resizer';
import { setImage } from '@actions/index';
import { removeExtension } from '@utils/imageHelper';

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
      const fileName = file.name?.trim() || `${window.btoa(Date.now())}.`;
      reader.onloadend = () => {
        dispatch(
          setImage({
            uri,
            name: `${removeExtension(fileName)}.${extension}`,
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
