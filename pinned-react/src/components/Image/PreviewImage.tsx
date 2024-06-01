import { Buffer } from 'buffer';

type PreviewImageProps = {
    preview: {
      data: {
        data: Buffer
      };
      extension: string;
  }
}

const PreviewImage = ({ preview }: PreviewImageProps) => {

    if (preview.data == null) {
      console.error('No image data provided.');
      return null;
    }
    
    const base64String = Buffer.from(preview.data.data);

    return (
      <img src={`data:${preview.extension};base64,${base64String}`} alt="here"/>
    );
  };

export default PreviewImage;