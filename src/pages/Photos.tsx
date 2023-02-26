import React, { FC, useEffect, useReducer, useState } from "react";

import ImageDetails from "../components/ImageDetails";
import ThumbnailGallery from "../components/ThumbnailGallery";
import CircularProgress from "@mui/material/CircularProgress";

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

const Photos: FC = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [photos, setPhotos] = useState<Photo[]>([]);
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
    console.log("selectedPhoto is: ", selectedPhoto);
    fetch("https://agencyanalytics-api.vercel.app/images.json")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        // props.setNotification("");
        console.log("Photo JSON loaded:", data);
      })
      .catch((error) => {
        console.error(error);
        // props.setNotification(error.message);
      });
  }, []);

  // Toggle favorited photo state
  function favoriteToggleSelectedPhoto() {
    console.log("favoriteToggleSelectedPhoto for: ", selectedPhoto.filename);
    // update favorited state to a temp array and save
    const tempPhotos = photos;
    tempPhotos[getIndexFromSelectedPhoto(selectedPhoto)].favorited =
      !tempPhotos[getIndexFromSelectedPhoto(selectedPhoto)].favorited;
    setSelectedPhoto(tempPhotos[getIndexFromSelectedPhoto(selectedPhoto)]);
    setPhotos(tempPhotos);
    // remove this
    forceUpdate();
  }

  function deleteSelectedPhoto() {
    console.log("deleteSelectedPhoto", selectedPhoto);
    const tempPhotos = photos;
    tempPhotos.splice(getIndexFromSelectedPhoto(selectedPhoto), 1);
    setPhotos(tempPhotos);
    // set selected photo back to first choice
    if (photos.length > 0) {
      setSelectedPhoto(photos[0]);
    }
    // remove this
    forceUpdate();
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

  if (photos.length < 1) {
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
