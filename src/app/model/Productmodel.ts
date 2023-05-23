export interface IAddItems {
    id: string;
    name: string;
    description: string;
    price: string;
    quantity: string;
    total: number;
}

export interface ISellItems {
    address: string;
    customerName: string;
    id: string;
    invoice: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}