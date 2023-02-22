import React, { FC } from 'react';
import { useState } from 'react';

import ImageDetails from '../components/ImageDetails';
import ThumbnailGallery from '../components/ThumbnailGallery';

const Photos: FC = () => {
    const [photos, setPhotos] = useState([]);

    fetch('https://agencyanalytics-api.vercel.app/images.json')
            .then(response => response.json())
            .then(data => {
                setPhotos(data);
                // props.setNotification("");
                console.log(data);
            })
            .catch(error => {
                console.log(error);
                // props.setNotification(error.message);
            }
        );
  return (
    <>
      <h1>Photos</h1>
      <ThumbnailGallery 
        title='Thumbnail Gallery'
        photos={photos}
      />
      <ImageDetails title='Image Details'
      />
    </>
  );
};

export default Photos;