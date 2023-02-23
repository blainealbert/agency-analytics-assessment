import React, { FC } from "react";

type Photos = {
  id: string;
  url: string;
  filename: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    width: number;
    height: number;
  };
  resolution: {
    width: number;
    height: number;
  };
  sizeInBytes: number;
  // sharedWith:
  favorited: boolean;
};

interface ThumbnailGalleryProps {
  photos: Photos[];
  setSelectedPhoto: Function;
}

const ThumbnailGallery: FC<ThumbnailGalleryProps> = ({
  photos,
  setSelectedPhoto,
}) => {
  function handlePhotoSelection(photo: object) {
    console.log("Selecting photo: ", photo);
    setSelectedPhoto(photo);
  }

  return (
    <div className="thumbnail-gallery">
      <div className="photo-list">
        {photos.map((photo) => (
          <div className="photo-list__item" key={photo.id}>
            <img
              className="photo-list__img"
              src={photo.url}
              alt={photo.description}
              onClick={() => handlePhotoSelection(photo)}
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
