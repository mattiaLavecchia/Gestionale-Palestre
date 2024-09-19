export interface AccessDetails {
    _id?: string
    customer: {
        _id: string,
        name: string,
        surname: string,
        subscriptionExpires: Date
    },
    access: Date
}