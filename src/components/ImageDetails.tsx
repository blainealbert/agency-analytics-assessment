import React, { FC, useMemo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
  favorited: boolean;
};
interface ImageDetailsProps {
  selectedPhoto: Photo;
  favoriteToggleSelectedPhoto: Function;
  deleteSelectedPhoto: Function;
}

const ImageDetails: FC<ImageDetailsProps> = ({
  selectedPhoto,
  favoriteToggleSelectedPhoto,
  deleteSelectedPhoto,
}) => {
  const [fileSizeMB, createdAtFormatted, updatedAtFormatted] = useMemo(() => {
    return [
      `${
        selectedPhoto.sizeInBytes > 0
          ? (selectedPhoto.sizeInBytes / 1048576).toFixed(2) + " MB"
          : ""
      }`,
      `${
        selectedPhoto.createdAt
          ? new Date(selectedPhoto.createdAt).toLocaleDateString("en-CA", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : ""
      }`,
      `${
        selectedPhoto.updatedAt
          ? new Date(selectedPhoto.updatedAt).toLocaleDateString("en-CA", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : ""
      }`,
    ];
  }, [selectedPhoto]);

  function handleFavoriteToggle(photo: Photo) {
    console.log(
      "Toggling favorite status of " +
        photo.filename +
        " from " +
        photo.favorited +
        " to " +
        !photo.favorited
    );
    favoriteToggleSelectedPhoto();
  }

  function handleDelete(photo: Photo) {
    console.log("Deleting photo with filename: ", photo.filename);
    deleteSelectedPhoto();
  }

  return (
    <div className="image-details-container">
      <div className="image-details__preview">
        <img
          className="image-details__photo"
          src={selectedPhoto.url}
          alt={selectedPhoto.description}
        />
        <div className="flex-row flex-space-between flex-align-center">
          <h3 className="image-details__filename">{selectedPhoto.filename}</h3>{" "}
          {selectedPhoto.favorited ? (
            <FavoriteIcon
              className="image-details__favorited image-details__favorited--active"
              onClick={() => handleFavoriteToggle(selectedPhoto)}
            />
          ) : (
            <FavoriteBorderIcon
              className="image-details__favorited image-details__favorited--inactive"
              onClick={() => handleFavoriteToggle(selectedPhoto)}
            />
          )}
        </div>
        <p className="image-details__filesize text-secondary">{fileSizeMB}</p>
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
            <p className=" text-right">{createdAtFormatted}</p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Last Modified</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">{updatedAtFormatted}</p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Dimensions</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">
              {selectedPhoto.dimensions.width +
                " x " +
                selectedPhoto.dimensions.height}
            </p>
          </div>
        </div>
        <div className="flex-row bb--gray">
          <div className="flex-col-half">
            <p className="text-secondary">Resolution</p>
          </div>
          <div className="flex-col-half">
            <p className=" text-right">
              {selectedPhoto.resolution.width +
                " x " +
                selectedPhoto.resolution.height}
            </p>
          </div>
        </div>
      </div>
      <div className="image-details__description">
        <div className="flex-row">
          <div className="flex-col-full">
            <h3>Description</h3>
            {selectedPhoto.description ? (
              <p className="text-secondary">{selectedPhoto.description}</p>
            ) : (
              <p className="text-secondary">No description.</p>
            )}
            <button className="btn" onClick={() => handleDelete(selectedPhoto)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
