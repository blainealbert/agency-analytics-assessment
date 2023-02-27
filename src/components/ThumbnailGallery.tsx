import React, { FC, useState, useEffect, useMemo, useCallback } from "react";

import { Photo } from "../models/Photo";

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

  const sortedFilteredPhotos = useMemo(() => {
    // console.log("sorting and filtering photos");
    if (currentTabItem === "Recently Added") {
      const tempPhotos: Photo[] = photos.sort(function (a, b) {
        const timeStampA = new Date(a.createdAt).getTime();
        const timeStampB = new Date(b.createdAt).getTime();
        return timeStampB - timeStampA;
      });
      return tempPhotos;
    } else if (currentTabItem === "Favorited") {
      const favoritedPhotos: Photo[] = photos.filter((val) => val.favorited);
      // console.log("favorited photo array: ", favoritedPhotos);
      return favoritedPhotos;
    }
    return photos;
  }, [photos, currentTabItem]);

  // recalculate sizeInMB value when photos update
  const sizeInMB = useCallback(
    (sizeInBytes: number) => {
      return (sizeInBytes / 1048576).toFixed(2) + " MB";
    },
    [photos]
  );

  // Select first item by default on mount
  useEffect(() => {
    if (sortedFilteredPhotos.length > 0) {
      // console.log("Setting selected image to first in list on mount");
      handlePhotoSelection(photos[0]);
    }
  }, []);

  function handlePhotoSelection(photo: Photo) {
    // console.log("Selecting photo: ", photo);
    setSelectedPhoto(photo);
  }

  function handleTabClick(tabValue: string) {
    // console.log("Selecting tab item: ", tabValue);
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
              {sizeInMB(photo.sizeInBytes)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailGallery;
