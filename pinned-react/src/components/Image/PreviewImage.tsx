import { Buffer } from 'buffer';

type PreviewImageProps = {
    preview: {
      data: {
        data: Buffer
      };
      extension: string;
  },
  alt: string; // optional
  className?: string; // optional
}

const PreviewImage = ({ preview, alt, className }: PreviewImageProps) => {

    if (preview.data == null) {
      console.error('No image data provided.');
      return null;
    }
    
    const base64String = Buffer.from(preview.data.data);

    return (
      <img src={`data:${preview.extension};base64,${base64String}`} alt={alt} className={className ? className : ""}/>
    );
  };

export default PreviewImage;