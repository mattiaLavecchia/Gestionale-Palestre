export interface PaymentDetails {
    id?: string
    customer: {
        _id: string,
        name: string,
        surname: string,
    },
    paymentDate: Date,
    price: number,
}
