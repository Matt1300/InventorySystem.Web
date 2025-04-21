
export interface Product {
  id: number;
  name: string;
  description: string;
  code: string;
  quantity: number;
  actualPrice: number;
  isActive: boolean;
}


export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  code: string;
  quantity: number;
  actualPrice: number;
  prices: Price[];
}

export interface Price {
  id: number;
  quantity: number;
  batchNumber: string;
  entryDate: Date;
  price: number;
}


export interface UpdateProduct {
  name: string;
  description: string;
  code: string;
  isActive: boolean;
}

export interface UpdateResponse {
  id: number;
  name: string;
  description: string;
  code: string;
  isActive: boolean;
}
