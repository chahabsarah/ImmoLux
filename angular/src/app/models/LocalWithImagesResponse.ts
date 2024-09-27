import { Image } from "./Image";
import { Local } from "./Local";

export interface LocalWithImagesResponse {
  local: Local;
  images: Image[];
}
