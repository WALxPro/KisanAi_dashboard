import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
}

const CloudinaryImage = ({
  publicId,
  width = 500,
  height = 500,
}: CloudinaryImageProps) => {
  const cld = new Cloudinary({
    cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "" },
  });

  const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  // Simply return JSX without explicit ReactElement type
  return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;
