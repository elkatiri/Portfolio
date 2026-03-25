"use client";

export const CV_DOWNLOAD_EVENT = "cv-download-celebration";

type CelebrationSource = {
  clientX?: number;
  clientY?: number;
};

export function triggerCvCelebration(source?: CelebrationSource) {
  if (typeof window === "undefined") {
    return;
  }

  const hasCoordinates =
    typeof source?.clientX === "number" && typeof source?.clientY === "number"
    && (source.clientX > 0 || source.clientY > 0);

  const detail = {
    x: hasCoordinates ? source.clientX : window.innerWidth / 2,
    y: hasCoordinates ? source.clientY : Math.min(window.innerHeight * 0.32, 260),
  };

  window.dispatchEvent(new CustomEvent(CV_DOWNLOAD_EVENT, { detail }));
}