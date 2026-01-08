
import type { VideoClip, User, ProjectRequest, Bid, Collaboration, MentorshipSlot, ProjectTask, Goal, LicenseTier, SplitContract } from './types';

const jane_creator: User = { 
  id: 'u0', 
  name: 'Jane Creator', 
  avatarUrl: 'https://i.pravatar.cc/150?u=currentuser', 
  handle: '@jane_creator', 
  isOnline: true, 
  followers: 876, 
  clipsSold: 42, 
  endorsements: 2845,
  bio: 'Lover of cinematic shots and aerial videography. Capturing the world from a different perspective. Available for freelance projects and collaborations.',
  socials: { twitter: '#', youtube: '#', website: '#' },
  gear: ['Sony A7S III', 'DJI Mavic 3 Pro', 'Sigma 24-70mm f/2.8', 'DaVinci Resolve', 'Aputure 120D II'],
  skills: ['Drone Piloting', 'Color Grading', '4K Cinematography', 'Slow Motion', 'Gimbal Operation'],
  location: 'San Francisco, CA',
  availableForWork: true,
  profileThemeColor: 'indigo',
  subscriptionPrice: 4.99,
  mentorshipRate: 150,
};

export const MOCK_USERS: { [key:string]: User } = {
  jane_creator: jane_creator,
  aerovisions: { id: 'u1', name: 'AeroVisions', avatarUrl: 'https://i.pravatar.cc/150?u=aerovisions', handle: '@aerovisions', isOnline: true, followers: 12500, clipsSold: 152, endorsements: 2800 },
  cafecreations: { id: 'u2', name: 'CafeCreations', avatarUrl: 'https://i.pravatar.cc/150?u=cafecreations', handle: '@cafecreations', isOnline: false, followers: 8200, clipsSold: 98, endorsements: 1500 },
  codereel: { id: 'u3', name: 'CodeReel', avatarUrl: 'https://i.pravatar.cc/150?u=codereel', handle: '@codereel', isOnline: true, followers: 15300, clipsSold: 210, endorsements: 2200 },
  urbanflow: { id: 'u4', name: 'UrbanFlow', avatarUrl: 'https://i.pravatar.cc/150?u=urbanflow', handle: '@urbanflow', isOnline: true, followers: 7600, clipsSold: 88, endorsements: 1100 },
  coastalclips: { id: 'u5', name: 'CoastalClips', avatarUrl: 'https://i.pravatar.cc/150?u=coastalclips', handle: '@coastalclips', isOnline: false, followers: 9800, clipsSold: 120, endorsements: 1800 },
  cozymoments: { id: 'u6', name: 'CozyMoments', avatarUrl: 'https://i.pravatar.cc/150?u=cozymoments', handle: '@cozymoments', isOnline: true, followers: 11200, clipsSold: 135, endorsements: 1950 },
  artisanframes: { id: 'u7', name: 'ArtisanFrames', avatarUrl: 'https://i.pravatar.cc/150?u=artisanframes', handle: '@artisanframes', isOnline: false, followers: 5400, clipsSold: 65, endorsements: 800 },
  pixelperfect: { id: 'u8', name: 'PixelPerfect', avatarUrl: 'https://i.pravatar.cc/150?u=pixelperfect', handle: '@pixelperfect', isOnline: true, followers: 22000, clipsSold: 350, endorsements: 4500, mentorshipRate: 250 },
  naturelens: { id: 'u9', name: 'NatureLens', avatarUrl: 'https://i.pravatar.cc/150?u=naturelens', handle: '@naturelens', isOnline: false, followers: 18000, clipsSold: 280, endorsements: 3200 },
  foodiefilms: { id: 'u10', name: 'FoodieFilms', avatarUrl: 'https://i.pravatar.cc/150?u=foodiefilms', handle: '@foodiefilms', isOnline: true, followers: 13000, clipsSold: 190, endorsements: 2500 },
  techtrends: { id: 'u11', name: 'TechTrends', avatarUrl: 'https://i.pravatar.cc/150?u=techtrends', handle: '@techtrends', isOnline: true, followers: 16500, clipsSold: 250, endorsements: 2900 },
  digidreams: { id: 'u12', name: 'DigiDreams', avatarUrl: 'https://i.pravatar.cc/150?u=digidreams', handle: '@digidreams', isOnline: true, followers: 6700, clipsSold: 72, endorsements: 950 },
  storyweaver: { id: 'u13', name: 'StoryWeaver', avatarUrl: 'https://i.pravatar.cc/150?u=storyweaver', handle: '@storyweaver', isOnline: false, followers: 19000, clipsSold: 230, endorsements: 3100, mentorshipRate: 200 },
  motionmasters: { id: 'u14', name: 'MotionMasters', avatarUrl: 'https://i.pravatar.cc/150?u=motionmasters', handle: '@motionmasters', isOnline: true, followers: 14000, clipsSold: 180, endorsements: 2600 },
  cinegraph: { id: 'u15', name: 'CineGraph', avatarUrl: 'https://i.pravatar.cc/150?u=cinegraph', handle: '@cinegraph', isOnline: false, followers: 8900, clipsSold: 110, endorsements: 1700 },
  vfxvoyage: { id: 'u16', name: 'VFXVoyage', avatarUrl: 'https://i.pravatar.cc/150?u=vfxvoyage', handle: '@vfxvoyage', isOnline: true, followers: 11500, clipsSold: 145, endorsements: 2050 },
};

const defaultLicenseTiers: LicenseTier[] = [
    { name: 'Standard', price: 49.99, description: 'Web, social media, and presentations. Max 500,000 views.' },
    { name: 'Extended', price: 149.99, description: 'TV, film, and online advertising. Unlimited views.' },
    { name: 'Exclusive', price: 499.99, description: 'Full ownership and exclusive rights to the clip.' },
];

export const MOCK_VIDEO_CLIPS: VideoClip[] = [
  {
    id: '1',
    title: 'Drone Shot of a Winding Mountain Road',
    description: 'A breathtaking aerial view of a car driving along a curvy road in a lush, green mountain range. Perfect for travel vlogs and cinematic intros.',
    creator: MOCK_USERS.aerovisions,
    thumbnailUrl: 'https://picsum.photos/seed/deer/600/400',
    videoUrl: '#',
    price: 49.99,
    tags: ['drone', 'mountains', 'road'],
    duration: 25,
    resolution: '4K',
    licenseTiers: defaultLicenseTiers,
  },
  {
    id: '2',
    title: 'Coffee Pouring in Slow Motion',
    description: 'A close-up, slow-motion shot of espresso being poured into a ceramic mug. Ideal for coffee shop promos, morning routine videos, and food blogs.',
    creator: MOCK_USERS.cafecreations,
    thumbnailUrl: 'https://picsum.photos/seed/rust/600/400',
    videoUrl: '#',
    price: 19.99,
    tags: ['coffee', 'slow motion', 'cafe'],
    duration: 15,
    resolution: '1080p',
    licenseTiers: defaultLicenseTiers.map(t => ({...t, price: t.price / 2})),
  },
  {
    id: '3',
    title: 'Programmer Typing on a Keyboard',
    description: 'An over-the-shoulder shot of a developer coding in a dimly lit room. The screen reflects in their glasses. Great for tech tutorials and business presentations.',
    creator: MOCK_USERS.codereel,
    thumbnailUrl: 'https://picsum.photos/seed/fog/600/400',
    videoUrl: '#',
    price: 24.99,
    tags: ['coding', 'tech', 'developer'],
    duration: 30,
    resolution: '4K',
    licenseTiers: defaultLicenseTiers.map(t => ({...t, price: t.price / 1.5})),
  },
  {
    id: '4',
    title: 'Busy City Intersection Timelapse',
    description: 'A dynamic timelapse of a bustling city street corner, showing light trails from traffic and people moving quickly. Excellent for content about city life and speed.',
    creator: MOCK_USERS.urbanflow,
    thumbnailUrl: 'https://picsum.photos/seed/oceanwaves/600/400',
    videoUrl: '#',
    price: 39.99,
    tags: ['timelapse', 'city', 'traffic'],
    duration: 18,
    resolution: '4K',
    licenseTiers: defaultLicenseTiers,
  },
  {
    id: '5',
    title: 'Ocean Waves Crashing on a Rocky Shore',
    description: 'A powerful shot of ocean waves crashing against dark, mossy rocks during sunset. The spray catches the golden light. Perfect for dramatic or calming scenes.',
    creator: MOCK_USERS.coastalclips,
    thumbnailUrl: 'https://picsum.photos/seed/desert/600/400',
    videoUrl: '#',
    price: 34.99,
    tags: ['ocean', 'waves', 'nature'],
    duration: 22,
    resolution: '1080p',
    licenseTiers: defaultLicenseTiers,
  },
  {
    id: '6',
    title: 'Reading a Book by the Fireplace',
    description: 'A cozy, warm scene of a person turning the pages of a book next to a crackling fireplace. Creates a feeling of comfort, relaxation, and autumn.',
    creator: MOCK_USERS.cozymoments,
    thumbnailUrl: 'https://picsum.photos/seed/train/600/400',
    videoUrl: '#',
    price: 29.99,
    tags: ['reading', 'cozy', 'fireplace'],
    duration: 28,
    resolution: '4K',
    licenseTiers: defaultLicenseTiers,
  },
];

export const MOCK_TRENDING_CLIPS: VideoClip[] = [ MOCK_VIDEO_CLIPS[3], MOCK_VIDEO_CLIPS[0], MOCK_VIDEO_CLIPS[2], MOCK_VIDEO_CLIPS[4] ];

export const MOCK_Tutorial_CLIPS: VideoClip[] = [
  {
    id: 't1',
    title: 'Mastering Cinematic Color Grading',
    description: 'Learn the secrets of professional color grading to make your footage stand out.',
    creator: MOCK_USERS.pixelperfect,
    thumbnailUrl: 'https://picsum.photos/seed/tutorial1/600/400',
    videoUrl: '#',
    price: 0,
    tags: ['tutorial', 'color grading', 'post-production'],
    duration: 360,
    resolution: '1080p',
  },
   {
    id: 't2',
    title: '5 Drone Moves You Need to Know',
    description: 'Elevate your aerial videography with these five essential drone maneuvers.',
    creator: MOCK_USERS.aerovisions,
    thumbnailUrl: 'https://picsum.photos/seed/tutorial2/600/400',
    videoUrl: '#',
    price: 0,
    tags: ['tutorial', 'drone', 'videography'],
    duration: 420,
    resolution: '1080p',
  },
   {
    id: 't3',
    title: 'Lighting 101 for Product Shots',
    description: 'A beginner\'s guide to creating professional lighting setups for product B-roll.',
    creator: MOCK_USERS.artisanframes,
    thumbnailUrl: 'https://picsum.photos/seed/tutorial3/600/400',
    videoUrl: '#',
    price: 0,
    tags: ['tutorial', 'lighting', 'product'],
    duration: 510,
    resolution: '1080p',
  },
   {
    id: 't4',
    title: 'How to Capture Viral Food Videos',
    description: 'Tips and tricks for making mouth-watering food content that gets shared.',
    creator: MOCK_USERS.foodiefilms,
    thumbnailUrl: 'https://picsum.photos/seed/tutorial4/600/400',
    videoUrl: '#',
    price: 0,
    tags: ['tutorial', 'food video', 'social media'],
    duration: 450,
    resolution: '1080p',
  },
];

export const NEWS_ITEMS = [
    { id: 1, text: "New Feature: AI-powered search is now in beta!", timestamp: "2h ago", icon: 'Sparkles' },
    { id: 2, text: "Top Creator 'AeroVisions' just dropped a new 8K drone pack.", timestamp: "1d ago", icon: 'Star' },
    { id: 3, text: "Community Update: Payouts will be processed on the 15th.", timestamp: "3d ago", icon: 'Calendar' },
];

export const MOCK_LIVE_OFFERS = [
    { id: 'lo1', requestor: 'Tech Startup Inc.', description: 'Needs a 15s clip of a diverse team collaborating in a modern office.', budget: 250 },
    { id: 'lo2', requestor: 'Local Coffee Shop', description: 'Looking for slow-motion shots of latte art being created.', budget: 75 },
    { id: 'lo3', requestor: 'Travel Vlogger', description: 'Urgent need for a sunrise timelapse over a recognizable city skyline.', budget: 150 },
];

export const MOCK_LIVE_CREATORS = [
    MOCK_USERS.aerovisions,
    MOCK_USERS.codereel,
    MOCK_USERS.urbanflow,
    MOCK_USERS.cozymoments,
    MOCK_USERS.foodiefilms,
    MOCK_USERS.techtrends,
    MOCK_USERS.pixelperfect,
    MOCK_USERS.naturelens,
    MOCK_USERS.artisanframes,
    MOCK_USERS.vfxvoyage,
    MOCK_USERS.motionmasters,
    MOCK_USERS.storyweaver,
];

export const MOCK_COMMUNITY_NETWORKS = [
    { id: 'cn1', name: 'Drone Pilots Union', members: 124, bannerUrl: 'https://picsum.photos/seed/drone/500/150' },
    { id: 'cn2', name: 'Food Videographers', members: 88, bannerUrl: 'https://picsum.photos/seed/food/500/150' },
    { id: 'cn3', name: 'Urban Explorers', members: 215, bannerUrl: 'https://picsum.photos/seed/city/500/150' },
    { id: 'cn4', name: 'LUT & Preset Creators', members: 45, bannerUrl: 'https://picsum.photos/seed/color/500/150' },
];

export const MOCK_NETWORK_ACTIVITIES = [
    { id: 'na1', user: MOCK_USERS.aerovisions, networkName: 'Drone Pilots Union', activityType: 'post', description: 'posted a new tutorial on FPV drone techniques.', timestamp: '15m ago' },
    { id: 'na2', user: MOCK_USERS.techtrends, networkName: 'LUT & Preset Creators', activityType: 'create', description: 'created the "LUT & Preset Creators" network.', timestamp: '1h ago' },
    { id: 'na3', user: MOCK_USERS.foodiefilms, networkName: 'Food Videographers', activityType: 'milestone', description: 'reached 100 members!', timestamp: '3h ago' },
    { id: 'na4', user: MOCK_USERS.urbanflow, networkName: 'Urban Explorers', activityType: 'join', description: 'joined the "Urban Explorers" network.', timestamp: '5h ago' },
    { id: 'na5', user: MOCK_USERS.coastalclips, networkName: 'Drone Pilots Union', activityType: 'post', description: 'is asking for advice on shooting in high winds.', timestamp: '1d ago' },
    { id: 'na6', user: MOCK_USERS.digidreams, networkName: 'Urban Explorers', activityType: 'post', description: 'shared a new hyperlapse of downtown.', timestamp: '2d ago' },
    { id: 'na7', user: MOCK_USERS.storyweaver, networkName: 'Food Videographers', activityType: 'join', description: 'joined the "Food Videographers" network.', timestamp: '2d ago' },
    { id: 'na8', user: MOCK_USERS.pixelperfect, networkName: 'LUT & Preset Creators', activityType: 'post', description: 'dropped a new cinematic LUT pack.', timestamp: '3d ago' },
    { id: 'na9', user: MOCK_USERS.motionmasters, networkName: 'Drone Pilots Union', activityType: 'join', description: 'joined the "Drone Pilots Union" network.', timestamp: '3d ago' },
    { id: 'na10', user: MOCK_USERS.cinegraph, networkName: 'Urban Explorers', activityType: 'milestone', description: 'reached 250 members!', timestamp: '4d ago' },
    { id: 'na11', user: MOCK_USERS.vfxvoyage, networkName: 'LUT & Preset Creators', activityType: 'join', description: 'joined the "LUT & Preset Creators" network.', timestamp: '4d ago' },
    { id: 'na12', user: MOCK_USERS.cafecreations, networkName: 'Food Videographers', activityType: 'post', description: 'is looking for coffee shop B-roll.', timestamp: '5d ago' },
    { id: 'na13', user: MOCK_USERS.codereel, networkName: 'Urban Explorers', activityType: 'post', description: 'posted a guide to shooting cityscapes at night.', timestamp: '5d ago' },
    { id: 'na14', user: MOCK_USERS.naturelens, networkName: 'Drone Pilots Union', activityType: 'milestone', description: 'reached 150 members!', timestamp: '6d ago' },
    { id: 'na15', user: MOCK_USERS.artisanframes, networkName: 'Food Videographers', activityType: 'post', description: 'shared a new video on plating techniques.', timestamp: '6d ago' },
    { id: 'na16', user: MOCK_USERS.cozymoments, networkName: 'LUT & Preset Creators', activityType: 'post', description: 'released a new "Autumn Vibes" preset.', timestamp: '1w ago' },
    { id: 'na17', user: MOCK_USERS.urbanflow, networkName: 'Drone Pilots Union', activityType: 'post', description: 'asked for the best drones under $500.', timestamp: '1w ago' },
    { id: 'na18', user: MOCK_USERS.techtrends, networkName: 'Urban Explorers', activityType: 'post', description: 'posted a video of the new subway line.', timestamp: '1w ago' },
    { id: 'na19', user: MOCK_USERS.aerovisions, networkName: 'LUT & Preset Creators', activityType: 'join', description: 'joined the "LUT & Preset Creators" network.', timestamp: '1w ago' },
    { id: 'na20', user: MOCK_USERS.foodiefilms, networkName: 'Food Videographers', activityType: 'post', description: 'is hiring for a shoot next month.', timestamp: '2w ago' },
];

export const MOCK_ANALYTICS_DATA = [
    { id: 'a1', label: 'Profile Views', value: '1.2k', change: '+15%', period: 'last 7 days', icon: 'TrendingUp' },
    { id: 'a2', label: 'Clip Likes', value: '3.4k', change: '+8%', period: 'last 7 days', icon: 'Heart' },
    { id: 'a3', label: 'New Followers', value: '82', change: '+22%', period: 'last 7 days', icon: 'Users' },
    { id: 'a4', label: 'Monthly Earnings', value: '$849.50', change: '+5%', period: 'This month', icon: 'Dollar' },
];

export const MOCK_ACTIVITIES = [
    { id: 'a1', type: 'sale', user: 'AeroVisions', description: "just sold 'Mountain Road' for $49.99", time: '5m ago' },
    { id: 'a2', type: 'upload', user: 'CodeReel', description: "uploaded 5 new tech clips", time: '25m ago' },
    { id: 'a3', type: 'like', user: 'UrbanFlow', description: "liked your clip 'Rainy Day Cafe'", time: '1h ago' },
    { id: 'a4', type: 'milestone', user: 'CafeCreations', description: "reached 100 total sales!", time: '3h ago' },
    { id: 'a5', type: 'comment', user: 'CozyMoments', description: "commented on 'Ocean Waves'", time: '5h ago' },
    { id: 'a6', type: 'follow', user: 'ArtisanFrames', description: "started following you", time: '1d ago' },
];

export const MOCK_TRANSACTIONS = [
    { id: 't1', date: '2024-07-21', type: 'sale', description: 'Sale of "Winding Mountain Road"', amount: 49.99, status: 'Completed' },
    { id: 't2', date: '2024-07-20', type: 'purchase', description: 'Purchase of "City Timelapse"', amount: -39.99, status: 'Completed' },
    { id: 't3', date: '2024-07-19', type: 'sale', description: 'Sale of "Coffee Pouring"', amount: 19.99, status: 'Completed' },
    { id: 't4', date: '2024-07-18', type: 'withdrawal', description: 'Withdrawal to Bank Account', amount: -250.00, status: 'Pending' },
    { id: 't5', date: '2024-07-17', type: 'sale', description: 'Sale of "Programmer Typing"', amount: 24.99, status: 'Completed' },
    { id: 't6', date: '2024-07-16', type: 'purchase', description: 'Purchase of "Ocean Waves"', amount: -34.99, status: 'Completed' },
];

export const MOCK_CREATOR_OF_THE_WEEK = MOCK_USERS.naturelens;

export const MOCK_FORUM_CATEGORIES = [
    { id: 'fc1', title: 'Gear Talk', description: 'Discuss cameras, lenses, drones, and other equipment.', icon: 'Camera', posts: 128, threads: 45 },
    { id: 'fc2', title: 'Editing & Post-Production', description: 'Share tips on color grading, software, and workflow.', icon: 'CodeBracket', posts: 345, threads: 92 },
    { id: 'fc3', title: 'Shot Requests', description: 'Need a specific clip? Ask the community here.', icon: 'LightBulb', posts: 76, threads: 50 },
    { id: 'fc4', title: 'Platform Feedback', description: 'Have ideas to improve ClipSpace? Let us know!', icon: 'Megaphone', posts: 212, threads: 61 },
    { id: 'fc5', title: 'Marketplace Questions', description: 'Help with pricing, licensing, and selling your clips.', icon: 'QuestionMarkCircle', posts: 98, threads: 33 },
    { id: 'fc6', title: 'General Discussion', description: 'Chat about anything else related to content creation.', icon: 'ChatBubble', posts: 541, threads: 112 },
];

export const MOCK_MARKETPLACE_LISTINGS = [
  { ...MOCK_VIDEO_CLIPS[0], id: 'm1', type: 'sell' },
  { ...MOCK_VIDEO_CLIPS[1], id: 'm2', type: 'sell' },
  {
    id: 'm3',
    type: 'gig',
    title: 'Cinematic Drone Pilot for Hire',
    description: 'Experienced and licensed drone pilot available for projects. Specializing in 4K aerial videography for real estate, events, and cinematic productions.',
    creator: MOCK_USERS.aerovisions,
    thumbnailUrl: 'https://picsum.photos/seed/dronegig/600/400',
    price: 350, // per day
    tags: ['drone pilot', '4k', 'cinematic', 'real estate'],
    duration: 0,
    resolution: '4K',
  },
  {
    id: 'm4',
    type: 'buy',
    title: 'Seeking Vintage 8mm Film Footage',
    description: 'Looking for authentic 8mm or 16mm film scans of city life from the 1960s-1970s for a documentary project. Must be high-quality scans.',
    creator: MOCK_USERS.storyweaver,
    thumbnailUrl: 'https://picsum.photos/seed/filmbuy/600/400',
    price: 200, // budget
    tags: ['vintage', '8mm', 'documentary', 'city life'],
    duration: 0,
    resolution: '1080p+',
  },
  { ...MOCK_VIDEO_CLIPS[2], id: 'm5', type: 'sell' },
  { ...MOCK_VIDEO_CLIPS[3], id: 'm6', type: 'sell' },
  { ...MOCK_VIDEO_CLIPS[4], id: 'm7', type: 'sell' },
  {
    id: 'm8',
    type: 'gig',
    title: 'Food Videography & Styling',
    description: 'Professional food videographer available to create mouth-watering visuals for your restaurant, blog, or social media. Full styling and editing services included.',
    creator: MOCK_USERS.foodiefilms,
    thumbnailUrl: 'https://picsum.photos/seed/foodgig/600/400',
    price: 500, // per project
    tags: ['food video', 'stylist', 'slow motion', 'recipe'],
    duration: 0,
    resolution: '4K',
  },
  {
    id: 'm9',
    type: 'buy',
    title: 'Need POV Shots of Hiking',
    description: 'Urgently need first-person POV footage of hiking in a dense forest for a travel vlog. GoPro or similar action camera footage is ideal. Budget is flexible for the right clips.',
    creator: MOCK_USERS.cozymoments,
    thumbnailUrl: 'https://picsum.photos/seed/hikingbuy/600/400',
    price: 100, // budget
    tags: ['hiking', 'pov', 'forest', 'adventure'],
    duration: 0,
    resolution: '1080p',
  },
   { ...MOCK_VIDEO_CLIPS[5], id: 'm10', type: 'sell' },
   {
    id: 'm11',
    creator: MOCK_USERS.pixelperfect,
    type: 'sell',
    title: 'Abstract Particle Backgrounds Pack',
    description: 'A collection of 10 seamless looping abstract particle backgrounds. Perfect for tech presentations, events, or as a subtle background for titles.',
    price: 79.99,
    thumbnailUrl: 'https://picsum.photos/seed/particles/600/400',
    tags: ['abstract', 'background', 'particles', 'loop'],
    duration: 150, // total
    resolution: '4K',
  },
  {
    id: 'm12',
    type: 'gig',
    title: 'Custom VFX and Motion Graphics',
    description: 'Need a custom logo animation, lower third, or VFX shot? I specialize in After Effects and can bring your vision to life.',
    creator: MOCK_USERS.vfxvoyage,
    thumbnailUrl: 'https://picsum.photos/seed/vfxgig/600/400',
    price: 250, // starting price
    tags: ['vfx', 'motion graphics', 'after effects', 'animation'],
    duration: 0,
    resolution: 'Custom',
  },
];

export const MOCK_MARKETPLACE_ACTIVITY = [
  { id: 'ma1', user: MOCK_USERS.urbanflow, type: 'view', listingTitle: 'Drone Shot of a Winding Mountain Road', time: '2m ago' },
  { id: 'ma2', user: MOCK_USERS.coastalclips, type: 'interest', listingTitle: 'Cinematic Drone Pilot for Hire', time: '5m ago' },
  { id: 'ma3', user: MOCK_USERS.cafecreations, type: 'contact', listingTitle: 'Food Videography & Styling', time: '12m ago' },
  { id: 'ma4', user: MOCK_USERS.codereel, type: 'view', listingTitle: 'Coffee Pouring in Slow Motion', time: '25m ago' },
  { id: 'ma5', user: MOCK_USERS.techtrends, type: 'share', listingTitle: 'Abstract Particle Backgrounds Pack', time: '1h ago' },
];

export const MOCK_PROJECT_REQUESTS: ProjectRequest[] = [
    { id: 'pr1', title: 'Cinematic B-Roll for a Coffee Brand', client: MOCK_USERS.cafecreations, description: 'Seeking 10-15 high-quality, 4K clips for a new social media campaign. We need slow-motion pours, steam rising, and cozy cafe ambiances.', budget: 1500, deadline: '2024-08-15', tags: ['coffee', '4k', 'slow-motion', 'lifestyle'], bidsCount: 8 },
    { id: 'pr2', title: 'Drone Footage of California Coastline', client: MOCK_USERS.coastalclips, description: 'Need a 2-minute edited drone sequence of the Big Sur coastline at sunset for a travel documentary. Must be shot in Log for color grading.', budget: 800, deadline: '2024-08-10', tags: ['drone', 'cinematic', 'coastline', 'sunset'], bidsCount: 12 },
    { id: 'pr3', title: 'Tech Product Demo Shots', client: MOCK_USERS.techtrends, description: 'Looking for a creator to shoot clean, minimalist product shots of a new smartphone. Focus on details, screen interaction, and macro shots.', budget: 2500, deadline: '2024-09-01', tags: ['product', 'tech', 'minimalist', 'macro'], bidsCount: 5 },
];

export const MOCK_BIDS: Bid[] = [
    { id: 'b1', creator: MOCK_USERS.aerovisions, amount: 750, proposal: 'I specialize in Big Sur drone footage and can deliver a color-graded 4K sequence within 3 days.', timestamp: '2h ago' },
    { id: 'b2', creator: MOCK_USERS.jane_creator, amount: 800, proposal: 'My DJI Mavic 3 Pro is perfect for this. I can provide stunning 10-bit D-Log footage and a quick turnaround.', timestamp: '3h ago' },
];

export const MOCK_COLLABORATIONS: Collaboration[] = [
    { id: 'c1', title: 'Travel Vlog Series - Seeking Editor', creator: MOCK_USERS.cozymoments, description: 'I\'m a travel vlogger with 100GB of footage from a recent trip to Japan. I need a skilled editor to help me create a 5-part series. Offering revenue share.', rolesNeeded: ['Video Editor'], compensation: 'Revenue Share' },
    { id: 'c2', title: 'Short Film - Need Drone Pilot & Colorist', creator: MOCK_USERS.storyweaver, description: 'I\'m directing a short narrative film and need a licensed drone pilot for aerial establishing shots and a talented colorist to create a specific moody look.', rolesNeeded: ['Drone Pilot', 'Colorist'], compensation: 'Paid' },
    { id: 'c3', title: 'Tech YouTube Channel - Co-host Wanted', creator: MOCK_USERS.techtrends, description: 'Looking for an energetic and knowledgeable co-host for a new tech review channel. Must be comfortable on camera and have a passion for gadgets.', rolesNeeded: ['Co-host', 'Presenter'], compensation: 'Paid' },
    { id: 'c4', title: 'Indie Game Trailer - VFX Artist Needed', creator: MOCK_USERS.vfxvoyage, description: 'Small indie game studio needs a VFX artist to create magical effects for our game trailer. Project is for credit but with potential for paid work on release.', rolesNeeded: ['VFX Artist'], compensation: 'For Credit' },
];

export const MOCK_MENTORSHIP_SLOTS: MentorshipSlot[] = [
    { id: 'ms1', mentor: MOCK_USERS.pixelperfect, date: '2024-08-01', time: '14:00 PST', duration: 60, isBooked: false },
    { id: 'ms2', mentor: MOCK_USERS.pixelperfect, date: '2024-08-01', time: '15:30 PST', duration: 60, isBooked: true },
    { id: 'ms3', mentor: MOCK_USERS.storyweaver, date: '2024-08-02', time: '10:00 EST', duration: 45, isBooked: false },
];

export const MOCK_PROJECT_TASKS: { [key: string]: ProjectTask[] } = {
  'To-Do': [
    { id: 't1', title: 'Scout locations for coffee shoot', status: 'To-Do', priority: 'High', description: 'Find 3-4 suitable cafes with good natural lighting.', dueDate: '2024-08-05', assignees: [MOCK_USERS.jane_creator] },
    { id: 't2', title: 'Finalize shot list with TechTrends', status: 'To-Do', priority: 'Medium', description: 'Client meeting to confirm the final 15 shots for the smartphone demo.', dueDate: '2024-08-03', assignees: [MOCK_USERS.jane_creator, MOCK_USERS.techtrends] },
  ],
  'In Progress': [
    { id: 't3', title: 'Editing Japan Vlog - Part 1', status: 'In Progress', priority: 'High', description: 'First pass of the Tokyo segment. Aim for a 10-12 minute cut.', dueDate: '2024-08-10', assignees: [MOCK_USERS.cozymoments] },
    { id: 't6', title: 'Color grade for short film selects', status: 'In Progress', priority: 'Medium', description: 'Apply the "moody" LUT to the approved takes and send for review.', dueDate: '2024-08-08', assignees: [MOCK_USERS.pixelperfect] },
  ],
  'Done': [
    { id: 't4', title: 'Delivered Big Sur drone sequence', status: 'Done', priority: 'Low', description: 'Client has approved and payment has been received.', dueDate: '2024-07-28', assignees: [MOCK_USERS.aerovisions] },
    { id: 't5', title: 'Initial storyboard for coffee brand', status: 'Done', priority: 'Low', description: 'Storyboard sent to client for feedback.', dueDate: '2024-07-30', assignees: [MOCK_USERS.jane_creator] },
  ]
};
// FIX: Added MOCK_CLIP_BUNDLES to be exported for use in Marketplace.tsx
export const MOCK_CLIP_BUNDLES = [
  {
    id: 'b1',
    title: 'Cinematic Drone Essentials',
    creator: MOCK_USERS.aerovisions,
    clipCount: 10,
    price: 199.99,
    originalPrice: 249.99,
    thumbnailUrl: 'https://picsum.photos/seed/bundle1/400/200',
  },
  {
    id: 'b2',
    title: 'Cozy Cafe Ambiance Pack',
    creator: MOCK_USERS.cafecreations,
    clipCount: 15,
    price: 149.99,
    originalPrice: 199.99,
    thumbnailUrl: 'https://picsum.photos/seed/bundle2/400/200',
  },
];

// FIX: Added MOCK_CREATOR_PODS to be exported for use in Community.tsx
export const MOCK_CREATOR_PODS = [
  {
    id: 'pod1',
    name: '4K Cinematic Crew',
    description: 'A private group for high-end cinematic creators to share tips and collaborate.',
    members: [MOCK_USERS.aerovisions, MOCK_USERS.pixelperfect, MOCK_USERS.storyweaver, MOCK_USERS.jane_creator],
  },
  {
    id: 'pod2',
    name: 'Drone FPV Aces',
    description: 'For FPV drone pilots pushing the limits of aerial videography.',
    members: [MOCK_USERS.aerovisions, MOCK_USERS.urbanflow, MOCK_USERS.motionmasters],
  },
  {
    id: 'pod3',
    name: 'Resolve Colorists',
    description: 'A space for DaVinci Resolve users to discuss color grading techniques.',
    members: [MOCK_USERS.pixelperfect, MOCK_USERS.jane_creator, MOCK_USERS.artisanframes],
  }
];

// FIX: Added MOCK_ANALYTICS_CHARTS to be exported for use in Analytics.tsx
export const MOCK_ANALYTICS_CHARTS = {
  locations: [
    { name: 'United States', value: 38.5 },
    { name: 'United Kingdom', value: 12.2 },
    { name: 'Canada', value: 8.7 },
    { name: 'Germany', value: 6.1 },
    { name: 'Australia', value: 5.5 },
  ],
  followerGrowth: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 140, 130],
  clipViews: [1200, 1500, 1100, 1800, 1700, 2200, 2500, 3000, 2800, 3200, 3100, 3500],
  revenue: [300, 400, 250, 500, 490, 600, 700, 910, 1250, 1000, 1400, 1300],
  revenueSources: [
      { name: 'Clip Sales', value: 849.50, percent: 65 },
      { name: 'Memberships', value: 325.00, percent: 25 },
      { name: 'Affiliate', value: 130.25, percent: 10 },
  ]
};

export const MOCK_GOALS: Goal[] = [
  { id: 'g1', title: 'Reach 1,000 Followers', currentValue: 876, targetValue: 1000, metric: 'Followers' },
  { id: 'g2', title: 'Sell 50 Clips', currentValue: 42, targetValue: 50, metric: 'Clips Sold' },
  { id: 'g3', title: 'Monthly Earnings Goal', currentValue: 849.50, targetValue: 1500, metric: '$' },
];

export const MOCK_DASHBOARD_MESSAGES = [
  { id: 'dm1', user: MOCK_USERS.aerovisions, text: 'Loved that last drone shot you uploaded!', time: '2h ago', unread: true },
  { id: 'dm2', user: MOCK_USERS.storyweaver, text: 'Quick question about the short film collab...', time: '1d ago', unread: false },
  { id: 'dm3', user: MOCK_USERS.pixelperfect, text: 'Your color grading is always on point.', time: '3d ago', unread: false },
];

export const MOCK_SPLIT_CONTRACTS: SplitContract[] = [
    {
        id: 'sc1',
        name: 'Short Film "Neon Sunset"',
        totalEarnings: 1250.75,
        status: 'Active',
        participants: [
            { user: MOCK_USERS.jane_creator, share: 50 },
            { user: MOCK_USERS.pixelperfect, share: 30 },
            { user: MOCK_USERS.aerovisions, share: 20 },
        ]
    },
    {
        id: 'sc2',
        name: 'Coffee Shop Ad Campaign',
        totalEarnings: 4800.00,
        status: 'Active',
        participants: [
            { user: MOCK_USERS.jane_creator, share: 60 },
            { user: MOCK_USERS.cafecreations, share: 40 },
        ]
    },
     {
        id: 'sc3',
        name: 'Documentary "Urban Jungle"',
        totalEarnings: 890.50,
        status: 'Completed',
        participants: [
            { user: MOCK_USERS.urbanflow, share: 70 },
            { user: MOCK_USERS.storyweaver, share: 30 },
        ]
    }
];

export const TUTORIAL_STEPS = [
    {
        id: 1,
        text: "Welcome to the ClipGen AI Studio! This is the Control Tower, where you'll command the AI. Let's start by telling it what to create.",
        position: { top: '150px', left: '26rem' },
        arrow: { top: '50%', left: '-0.75rem', transform: 'translateY(-50%) rotate(45deg)' },
        awaitsAction: 'none'
    },
    {
        id: 2,
        text: "This is the prompt input. Type a detailed description of the video clip you want to generate. Be as specific as you can! Try typing 'A cinematic shot of a wolf howling at the moon'.",
        elementId: 'prompt-input',
        position: { top: '280px', left: '26rem' },
        arrow: { top: '50%', left: '-0.75rem', transform: 'translateY(-50%) rotate(45deg)' },
        awaitsAction: 'prompt_filled'
    },
     {
        id: 3,
        text: "Great! Now, press the 'Generate' button to bring your vision to life. The AI will go through several steps to create your clip.",
        elementId: 'generate-button',
        position: { top: '450px', left: '26rem' },
        arrow: { top: '50%', left: '-0.75rem', transform: 'translateY(-50%) rotate(45deg)' },
        awaitsAction: 'none'
    },
    {
        id: 4,
        text: "While it generates, notice the Canvas in the center. It shows you the AI's progress in real-time, from composition to final rendering.",
        elementId: 'canvas',
        position: { top: '150px', left: 'auto', right: '22rem' },
        arrow: { top: '50%', right: '-0.75rem', transform: 'translateY(-50%) rotate(-135deg)' },
        awaitsAction: 'none'
    },
    {
        id: 5,
        text: "Let's create a sequence. We'll switch to the AI Co-Director. This tab lets you turn a full script into a storyboard.",
        elementId: 'tab-co-director',
        position: { top: '100px', left: '15rem' },
        arrow: { bottom: '-0.75rem', left: '50%', transform: 'translateX(-50%) rotate(-135deg)' },
        awaitsAction: 'none',
        action: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => setActiveTab('co-director')
    },
     {
        id: 6,
        text: "Here, you can input multiple scenes. The AI will generate a clip for each line and add them to the Timeline at the bottom.",
        elementId: 'co-director-input',
        position: { top: '250px', left: '26rem' },
        arrow: { top: '50%', left: '-0.75rem', transform: 'translateY(-50%) rotate(45deg)' },
        awaitsAction: 'none',
    },
     {
        id: 7,
        text: "This is the Timeline. You can arrange clips from the Co-Director here to build your story. That's the basics of the ClipGen Studio. Enjoy creating!",
        elementId: 'timeline-panel',
        position: { bottom: '150px', left: '26rem' },
        arrow: { top: '-0.75rem', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
        awaitsAction: 'none',
    },
];

export const STYLE_PRESETS = [
    { name: 'Cinematic', thumbnailUrl: 'https://picsum.photos/seed/style1/200/100' },
    { name: 'Vintage Film', thumbnailUrl: 'https://picsum.photos/seed/style2/200/100' },
    { name: 'Anime', thumbnailUrl: 'https://picsum.photos/seed/style3/200/100' },
    { name: 'Cyberpunk', thumbnailUrl: 'https://picsum.photos/seed/style4/200/100' },
    { name: 'Noir', thumbnailUrl: 'https://picsum.photos/seed/style5/200/100' },
    { name: '3D Render', thumbnailUrl: 'https://picsum.photos/seed/style6/200/100' },
];


// FIX: Added LEGAL_CONTENT to provide text for legal pages.
export const LEGAL_CONTENT = {
  terms: `
    <h2>Terms of Service</h2>
    <p>Last updated: July 22, 2024</p>
    <p>Welcome to ClipSpace! These terms and conditions outline the rules and regulations for the use of ClipSpace's Website, located at clipspace.io.</p>
    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use ClipSpace if you do not agree to take all of the terms and conditions stated on this page.</p>
    <h3>1. License to Use Website</h3>
    <p>Unless otherwise stated, ClipSpace and/or its licensors own the intellectual property rights for all material on ClipSpace. All intellectual property rights are reserved. You may access this from ClipSpace for your own personal use subjected to restrictions set in these terms and conditions.</p>
    <p>You must not:</p>
    <ul>
      <li>Republish material from ClipSpace</li>
      <li>Sell, rent or sub-license material from ClipSpace</li>
      <li>Reproduce, duplicate or copy material from ClipSpace</li>
      <li>Redistribute content from ClipSpace</li>
    </ul>
    <h3>2. User Content</h3>
    <p>In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose.</p>
    <p>You grant to ClipSpace a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to ClipSpace the right to sub-license these rights, and the right to bring an action for infringement of these rights.</p>
  `,
  privacy: `
    <h2>Privacy Policy</h2>
    <p>Last updated: July 22, 2024</p>
    <p>Your privacy is important to us. It is ClipSpace's policy to respect your privacy regarding any information we may collect from you across our website, https://clipspace.io, and other sites we own and operate.</p>
    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
    <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
  `,
  acknowledgments: `
    <h2>Acknowledgments</h2>
    <p>ClipSpace is a fictional platform created for demonstration purposes. This product includes and is made possible by a number of open-source projects and free-to-use services.</p>
    <p>We would like to thank the creators of the following libraries and tools:</p>
    <ul>
      <li>React</li>
      <li>Tailwind CSS</li>
      <li>Google Gemini API</li>
      <li>Various icon libraries and open-source components.</li>
      <li>Placeholder images from Pravatar and Picsum Photos.</li>
    </ul>
    <p>This platform would not be possible without the vibrant open-source community.</p>
  `,
  agreement: `
    <h2>Contributor Agreement</h2>
    <p>Last updated: July 22, 2024</p>
    <p>This Contributor Agreement ("Agreement") is a contract between you ("Contributor") and ClipSpace Inc. ("ClipSpace") and applies to your submission of content for sale or license on the ClipSpace marketplace.</p>
    <h3>1. Grant of Rights</h3>
    <p>By submitting any video, image, or other media ("Content") to ClipSpace, you grant ClipSpace a non-exclusive, worldwide, perpetual, royalty-free license to market, sell, and distribute the Content through the ClipSpace platform. You retain the copyright and other intellectual property rights to your Content.</p>
    <h3>2. Warranties</h3>
    <p>You represent and warrant that:</p>
    <ul>
        <li>You are the sole owner of the Content and have the full right and authority to enter into this Agreement.</li>
        <li>The Content does not infringe upon any copyright, trademark, privacy, or other rights of any third party.</li>
        <li>You have obtained all necessary model and property releases for any recognizable individuals or private property depicted in the Content.</li>
    </ul>
    <h3>3. Payment and Commission</h3>
    <p>ClipSpace will pay you a commission based on your subscription tier for each sale of your Content. Commission rates are detailed on our Pricing page and may be updated from time to time. Payments will be made on a monthly basis, subject to a minimum payout balance.</p>
  `,
  disclaimer: `
    <h2>Disclaimer</h2>
    <p>The information provided by ClipSpace ("we," "us," or "our") on our website is for general informational and entertainment purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
    <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>
    <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
  `
};
