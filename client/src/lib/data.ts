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
        "about": "I am a Computer Engineering student at the University of Waterloo. I love building products for other people, and leading teams in doing so. I oversaw the entire development and design of Pinned, managed the team while developing key frontend and backend features.",
        "initials": "EM",
        "linkedin": "https://www.linkedin.com/in/eshaan-mehta-136a6924b/"  
    },
    {
        "name": "Hazem Saad",
        "picture": "/images/team/Hazem.jpg",
        "about": "I am a Computer Engineering student at the University of Waterloo. I am passionate about full-stack development and building complex features. I was responsible for the backend development of Pinned, including API's, infrastructure and user authentication.",
        "initials": "HS",
        "linkedin": "https://www.linkedin.com/in/hazem-saad/"
    },
    {
        "name": "Darius Rudaitis",
        "picture": "/images/team/Darius.jpg",
        "about": "I am a Computer Engineering student at the University of Waterloo. I specialize in user driven development and product design. I built a web scraper to fetch club data, expiditing the onboarding process for clubs, and developed additional frontend UI.",
        "initials": "DR",
        "linkedin": "https://www.linkedin.com/in/darius-rudaitis/"
    },
    {
        "name": "Tony Yu",
        "picture": "/images/team/Tony.jpg",
        "about": "I am a Computer Engineering student at the University of Waterloo. I focus on full-stack development and user experience. I developed key frontend features, including the club profile, with a focus on user experience and design.",
        "initials": "TY",
        "linkedin": "https://www.linkedin.com/in/yu-tony/"
    },
]

export const affiliates: Array<AffiliateType> = [
    {
        icon: '/images/logos/UWLogo.png',
        name: "University of Waterloo",
        initials: "UW"
    },
];


  