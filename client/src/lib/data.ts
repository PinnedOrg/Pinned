import { AboutCardType, AffiliateType, genreType, imagekitURLType } from "./types"

export const imagekitEndpoints: Record<imagekitURLType, string> = {
    'default': `https://ik.imagekit.io/pinnedorg/${import.meta.env.ENVIRONMENT  === 'Production' ? 'Prod' : 'Dev'}`,
    'club': `https://ik.imagekit.io/pinnedorg/${import.meta.env.ENVIRONMENT  === 'Production' ? 'Prod' : 'Dev'}/Clubs/`,
}

export const userUses = 
    [   
        "Connect with new people",
        "Review and rate clubs", 
        "Get involved immediately",
        "Stay updated with events", 
    ]

export const clubUses =
    [
        "Attract new members",
        "Build your community",
        "Personalize your profile",
        "Promote events",
    ]

export const genreFilters: Record<string, genreType> = {
    "Academic": "Academic",
    "Arts": "Arts",
    "Business & Entrepreneurship": "Business & Entrepreneurship",
    "Charity & Community Service": "Charity & Community Service",
    "Culture": "Culture",
    "Design Team": "Design Team",
    "Environment & Sustainability": "Environment & Sustainability",
    "Games & Social": "Games & Social",
    "Health & Well Being": "Health & Well Being",
    "Media Literacy": "Media Literacy",
    "Politics & Social Awareness": "Politics & Social Awareness",
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

export const team: Array<AboutCardType> = [
    {
        "name": "Eshaan Mehta",
        "picture": "/images/team/Eshaan.jpg",
        "about": "I am a 2B student at the University of Waterloo studying Computer Engineering. I am passionate about software development and enjoy working on projects that have a positive impact on the community.",
        "initials": "EM"  
    },
    {
        "name": "Hazem Saad",
        "picture": "/images/team/Hazem.jpg",
        "about": "I am a 2B student at the University of Waterloo studying Computer Engineering. I am passionate about software development and enjoy working on projects that have a positive impact on the community.",
        "initials": "HS"
    },
    {
        "name": "Darius Rudaitis",
        "picture": "/images/team/Darius.jpg",
        "about": "I am a 2B student at the University of Waterloo studying Computer Engineering. I am passionate about software development and enjoy working on projects that have a positive impact on the community.",
        "initials": "DR"
    },
    {
        "name": "Tony Yu",
        "picture": "/images/team/Tony.jpg",
        "about": "I am a 2B student at the University of Waterloo studying Computer Engineering. I am passionate about software development and enjoy working on projects that have a positive impact on the community.",
        "initials": "TY"
    },
]

export const affiliates: Array<AffiliateType> = [
    {
        icon: '/images/logos/UWLogo.png',
        name: "University of Waterloo",
        initials: "UW"
    },
];


  