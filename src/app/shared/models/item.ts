export interface productDetails {
    id: number;
    name: string;
    color: string;
    size: string;
    sizeOptions: [];
    img: string;
    price: number;
    qty: number;
    currentPrice: number;
    editQty: boolean;
    editSize: boolean;
}

export interface brandDetails {
    name: string;
    gender?: string;
    id: number; 
  }
