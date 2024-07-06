import { AboutCardType, AffiliateType, genreType } from "./types"

export const userUses = 
    [   
        "Connect with new people",
        "Get involved immediately",
        "Stay updated with events", 
        "W.I.P", 
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
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "initials": "EM"  
    },
    {
        "name": "Hazem Saad",
        "picture": "/images/team/Hazem.jpg",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "initials": "HS"
    },
    {
        "name": "Darius Rudaitis",
        "picture": "/images/team/Darius.jpg",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "initials": "DR"
    },
    {
        "name": "Tony Yu",
        "picture": "/images/team/Tony.jpg",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "initials": "TY"
    },
    {
        "name": "Roni Kant",
        "picture": "/images/team/Roni.jpg",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "initials": "RK"
    }
]

export const affiliates: Array<AffiliateType> = [
    {
        icon: '/images/logos/UWLogo.png',
        name: "University of Waterloo",
        initials: "UW"
    },
];


export const testClubData = [
    {
      "_id": "664c08955c58341b46c62acc",
      "name": "Ascend Canada Waterloo Chapter",
      "overview": "This is the short extract that you will be able to see in the directory. This is a filler sentence!!",
      "description": "Full description of Ascend Canada Waterloo Chapter.",
      "genre": "Sports",
      "colorTheme": "#007bff",
      "location": "Waterloo, ON",
      "cost": 0,
      "size": 100,
      "meetingsFrequency": "Weekly",
      "email": "ascend@waterloo.ca",
      "discord": "ascend_discord",
      "instagram": "ascend_instagram",
      "facebook": "ascend_facebook",
      "youtube": "ascend_youtube",
      "events": [],
      "validation": true
    },
    {
      "_id": "66441aa4ccfc04b318c6b662",
      "name": "Pinned",
      "overview": "This is the short extract that you will be able to see in the directory. This is a filler sentence!!",
      "description": "Full description of Pinned.",
      "genre": "Music",
      "colorTheme": "#DC3545",
      "location": "Toronto, ON",
      "cost": 10,
      "size": 50,
      "meetingsFrequency": "Bi-weekly",
      "email": "pinned@music.ca",
      "discord": "pinned_discord",
      "instagram": "pinned_instagram",
      "facebook": "pinned_facebook",
      "youtube": "pinned_youtube",
      "events": [],
      "validation": true
    },
    {
      "_id": "664ea3da37ce17ab6273b2f7",
      "name": "Pinned",
      "overview": "This is the short extract that you will be able to see in the directory.",
      "description": "Full description of Pinned.",
      "genre": "Sports",
      "colorTheme": "#FFC107",
      "location": "Vancouver, BC",
      "cost": 15,
      "size": 10,
      "meetingsFrequency": "Monthly",
      "email": "pinned@sports.ca",
      "discord": "pinned_discord",
      "instagram": "pinned_instagram",
      "facebook": "pinned_facebook",
      "youtube": "pinned_youtube",
      "events": [],
      "validation": true
    },
    {
      "_id": "664ebd77f062c321270e58de",
      "name": "Pinned",
      "overview": "This is the short extract that you will be able to see in the directory.",
      "description": "Full description of Pinned.",
      "genre": "Charity & Community Service",
      "colorTheme": "#28A7",
      "location": "Montreal, QC",
      "cost": 60,
      "size": 30,
      "meetingsFrequency": "Weekly",
      "email": "pinned@charity.ca",
      "discord": "pinned_discord",
      "instagram": "pinned_instagram",
      "facebook": "pinned_facebook",
      "youtube": "pinned_youtube",
      "events": [],
      "validation": true
    },
    {
      "_id": "66441bb1e6c53af82cf6e7ba",
      "name": "Test Club",
      "overview": "This is the short extract that you will be able to see in the directory.",
      "description": "Full description of Test Club.",
      "genre": "Music",
      "colorTheme": "#6610F2",
      "location": "Ottawa, ON",
      "cost": 50,
      "size": 20,
      "meetingsFrequency": "Bi-weekly",
      "email": "testclub@music.ca",
      "discord": "testclub_discord",
      "instagram": "testclub_instagram",
      "facebook": "testclub_facebook",
      "youtube": "testclub_youtube",
      "events": [],
      "validation": true
    }
  ]
  