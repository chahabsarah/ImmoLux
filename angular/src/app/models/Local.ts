export class Local {
  localID!:number;
  localType!: string;
  rent!: number;
  sell!: number;
  bookingPrice!: number;
  localDescription!: string;
  amenities!: string;
  details!: string;
  visitDate!: string;
  images: string[] = [];
  imagesBase64!: string[];
  imageUrls?: string[];
  location!:string;
  user!: any;
  likes!: number;
  isLikedByUser?: boolean;
}

