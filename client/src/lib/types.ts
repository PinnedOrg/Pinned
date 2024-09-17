export interface IReview {
    _id: string;
    engagement: number;
    commitment: number;
    inclusivity: number;
    organization: number;
    comment: string;
    user?: IUser;
}

export interface ILogo {
    fileId: string;
    url: string; // imagekit path
}

export interface IClub {
    _id: string; //id
    name: string;
    logo: ILogo;
    description: string;
    genre: string;
    colorTheme: string;
    location: string;
    cost: number;
    size: number;
    meetingsFrequency: string;
    email: string;
    discord: string;
    instagram: string;
    facebook: string;
    youtube: string;
    events: string[];
    validation: boolean;
    reviews: IReview[]
    avgRating: number;
    featured: number;
    faqs: [{
      title: string, 
      description: string
    }]
}

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

export interface IUser {
  _id: string; //id
  clerkId: string
  clubs: string[]
}

export type ClubContextType = IClub | null;

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
  linkedin: string;
}

export type AffiliateType = {
  name: string;
  icon: string;
  initials: string;
}