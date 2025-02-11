export interface Table {
    id: string;
    tableNumber: string;
    itemQuantity: number;
    items: {
        id: string;
        name: string;
        value: number;
    } [];
    itemValue: number;
    sum: number;
}