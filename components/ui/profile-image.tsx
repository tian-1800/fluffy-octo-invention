"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useGetProfileQuery } from "@/lib/redux/services/member-api";
import fallbackImage from "@/assets/images/Profile Photo.png";

const ProfileImage = () => {
  const { data: profile } = useGetProfileQuery();

  const [imgSrc, setImgSrc] = useState<string | StaticImageData | undefined>(
    profile?.profile_image
  );

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <Image
      src={imgSrc || fallbackImage}
      alt="Profile picture"
      fill
      className="rounded-full object-cover"
      onError={handleImageError}
    />
  );
};

export default ProfileImage;
