export interface IClub {
    _id: string; //id
    name: string
    overview: string
    description: string
    genre: string
    lastActiveTerm: number
    lastActiveYear: number
    location: string
    cost: number
    meetingsFrequency: string
    email: string
    instagram: string
    facebook: string
    youtube: string
    events: string[]
}

export type ClubContextType = IClub | null;

export interface IEvent {
    _id: string;
    title: string;
    description: string
    contact: string
    tags: string[] //id of tags
    date: Date;
    time: string;
    location: string
    preview: Buffer
    belongsToClub: string; //id
    createdAt: Date;
    updatedAt: Date;
}