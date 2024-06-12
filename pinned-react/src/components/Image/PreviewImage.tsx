import { Buffer } from 'buffer';
interface Preview {
  data: {
    data: Buffer;
  };
  extension: string;
}

const PreviewImage: React.FC<{ preview: Preview }> = ({ preview }) => {

    if (preview.data == null) {
      console.error('No image data provided.');
      return null;
    }
    
    const base64String = Buffer.from(preview.data.data);
    return (
      <img src={`data:${preview.extension};base64,${base64String}`}/>
    );
  };

export default PreviewImage;