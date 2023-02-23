import React, { FC } from "react";
import { useState } from "react";

import ImageDetails from "../components/ImageDetails";
import ThumbnailGallery from "../components/ThumbnailGallery";

const Photos: FC = () => {
  const [photos, setPhotos] = useState([]);

  fetch("https://agencyanalytics-api.vercel.app/images.json")
    .then((response) => response.json())
    .then((data) => {
      setPhotos(data);
      // props.setNotification("");
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      // props.setNotification(error.message);
    });

  return (
    <div className="photos-container flex-row">
      <div className="flex-col-two-thirds p-20 bg--lightgray">
        <h1>Photos</h1>
        <ThumbnailGallery title="Thumbnail Gallery" photos={photos} />
      </div>
      <div className="flex-col-one-third p-20">
        <ImageDetails title="Image Details" />
      </div>
    </div>
  );
};

export default Photos;
