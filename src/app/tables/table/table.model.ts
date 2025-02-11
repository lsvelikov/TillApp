export interface Table {
    id: string;
    number: string;
    quantity: number;
    items: {
        id: string;
        name: string;
        value: number;
    } [];
    value: number;
    sum: number;
}