export interface IAddItems {
    id: string;
    name: string;
    description: string;
    numberGroup: {
        price: number;
        quantity: number;
    }
    // price: string;
    // quantity: string;
    total: number;
}

export interface ISellItems {
    address: string;
    customerName: string;
    id: string;
    invoice: string;
    name: string;
    numberGroup: {
        price: number;
        quantity: number;
    }
    remark: string;
    // price: number;
    // quantity: number;
    total: number;
    date: string;
}

export interface IProductSoldCount {
    today: number;
    popular: number;
    total: number;
    most:[{
        name:string,
        count:number
    }]
}