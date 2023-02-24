import React, { FC } from "react";

type Photo = {
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
  photos: Photo[];
  setSelectedPhoto: Function;
  selectedPhoto: Photo;
}

const ThumbnailGallery: FC<ThumbnailGalleryProps> = ({
  photos,
  setSelectedPhoto,
  selectedPhoto,
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
            <div
              className={`
              photo-list__img-wrapper ${
                selectedPhoto.id === photo.id
                  ? "photo-list__img-wrapper--selected"
                  : ""
              }
              `}
            >
              <img
                className={"photo-list__img"}
                src={photo.url}
                alt={photo.description}
                onClick={() => handlePhotoSelection(photo)}
              />
            </div>
            <span className="photo-list__file-name">{photo.filename}</span>
            <span className="photo-list__file-size text-gray">
              {(photo.sizeInBytes / 1048576).toFixed(2) + " MB"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailGallery;
