import { Buffer } from 'buffer';
interface Preview {
  data: {
    data: Buffer;
  };
  extension: string;
}

const PreviewImage: React.FC<{ preview: Preview }> = ({ preview }) => {

    if (preview.data == null) {
      return null;
    }
    
    const base64String = Buffer.from(preview.data.data);
    return (
      <img src={`data:${preview.extension};base64,${base64String}`} className="object-contain w-full h-full" />
    );
  };

export default PreviewImage;