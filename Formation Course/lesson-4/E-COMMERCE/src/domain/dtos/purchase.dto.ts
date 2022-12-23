export interface PurchaseItemDto {
  idProduct: number;
  quantity: number;
}

export interface PurchaseRequest {
  idUser: string;
  idAdress: number;
  items: PurchaseItemDto[];
}
