import React, { FC } from 'react';

interface ImageDetailsProps {
  title: string;
}

const ImageDetails: FC<ImageDetailsProps> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default ImageDetails;