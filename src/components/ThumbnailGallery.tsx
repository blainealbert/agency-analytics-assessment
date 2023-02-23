import React, { FC } from "react";

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
};

interface ThumbnailGalleryProps {
  title: string;
  photos: Photos[];
}

const ThumbnailGallery: FC<ThumbnailGalleryProps> = ({ title, photos }) => {
  return (
    <div className="thumbnail-gallery">
      <h1>{title}</h1>
      <div className="photo-list">
        {photos.map((photo) => (
          <div className="photo-list__item" key={photo.id}>
            <img
              className="photo-list__img"
              src={photo.url}
              alt={photo.description}
            />
            <p className="photo-list__file-name">{photo.filename}</p>
            <p className="photo-list__file-size text-gray">
              {(photo.sizeInBytes / 1048576).toFixed(2) + " MB"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailGallery;
