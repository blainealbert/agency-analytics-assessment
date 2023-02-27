import React, { FC, useEffect, useState } from "react";

import ImageDetails from "../components/ImageDetails";
import ThumbnailGallery from "../components/ThumbnailGallery";
import CircularProgress from "@mui/material/CircularProgress";

import { Photo } from "../models/Photo";

const Photos: FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  // setting an empty photo in case there are no images to render
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>({
    id: "",
    url: "",
    filename: "",
    description: "",
    uploadedBy: "",
    createdAt: "",
    updatedAt: "",
    dimensions: {
      width: 0,
      height: 0,
    },
    resolution: {
      width: 0,
      height: 0,
    },
    sizeInBytes: 0,
    favorited: false,
  });

  // Load Photo JSON from API
  useEffect(() => {
    fetch("https://agencyanalytics-api.vercel.app/images.json")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        console.log("Photo JSON loaded:", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Toggle favorited photo state
  function favoriteToggleSelectedPhoto() {
    // console.log("favoriteToggleSelectedPhoto for: ", selectedPhoto.filename);
    // update favorited state to a temp array and save
    const tempPhotos: Photo[] = [...photos];
    const selectedPhotoIndex: number = getIndexFromSelectedPhoto(selectedPhoto);
    tempPhotos[selectedPhotoIndex].favorited =
      !tempPhotos[selectedPhotoIndex].favorited;
    setPhotos(tempPhotos);
  }

  function deleteSelectedPhoto() {
    // console.log("deleteSelectedPhoto", selectedPhoto);
    const tempPhotos: Photo[] = [...photos];
    const selectedPhotoIndex: number = getIndexFromSelectedPhoto(selectedPhoto);
    tempPhotos.splice(selectedPhotoIndex, 1);
    setPhotos(tempPhotos);
    // set selected photo back to first choice
    if (photos.length > 0) {
      setSelectedPhoto(photos[0]);
    }
  }

  function getIndexFromSelectedPhoto(photo: Photo): number {
    let matchingIndex: number = 0;
    photos.forEach((element, i) => {
      if (element.id === selectedPhoto.id) {
        matchingIndex = i;
      }
    });
    return matchingIndex;
  }

  // Displays loading when array is empty
  if (photos.length === 0) {
    return (
      <div className="loading-wrapper">
        <CircularProgress className="loading-icon" />
      </div>
    );
  }

  return (
    <div className="photos-container flex-row">
      <div className="flex-col-full p-20 bg--lightgray">
        <h1>Photos</h1>
        <ThumbnailGallery
          photos={photos}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      </div>
      <div className="flex-col-full mw-400px p-20 bl--gray">
        <ImageDetails
          selectedPhoto={selectedPhoto}
          favoriteToggleSelectedPhoto={favoriteToggleSelectedPhoto}
          deleteSelectedPhoto={deleteSelectedPhoto}
        />
      </div>
    </div>
  );
};

export default Photos;
