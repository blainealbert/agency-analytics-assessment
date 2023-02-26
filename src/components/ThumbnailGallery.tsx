import React, { FC, useState, useEffect, useMemo } from "react";

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
  const [currentTabItem, setCurrentTabItem] = useState("Recently Added");
  // const [sortedFilteredPhotos, setSortedFilteredPhotos] =
  useState<Photo[]>(photos);

  const sortedFilteredPhotos = useMemo(() => {
    console.log("sortedFilterPhotos");

    if (currentTabItem === "Recently Added") {
      return photos.sort(function (a, b) {
        const timeStampA = new Date(a.createdAt).getTime();
        const timeStampB = new Date(b.createdAt).getTime();
        return timeStampB - timeStampA;
      });
    } else if (currentTabItem === "Favorited") {
      const favoritedPhotos = photos.filter((val) => val.favorited);
      console.log("favorited photo array: ", favoritedPhotos);
      return favoritedPhotos;
    }
    return photos;
  }, [currentTabItem, photos]);

  // Select first item by default on mount
  useEffect(() => {
    if (sortedFilteredPhotos.length > 0) {
      console.log("Setting selected image to first in list on mount");
      handlePhotoSelection(photos[0]);
    }
  }, []);

  function handlePhotoSelection(photo: Photo) {
    console.log("Selecting photo: ", photo);
    setSelectedPhoto(photo);
  }

  function handleTabClick(tabValue: string) {
    console.log("Selecting tab item: ", tabValue);
    if (tabValue !== currentTabItem) {
      setCurrentTabItem(tabValue);
    }
  }

  return (
    <div className="thumbnail-gallery">
      <div className="tab-container bb--gray">
        <div
          className={`tab-item ${
            currentTabItem === "Recently Added" ? "tab-item--active" : ""
          }`}
          onClick={() => handleTabClick("Recently Added")}
        >
          Recently Added
        </div>
        <div
          className={`tab-item ${
            currentTabItem === "Favorited" ? "tab-item--active" : ""
          }`}
          onClick={() => handleTabClick("Favorited")}
        >
          Favourited
        </div>
      </div>
      <div className="photo-list fade-in">
        {sortedFilteredPhotos.map((photo, index) => (
          <div className="photo-list__item" key={photo.id}>
            <div
              className={`
              photo-list__img-wrapper ${
                selectedPhoto.id === photo.id
                  ? "photo-list__img-wrapper photo-list__img-wrapper--selected"
                  : "photo-list__img-wrapper"
              }
              `}
            >
              <img
                className="photo-list__img"
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
