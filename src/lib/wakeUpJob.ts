export interface WakeUpJob {
    url: string;
    frequency: Frequency;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum Frequency {
    Daily = 0,
    Every12Hours = 1,
    Every6Hours = 2,
    Every3Hours = 3,
    EveryHour = 4,
    Every30Min = 5,
    Every15Min = 6,
    Every5Min = 7,
}