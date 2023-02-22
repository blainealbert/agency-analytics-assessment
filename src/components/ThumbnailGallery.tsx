import React, { FC } from 'react';

type Photos = {
    id: string;
    url: string;
    filename: string;
    description: string;
    uploadedBy: string;
    createdAt: string;
    dimensions: number[];
    resolution: number[];
    sizeInBytes: number;
    // sharedWith: 
    favorited: boolean;
}

interface ThumbnailGalleryProps {
  title: string;
  photos: Photos[];
}

const ThumbnailGallery: FC<ThumbnailGalleryProps> = ({ title, photos }) => {
  return (
    <>
      <h1>{title}</h1>
    {photos.map(photo => (
        <div className="photo-list__item" key={photo.id}>
            <img src={photo.url}/>
            <p className="photo-list__file-name">{photo.filename}</p>
            <p className="photo-list__file-size">{(photo.sizeInBytes / 1048576).toFixed(2) + " MB"}</p>
        </div>
    ))}
    </>
  );
};

export default ThumbnailGallery;