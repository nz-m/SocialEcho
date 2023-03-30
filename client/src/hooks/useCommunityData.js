import { useEffect, useState } from "react";

export const useBannerLoading = (banner) => {
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    if (banner) {
      const image = new Image();
      image.onload = () => setBannerLoaded(true);
      image.src = banner;
    }
    return () => {
      setBannerLoaded(false);
    };
  }, [banner]);

  return bannerLoaded;
};

export const useIsModeratorUpdated = (isModerator) => {
  const [isModeratorUpdated, setIsModeratorUpdated] = useState(false);

  useEffect(() => {
    if (isModerator !== null) {
      setIsModeratorUpdated(true);
    }
  }, [isModerator]);

  return isModeratorUpdated;
};
