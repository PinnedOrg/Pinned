export interface IClub {
    _id: string; //id
    name: string
    preview: Buffer | string
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

type genreType = "Academic" | 
                 "Business & Entrepreneurship" |
                "Charity & Community Service" | 
                "Arts" |
                "Culture" |
                "Environment" |
                "Social" |
                "Health & Well Being" |
                "Politics" |
                "Sports" |
                "Design Team" |
                "Media Literacy" |
                "Religion & Spirituality"

const genreFilters: Record<string, string> = {
    "Academic": "Acaedemic",
    "Arts": "Arts",
    "Business & Entrepreneurship": "Business & Entrepreneurship",
    "Charity & Community Service": "Charity & Community Service",
    "Culture": "Cultural",
    "Design Team": "Design Team",
    "Environment & Sustainability": "Environment & Sustainability",
    "Games & Social": "Games & Social",
    "Health & Well Being": "Health & Well Being",
    "Media Literacy": "Media",
    "Politics & Social Awareness": "Politics  & Social Awareness",
    "Religion & Spirituality": "Religion & Spirituality",
    "Sports": "Sports",
  }

export const costFilters: Record<string, string> = {
    "Free": "0",
    "$0 - $10": "10",
    "$10 - $50": "50",
    "Over $50": "51",
  }

export const sizeFilters: Record<string, string> = {
    "Under 20": "20",
    "20 - 50": "50",
    "50 - 100": "100",
    "Over 100": "101"
  }

export const filters: Record<string, Record<string, string>> = {
    "Genre": genreFilters,
    "Cost": costFilters, 
    "Size": sizeFilters,
  }