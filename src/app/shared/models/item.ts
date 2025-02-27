export interface product {
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

export interface Brand {
    name: string;
    gender?: string;
    id: number; 
  }
