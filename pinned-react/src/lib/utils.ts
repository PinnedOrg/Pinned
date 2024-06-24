import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hexToRGBObject(hex: string) {
  let r = 0, g = 0, b = 0;

  // 6 digits hexcode
  r = parseInt("0x" + hex[1] + hex[2]);
  g = parseInt("0x" + hex[3] + hex[4]);
  b = parseInt("0x" + hex[5] + hex[6]);

  return {r: +r, g: +g, b: +b};
}

export function tintColor (hexColor: string, tintFactor: number) {
  const rgb = hexToRGBObject(hexColor);
  const tintedRgb = {
    r: Math.floor(rgb.r * tintFactor),
    g: Math.floor(rgb.g * tintFactor),
    b: Math.floor(rgb.b * tintFactor),
  };
  return `rgb(${tintedRgb.r}, ${tintedRgb.g}, ${tintedRgb.b})`;
};


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
});