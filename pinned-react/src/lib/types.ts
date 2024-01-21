export interface BoardInterface {
    _id: string; //id
    name: string;
    about: string;
    publicStatus: boolean;
    owner: string; //id
    admins: string[]; //id
    subscribers: string[]; //id
    location: string;
    events: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type BoardContextType = BoardInterface | null;

export interface EventInterface {
    _id: string;
    title: string;
    description: string
    contact: string
    tags: string[] //id of tags
    date: Date;
    time: string;
    location: string
    preview: Buffer
    belongsToBoard: string; //id
    createdAt: Date;
    updatedAt: Date;
}