import React from 'react'
import { Buffer } from 'buffer';

const PreviewImage = ({ preview }) => {

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