export class Local {
  localType!: string;
  rent!: number;
  sell!: number;
  bookingPrice!: number;
  localDescription!: string;
  amenities!: string;
  details!: string;
  visitDate!: string;
  location!:string;
}

export class LocalWithImagesRequest {
  local!: Local;
  images!: File[];
}
