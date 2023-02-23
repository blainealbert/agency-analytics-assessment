import React, { FC } from "react";
import { useState } from "react";

import ImageDetails from "../components/ImageDetails";
import ThumbnailGallery from "../components/ThumbnailGallery";

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

  fetch("https://agencyanalytics-api.vercel.app/images.json")
    .then((response) => response.json())
    .then((data) => {
      setPhotos(data);
      // props.setNotification("");
      // console.log(data);
    })
    .catch((error) => {
      console.log(error);
      // props.setNotification(error.message);
    });

  return (
    <div className="photos-container flex-row">
      <div className="flex-col-two-thirds p-20 bg--lightgray">
        <h1>Photos</h1>
        <ThumbnailGallery photos={photos} setSelectedPhoto={setSelectedPhoto} />
      </div>
      <div className="flex-col-one-third p-20">
        <ImageDetails selectedPhoto={selectedPhoto} />
      </div>
    </div>
  );
};

export default Photos;
