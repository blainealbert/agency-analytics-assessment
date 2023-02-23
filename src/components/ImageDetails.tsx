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
interface ImageDetailsProps {
  selectedPhoto: Photo;
}

const ImageDetails: FC<ImageDetailsProps> = ({ selectedPhoto }) => {
  return (
    <div className="image-details-container">
      <div className="image-details__preview">
        <img
          className="image-details__photo"
          src={selectedPhoto.url}
          alt={selectedPhoto.description}
        />
        <h3 className="image-details__filename">{selectedPhoto.filename}</h3>
        <p className="image-details__filesize">{selectedPhoto.sizeInBytes}</p>
      </div>
      <div className="image-details__information">
        <div className="flex-row bb--gray">
          <div className="flex-col-full">
            <h3>Information</h3>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Uploaded by</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">{selectedPhoto.uploadedBy}</p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Created</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">{selectedPhoto.createdAt}</p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Last Modified</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">{selectedPhoto.updatedAt}</p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Dimensions</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">
              {selectedPhoto.dimensions.width} x{" "}
              {selectedPhoto.dimensions.height}
            </p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Resolution</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">
              {selectedPhoto.resolution.width} x{" "}
              {selectedPhoto.resolution.height}
            </p>
          </div>
        </div>
      </div>
      <div className="image-details__description">
        <div className="flex-row">
          <div className="flex-col-full">
            <h3>Description</h3>
            <p className="text-secondary">{selectedPhoto.description}</p>
            <button className="btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
