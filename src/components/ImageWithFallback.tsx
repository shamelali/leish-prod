import { useState, useMemo } from "react";
import { isCloudinaryUrl } from "../lib/cloudinary-client";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function withCloudinaryTransform(
  src: string,
  width?: number,
  height?: number,
  aspectRatio?: string,
): string {
  if (
    !CLOUD_NAME ||
    !isCloudinaryUrl(src) ||
    (src.includes("/upload/") && !src.split("/upload/")[1].includes(","))
  ) {
    const trans: string[] = ["f_auto", "q_auto"];
    if (width) trans.push(`w_${width}`);
    if (height) trans.push(`h_${height}`);
    if (aspectRatio) trans.push(`ar_${aspectRatio}`);
    if (width || height) trans.push("c_fill");
    if (trans.length <= 2) return src;
    const parts = src.split("/upload/");
    return `${parts[0]}/upload/${trans.join(",")}/${parts[1]}`;
  }
  return src;
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackColor = "bg-gradient-to-br from-rose-100 to-pink-100 dark:from-neutral-800 dark:to-neutral-700",
  width,
  height,
  aspectRatio,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const optimizedSrc = useMemo(
    () => withCloudinaryTransform(src, width, height, aspectRatio),
    [src, width, height, aspectRatio],
  );

  if (error) {
    return (
      <div
        className={`${className} ${fallbackColor} flex items-center justify-center`}
      >
        <svg
          className="w-8 h-8 text-rose-300 dark:text-neutral-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
