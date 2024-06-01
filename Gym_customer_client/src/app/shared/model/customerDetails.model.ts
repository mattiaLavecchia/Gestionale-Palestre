
export interface CustomerDetails {
    _id?: string | null,
    name: string,
    surname: string,
    birth: Date,
    gender: string,
    subscriptionDuration: number,
    weeklyWorkouts: number,
    accesses: number,
    subscriptionExpires: Date,
    statusSubscription: 'scaduto' | 'in scadenza' | 'in corso',
}

