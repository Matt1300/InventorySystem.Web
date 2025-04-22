
export interface GetBatches {
  id: number;
  productId: number;
  nameProduct: string;
  price: number;
  quantity: number;
  batchNumber: string;
  entryDate: Date;
}


export interface UpdateBatch {
  price: number;
  quantity: number;
  entryDate: Date;
}
