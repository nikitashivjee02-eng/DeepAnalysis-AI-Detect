
const normalizeBaseUrl = (value, fallback) =>
  (value || fallback).replace(/\/+$/, "");

export const AUTH_API_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_AUTH_API_URL,
  "http://localhost:5003"
);

export const IMAGE_API_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_IMAGE_API_URL,
  "http://127.0.0.1:5002"
);

export const AUDIO_API_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_AUDIO_API_URL,
  "http://127.0.0.1:5001"
);

export const VIDEO_API_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_VIDEO_API_URL,
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : ""
);

export const authUrl = (path) =>
  `${AUTH_API_URL}${path.startsWith("/") ? path : `/${path}`}`;
