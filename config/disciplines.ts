import { DisciplineConfig } from '@/types'

export const SERVICES_CONFIG: Record<string, DisciplineConfig> = {
  'media-production': {
    id: 'media-production',
    title: 'Media Production',
    tagline: 'Documentaries, corporate profiles, and event coverage filmed on cinema rigs.',
    heroBadge: 'Media & Production',
    ambientColor: 'rgba(107, 1, 11, 0.20)',
    ambientGlow: 'rgba(180, 20, 40, 0.40)',
    accentHex: '#8B0A1A',
    description:
      'We shoot and edit video for broadcasts, businesses, and digital platforms.',
    leadParagraph:
      'We handle investigative documentaries, corporate overviews, executive interviews, short films, and live multi-camera events. Our team manages every stage: location scouting, filming with 4K/6K cinema cameras, lighting, sound capture, and post-production color grading.',
    specialties: [
      'Documentary Production',
      'Corporate Videos & Executive Profiles',
      'High-Level Interviews & Dialogue',
      'Short Films & Narrative Projects',
      'Full-Scale Event Production & Coverage',
      'Branded Video Content & Creative Series',
    ],
    specs: [
      { label: 'Cinematography', value: 'Cinema 4K/6K Raw Acquisition' },
      { label: 'Color Pipeline', value: 'ACES 1.3 / DaVinci Resolve Master HDR' },
      { label: 'Sound Design', value: 'Broadcast Spec EBU R128 & Stereo Mastering' },
      { label: 'Deliverables', value: 'DCI Flat, Scope & Multi-Platform Cuts' },
    ],
    metrics: [
      { label: 'Productions Delivered', value: '150+', sublabel: 'Across corporate & broadcast' },
      { label: 'Max Acquisition', value: '6K RAW', sublabel: 'Uncompressed fidelity' },
      { label: 'Coverage Scale', value: 'Multi-Cam', sublabel: 'Live & staged events' },
    ],
    showcases: [
      {
        title: 'Legacy of Vision',
        client: 'Pan-African Leadership Initiative',
        year: '2025',
        aspectRatio: '2.39:1',
        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
        description: 'Feature-length documentary investigating sustainable industrialization and generational impact.',
        tags: ['Documentary', 'Cinema 4K', 'Global Distribution'],
      },
      {
        title: 'Vanguard Corporate Milestone',
        client: 'First Sovereign Banking Group',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=80',
        description: 'Institutional film detailing 25 years of market operations and executive governance.',
        tags: ['Corporate Video', 'Executive Interviews', 'Broadcast'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Media Production Scope',
      options: [
        'Documentary Production (Short or Feature)',
        'Corporate Profile / Institutional Video',
        'High-End Interview / Dialogue Series',
        'Full-Scale Event Production & Coverage',
      ],
      placeholder: 'e.g. 5-day documentary shoot across Lagos & Abuja with drone coverage',
    },
  },

  'television-studio': {
    id: 'television-studio',
    title: 'Television & Studio Production',
    tagline: 'Multi-camera studio shoots ready for broadcast distribution.',
    heroBadge: 'Broadcast & Studio',
    ambientColor: 'rgba(217, 119, 6, 0.18)',
    ambientGlow: 'rgba(245, 158, 11, 0.35)',
    accentHex: '#D97706',
    description:
      'We run technical and creative production for television shows, syndicated talk programs, and studio broadcasts.',
    leadParagraph:
      'We provide multi-camera vision mixing, intercom and tally setups, floor management, and broadcast audio so your feed meets television network delivery standards.',
    specialties: [
      'Talk Show Production & Moderation Sets',
      'Television Programme & Series Production',
      'Multi-Camera Live Studio Operations',
      'Broadcast Studio Engineering & Tally Systems',
      'Production Coordination & Crew Management',
      'Creative Studio Direction & Rundown Design',
    ],
    specs: [
      { label: 'Vision Mixing', value: 'Multi-Channel SDI Ultra-HD Switcher' },
      { label: 'Audio Engine', value: 'Multi-track DANTE / Wireless RF Mics' },
      { label: 'Intercom', value: 'Full Duplex Director & Operator Comms' },
      { label: 'Transmission', value: 'Broadcast Satellite / Low-Latency SRT Feed' },
    ],
    metrics: [
      { label: 'Broadcast Hours', value: '500+', sublabel: 'Transmitted programming' },
      { label: 'Camera Chains', value: 'Up to 8', sublabel: 'Synchronized live feeds' },
      { label: 'Uptime Reliability', value: '99.9%', sublabel: 'Live broadcast standards' },
    ],
    showcases: [
      {
        title: 'The Dialogue Hour',
        client: 'Continental News Network',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
        description: 'Weekly syndicated prime-time political talk show with 5-camera dynamic vision mixing.',
        tags: ['Television', 'Talk Show', 'Multi-Camera'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Television Production Requirements',
      options: [
        'Weekly TV Series / Talk Show Season',
        'Single-Special Broadcast Event',
        'Multi-Camera Studio Operations Support',
        'Complete Technical Production Crew',
      ],
      placeholder: 'e.g. 13-episode talk show season requiring 4-camera setup and vision mixer',
    },
  },

  'podcast-production': {
    id: 'podcast-production',
    title: 'Podcast Production',
    tagline: 'Multi-camera video podcasts with broadcast audio and social cutdowns.',
    heroBadge: 'Podcast & Audio Visual',
    ambientColor: 'rgba(168, 85, 247, 0.18)',
    ambientGlow: 'rgba(192, 132, 252, 0.35)',
    accentHex: '#9333EA',
    description:
      'We record, edit, and package video podcasts for creators and businesses launching or expanding their shows.',
    leadParagraph:
      'We record multi-angle 4K video, tune room acoustics for clear speech, and cut full episodes into vertical clips formatted for YouTube Shorts, TikTok, and Instagram Reels.',
    specialties: [
      'Studio Podcast Recording (Audio & 4K Video)',
      'Multi-Cam Video Podcast Direction & Switching',
      'Professional Podcast Post-Production & Mixing',
      'Short-Form Clips & Social Cutdowns',
      'Podcast Format Development & Creative Direction',
      'Show Distribution & Monetization Consultation',
    ],
    specs: [
      { label: 'Microphone Array', value: 'Shure SM7B Broadcast Dynamics' },
      { label: 'Video Capture', value: 'Multi-Cam 4K UHD 60fps' },
      { label: 'Acoustics', value: 'Custom Tuned NRC 0.85 Baffles' },
      { label: 'Mastering', value: '-16 LUFS Integrated Podcast Standard' },
    ],
    metrics: [
      { label: 'Episodes Produced', value: '250+', sublabel: 'Audio & visual series' },
      { label: 'Audience Reach', value: '35M+', sublabel: 'Total client listeners' },
      { label: 'Fast Turnaround', value: '48hr', sublabel: 'Edited master delivery' },
    ],
    showcases: [
      {
        title: 'Beyond the Curve',
        client: 'Founders Circle Africa',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
        description: 'Flagship executive video podcast recorded in an intimate architectural lounge studio.',
        tags: ['Video Podcast', 'Multi-Cam', 'Reels Strategy'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Podcast Project Requirements',
      options: [
        'Full Season Video Podcast Production',
        'Single Session / Pilot Episode Recording',
        'Audio + Video Multi-Cam Studio Booking',
        'Podcast Editing & Social Cutdown Package',
      ],
      placeholder: 'e.g. 10-episode business podcast with 2 hosts and guest, audio + video',
    },
  },

  'content-creation': {
    id: 'content-creation',
    title: 'Content Creation',
    tagline: 'Short-form video assets and YouTube series produced in focused sprints.',
    heroBadge: 'Digital & Growth',
    ambientColor: 'rgba(6, 182, 212, 0.18)',
    ambientGlow: 'rgba(14, 165, 233, 0.35)',
    accentHex: '#0891B2',
    description:
      'We produce short-form video libraries and YouTube series designed to hold attention on social platforms.',
    leadParagraph:
      'We shoot and edit batches of vertical reels, product demonstrations, and brand promos in single production runs so you have weeks of content ready to publish.',
    specialties: [
      'Social Media Video Campaigns (Reels & TikTok)',
      'Branded Video Content & Narrative Shorts',
      'YouTube Channel Production & Optimization',
      'Short-Form Video Assets',
      'Product Demonstrations & Creative Showcases',
      'Promotional Launch Sequences & Teasers',
    ],
    specs: [
      { label: 'Format Pacing', value: 'Vertical 9:16, 4:5 & 16:9 Native' },
      { label: 'Sprint Output', value: 'Batch 15–40 Assets per Sprint' },
      { label: 'Motion Graphics', value: 'Dynamic Typography & Brand Styling' },
      { label: 'Optimized Delivery', value: 'Platform Native Compression' },
    ],
    metrics: [
      { label: 'Digital Views', value: '80M+', sublabel: 'Generated for partner brands' },
      { label: 'Average Engagement', value: '4.8x', sublabel: 'Compared to static media' },
      { label: 'Content Vault', value: 'Batch', sublabel: 'Full quarterly calendar' },
    ],
    showcases: [
      {
        title: 'Horizon Launch Series',
        client: 'Nebula Smart Mobility',
        year: '2026',
        aspectRatio: '9:16',
        imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80',
        description: 'Mobile-first promotional rollout generating over 12 million impressions.',
        tags: ['Content Creation', 'Reels', 'Social Campaign'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Content Scope & Goals',
      options: [
        'Monthly Social Media Retainer (Reels / TikTok)',
        'Quarterly Content Sprint (Batch Production)',
        'YouTube Channel Production & Editing',
        'Product Launch Promo Campaign',
      ],
      placeholder: 'e.g. 20 short-form reels for product launch in Lagos',
    },
  },

  'commercial-advertising': {
    id: 'commercial-advertising',
    title: 'Commercial & Advertising Production',
    tagline: 'Television ads and digital video campaigns built to drive conversions.',
    heroBadge: 'Commercial & Brand',
    ambientColor: 'rgba(239, 68, 68, 0.18)',
    ambientGlow: 'rgba(248, 113, 113, 0.35)',
    accentHex: '#DC2626',
    description:
      'We write, film, and finish commercials for television broadcast and paid digital campaigns.',
    leadParagraph:
      'We produce 15, 30, and 60-second commercials along with social cutdowns. We manage casting, studio lighting, high-speed camera work, and delivery formats that comply with broadcast regulatory clearances.',
    specialties: [
      'Television Commercials (TVC) & Broadcast Ads',
      'High-Conversion Digital Adverts (Paid Media)',
      'Promotional Brand Videos & Showcases',
      'Product Launch & Macro Cinematography',
      'Brand Narrative Campaigns',
      'Creative Scripting, Storyboarding & Direction',
    ],
    specs: [
      { label: 'Camera Systems', value: 'High-Speed Phantom & Cinema 8K' },
      { label: 'Lighting Arrays', value: 'Aputure & ARRI Daylight Sets' },
      { label: 'Finishing', value: 'VFX / 3D Product Integration' },
      { label: 'Clearance', value: 'APCON / Broadcast Standard Compliance' },
    ],
    metrics: [
      { label: 'Commercial Campaigns', value: '75+', sublabel: 'Delivered for leading brands' },
      { label: 'Brand ROI Boost', value: '3.2x', sublabel: 'Average campaign lift' },
      { label: 'Broadcast Approved', value: '100%', sublabel: 'Zero transmission rejects' },
    ],
    showcases: [
      {
        title: 'Essence of Purity',
        client: 'Aura Luxury Fragrances',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1600&q=80',
        description: 'Cinematic commercial featuring fluid dynamics, slow-motion lighting, and luxury typography.',
        tags: ['Commercial', 'TVC', 'High-Speed Cinema'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Campaign Format & Budget Target',
      options: [
        'Television Commercial (Full Broadcast TVC)',
        'Digital Performance Ad Campaign (Paid Social)',
        'Product Reveal Film (Cinematic Showcase)',
        'Brand Anthem / Flagship Campaign Film',
      ],
      placeholder: 'e.g. 60s TVC + 30s and 15s cutdowns for nationwide broadcast',
    },
  },

  'studio-design': {
    id: 'studio-design',
    title: 'Studio Design & Fabrication',
    tagline: 'Custom studio construction, acoustic wall treatments, and lighting rigs.',
    heroBadge: 'Design & Fabrication',
    ambientColor: 'rgba(16, 185, 129, 0.18)',
    ambientGlow: 'rgba(52, 211, 153, 0.35)',
    accentHex: '#059669',
    description:
      'We design and build television sets, podcast rooms, creator studios, and acoustic backdrops.',
    leadParagraph:
      'We handle the full build process: 3D concept renders, acoustic room analysis, custom carpentry, lighting grid installation, and final equipment integration.',
    specialties: [
      'Television Studio Design & Set Construction',
      'Podcast Studios & Acoustic Lounge Sets',
      'YouTube Creator Studios & Lighting Environments',
      'Custom Talk Show Sets & Desk Fabrication',
      'Corporate Content Studios & In-House Media Rooms',
      'Church Media Studios & Broadcast Auditoriums',
      'Architectural Feature Walls, Slatting & Backdrops',
      'Turnkey 3D Visualisation, Fabrication & Installation',
    ],
    specs: [
      { label: 'Acoustics', value: 'Diffusion Panels & Custom Fabric Baffles' },
      { label: 'Lighting Grid', value: 'Modular Truss & Smart DMX LED Strips' },
      { label: 'Materials', value: 'High-Density Acoustic Wood, Metal & Acrylic' },
      { label: 'Visualisation', value: 'Photorealistic 3D Concept Renders' },
    ],
    metrics: [
      { label: 'Studios Built', value: '40+', sublabel: 'Turnkey fabrication projects' },
      { label: 'Client Space', value: 'Custom', sublabel: 'Tailored to room dimensions' },
      { label: 'Handover Spec', value: 'Turnkey', sublabel: 'Plug-and-play ready' },
    ],
    showcases: [
      {
        title: 'Apex Broadcast Studio',
        client: 'Global Media Group',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
        description: 'Complete studio fabrication featuring acoustic wall paneling, circular host desk, and DMX backlighting.',
        tags: ['Studio Fabrication', 'Turnkey Build', 'Broadcast Set'],
      },
      {
        title: 'The Creator Loft',
        client: 'Digital Vision Media',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
        description: 'Modular acoustic slatting, floating display monitors, and multi-zone lighting in 65sqm creator space.',
        tags: ['Podcast Studio', 'Acoustic Slatting', '3D Design'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Studio Project Requirements',
      options: [
        'Television / Broadcast Studio Design & Fabrication',
        'Podcast Studio (Turnkey Build & Acoustics)',
        'YouTube / Creator Studio Setup',
        'Church Media / Auditorium Set Design',
        'Corporate Content Studio / Meeting Room Conversion',
      ],
      placeholder: 'e.g. 5m x 4m room in Lagos to be converted into a 3-person podcast studio',
    },
  },

  'media-consultation': {
    id: 'media-consultation',
    title: 'Media Consultation & Creative Direction',
    tagline: 'Technical blueprints, gear specifications, and production planning.',
    heroBadge: 'Strategy & Direction',
    ambientColor: 'rgba(59, 130, 246, 0.18)',
    ambientGlow: 'rgba(96, 165, 250, 0.35)',
    accentHex: '#2563EB',
    description:
      'We advise organizations on studio setup, camera kit purchases, production budgets, and technical workflows.',
    leadParagraph:
      'We work with creative directors, corporate teams, and institutions to evaluate facilities, recommend gear, structure production schedules, and streamline crew workflows before work starts.',
    specialties: [
      'Media & Broadcast Planning',
      'Content Planning & Audience Positioning',
      'Creative Direction & Visual Identity',
      'Production Budgeting & Technical Planning',
      'Studio Equipment Sourcing & Technical Auditing',
      'Project Coordination & Supervision',
    ],
    specs: [
      { label: 'Deliverable', value: 'Full Technical Roadmap & Architecture Deck' },
      { label: 'Auditing', value: 'Workflow, Equipment & Space Assessment' },
      { label: 'Sessions', value: '1-on-1 Executive or Team Workshops' },
      { label: 'Ongoing', value: 'Production Oversight & Retainer Support' },
    ],
    metrics: [
      { label: 'Brands Advised', value: '60+', sublabel: 'Corporate, church & broadcast' },
      { label: 'Budget Efficiency', value: '35%', sublabel: 'Saved via strategic planning' },
      { label: 'Execution Rate', value: '100%', sublabel: 'From blueprint to delivery' },
    ],
    showcases: [
      {
        title: 'National Media Hub Blueprint',
        client: 'Federal Cultural Institute',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80',
        description: 'Complete technical architecture, equipment spec, and team workflow blueprint for new multi-studio facility.',
        tags: ['Consultation', 'Technical Blueprint', 'Creative Strategy'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Consultation Scope',
      options: [
        'Studio Setup & Equipment Advisory',
        'Media & Content Strategy Session',
        'Production Planning & Budget Architecture',
        'Creative Direction & Brand Visual Consulting',
      ],
      placeholder: 'e.g. Planning a new media department and need equipment recommendations and studio roadmap',
    },
  },
}

export const SERVICE_KEYS = Object.keys(SERVICES_CONFIG)
export const DISCIPLINES = SERVICES_CONFIG
export const DISCIPLINE_KEYS = SERVICE_KEYS
