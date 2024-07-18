export interface IClub {
    _id: string; //id
    name: string
    logo: {
        fileId: string;
        url: string;
    } // imagekit path
    overview: string
    description: string
    genre: string
    colorTheme: string
    location: string
    cost: number
    size: number
    meetingsFrequency: string
    email: string
    discord: string
    instagram: string
    facebook: string
    youtube: string
    events: string[]
    validation: boolean
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

export type imagekitURLType = 'default' | 'club'

export type genreType = "Academic" | 
                 "Business & Entrepreneurship" |
                "Charity & Community Service" | 
                "Arts" |
                "Culture" |
                "Environment & Sustainability" |
                "Games & Social" |
                "Health & Well Being" |
                "Politics & Social Awareness" |
                "Sports" |
                "Design Team" |
                "Media Literacy" |
                "Religion & Spirituality"

export type AboutCardType = {
  name: string;
  picture: string;
  about: string;
  initials: string;
}

export type AffiliateType = {
  name: string;
  icon: string;
  initials: string;
}