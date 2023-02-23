import React, { FC } from "react";

interface ImageDetailsProps {
  title: string;
}

const ImageDetails: FC<ImageDetailsProps> = ({ title }) => {
  return (
    <div className="image-details-container">
      <h1>{title}</h1>
      <div className="image-details__preview">
        <h3 className="image-details__filename">filename</h3>
        <p className="image-details__filesize">filesize</p>
      </div>
      <div className="image-details__information">
        <h3>Information</h3>
        <hr />
        <div className="flex-row">
          <p className="flex-col-half">Uploaded by</p>
          <p className="flex-col-half text-right text-gray">--</p>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
