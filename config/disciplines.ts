import { DisciplineConfig } from '@/types'

export const DISCIPLINES: Record<string, DisciplineConfig> = {
  filmmaking: {
    id: 'filmmaking',
    title: 'Cinematic Filmmaking',
    tagline: 'High-concept feature direction, commercial cinema, and anamorphic optics.',
    heroBadge: 'Cinema & Narrative',
    ambientColor: 'rgba(225, 29, 72, 0.14)',
    ambientGlow: 'rgba(244, 63, 94, 0.35)',
    accentHex: '#E11D48',
    description:
      'We craft narrative experiences engineered for IMAX, high-end theatrical distribution, and global festival circuits. From principal photography to master color grading in ACES, our directors bring an uncompromising eye for light, spatial pacing, and human intimacy.',
    leadParagraph:
      'Operating across the UK, Europe, and West Africa, Primelensemedia deploys dual-operator Arri Alexa 35 and RED V-Raptor configurations with matched Cooke Anamorphic /i full-frame glass. Every frame is sculpted with intent, turning brand narratives into cinematic milestones.',
    specialties: [
      'Theatrical Brand Features & Short Films',
      'High-Impact Commercial Broadcasts',
      'Cinematic Music Visuals & Epics',
      'ACES Color Grading & Master Finishing',
      'Steadicam & Precision Russian Arm Tracking',
    ],
    specs: [
      { label: 'Primary Optics', value: 'Cooke Anamorphic /i Full Frame Plus' },
      { label: 'Camera Systems', value: 'ARRI Alexa 35 & RED V-Raptor 8K VV' },
      { label: 'Color Pipeline', value: 'ACES 1.3 / DaVinci Resolve Studio HDR' },
      { label: 'Aspect Deliveries', value: '2.39:1 CinemaScope / 1.85:1 Flat' },
    ],
    metrics: [
      { label: 'Festival Laurels', value: '18+', sublabel: 'International selections' },
      { label: 'Max Delivery Spec', value: '8K RAW', sublabel: '16-bit uncompressed pipeline' },
      { label: 'Dynamic Range', value: '17 Stops', sublabel: 'Preserved highlights' },
    ],
    showcases: [
      {
        title: 'Chronicles of Solitude',
        client: 'A24 / Narrative Division',
        year: '2025',
        aspectRatio: '2.39:1',
        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
        description: 'Atmospheric 35mm-equivalent anamorphic cinematography set across rugged coastal terrain, investigating solitude and lineage.',
        tags: ['Narrative', 'Anamorphic', 'Festival Winner'],
      },
      {
        title: 'Velocity & Gravity',
        client: 'Apex Automotive Group',
        year: '2026',
        aspectRatio: '2.39:1',
        imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=80',
        description: 'High-speed track tracking and nocturnal neon lighting arrays capturing the transition to electric hypercars.',
        tags: ['Commercial', 'Russian Arm', 'High-Speed'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Project Scale & Preferred Optic Format',
      options: [
        'Commercial Brand Film (Full Production)',
        'Narrative Feature / Short / Festival Submission',
        'Documentary / Multi-Territory Filming',
        'Post-Production & ACES Color Finishing Only',
      ],
      placeholder: 'e.g. 3-day location shoot in London/Paris, targeting 2.39:1 CinemaScope',
    },
  },

  'content-creation': {
    id: 'content-creation',
    title: 'Content Creation & Brand IP',
    tagline: 'High-velocity visual storytelling engineered for cultural ubiquity.',
    heroBadge: 'Brand Media & Velocity',
    ambientColor: 'rgba(6, 182, 212, 0.14)',
    ambientGlow: 'rgba(14, 165, 233, 0.35)',
    accentHex: '#06B6D4',
    description:
      'Modern brands need more than casual posts; they require cohesive visual universes. We produce high-tempo episodic content, editorial lookbooks, campaign assets, and dynamic digital campaigns that turn casual scrollers into devoted brand advocates.',
    leadParagraph:
      'We merge editorial fashion pacing with documentary realism. By executing multi-cam modular shoots, our units produce an entire quarterly content repository—from 9:16 vertical anthems to 16:9 cinematic teasers—in a single streamlined sprint.',
    specialties: [
      'Multi-Format Brand Storytelling (9:16, 4:5, 16:9)',
      'High-Cadence Editorial Fashion & Tech Drops',
      'Dynamic Founder Profiles & Behind-The-Lens IP',
      'Interactive Social Motion & 3D Typography',
      'Global Campaign Modular Asset Banks',
    ],
    specs: [
      { label: 'Capture Format', value: '4K ProRes 422HQ & Open Gate 3:2' },
      { label: 'Turnaround Time', value: '72hr Fast-Track Master Delivery' },
      { label: 'Color Cohesion', value: 'Unified Cross-Platform Display P3' },
      { label: 'Audio Delivery', value: 'Binaural Stereo & Spatial Audio' },
    ],
    metrics: [
      { label: 'Organic Impressions', value: '140M+', sublabel: 'Generated for partner brands' },
      { label: 'Content Vault Size', value: '45+', sublabel: 'Cutdowns per production sprint' },
      { label: 'Avg Retention Rate', value: '84%', sublabel: 'Through first 30 seconds' },
    ],
    showcases: [
      {
        title: 'Monolith: Spring Edition',
        client: 'Vanguard Luxury Goods',
        year: '2026',
        aspectRatio: '4:5',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
        description: 'Multi-screen experiential campaign featuring kinetic lighting and custom modular typographic titles.',
        tags: ['Editorial', 'Social Architecture', 'High Velocity'],
      },
      {
        title: 'The Modern Artisan',
        client: 'Kyoto Heritage Craft',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
        description: 'Documentary-style micro-vignettes profiling master craftsmen with hyper-detailed macro cinematography.',
        tags: ['Docu-Series', 'Cultural IP', 'Macro Cinema'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Content Scope & Delivery Cadence',
      options: [
        'Quarterly Campaign Vault (40+ Modular Assets)',
        'Product Launch Sprint (Teaser + Reveal + Cutdowns)',
        'Founder / Brand Documentary Episodic Series',
        'Ongoing Monthly Creative Direction & Content Retainer',
      ],
      placeholder: 'e.g. Summer product line rollout across Instagram, TikTok, and YouTube Shorts',
    },
  },

  'media-consultation': {
    id: 'media-consultation',
    title: 'Media Consultation & Creative Advisory',
    tagline: 'Strategic positioning, visual identity audits, and media architecture.',
    heroBadge: 'Advisory & Direction',
    ambientColor: 'rgba(56, 189, 248, 0.12)',
    ambientGlow: 'rgba(99, 102, 241, 0.32)',
    accentHex: '#38BDF8',
    description:
      'We guide institutional brands, family offices, and emerging conglomerates through the complex terrain of contemporary visual communication. We do not just make videos—we define how your brand sounds, moves, and commands authority in high-stakes markets.',
    leadParagraph:
      'Our partners include international luxury houses, venture-backed tech platforms, and high-net-worth creators. We assess visual liabilities, design proprietary brand design systems, and build internal media studios from the ground up.',
    specialties: [
      'Comprehensive Visual Identity Audits',
      'Executive Tone-of-Voice & Screen Presence Coaching',
      'Proprietary In-House Studio Design & Architecture',
      'Media Asset Valuation & Distribution Strategy',
      'Crisis Communications Visual Protocols',
    ],
    specs: [
      { label: 'Deliverable', value: 'Complete 100+ Page Brand Media Bible' },
      { label: 'Studio Blueprinting', value: 'Acoustic, Electrical & Camera Schematics' },
      { label: 'Advisory Cadence', value: 'Bi-Weekly Partner-Level Counsel' },
      { label: 'Benchmarking', value: 'Global Tier-1 Competitor Analysis' },
    ],
    metrics: [
      { label: 'Enterprise Audits', value: '35+', sublabel: 'Completed across 8 countries' },
      { label: 'Media ROI Uplift', value: '3.4x', sublabel: 'Average client engagement gain' },
      { label: 'Studio Builds Guided', value: '12', sublabel: 'Private executive studios' },
    ],
    showcases: [
      {
        title: 'Sovereign Capital Visual Repositioning',
        client: 'Meridian Global Assets',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
        description: 'Comprehensive media architecture overhaul transitioning a traditional fund into an authoritative modern voice.',
        tags: ['Strategy', 'Brand Architecture', 'Global Advisory'],
      },
      {
        title: 'Studio Alpha Blueprint',
        client: 'Synthetix Tech',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
        description: 'Complete architectural specification and broadcast workflow implementation for an internal 5,000 sq ft media wing.',
        tags: ['Studio Architecture', 'Workflow Design', 'Turn-Key'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Advisory Objective & Company Profile',
      options: [
        'Full Brand Visual Audit & Comprehensive Media Bible',
        'In-House Private Media Studio Architecture & Build Plan',
        'Executive Screen Coaching & Keynote Visual Packaging',
        'Long-Term Strategic Advisory Retainer',
      ],
      placeholder: 'e.g. We are building an internal studio in London and need technical & acoustic direction',
    },
  },

  'set-fabrication': {
    id: 'set-fabrication',
    title: 'Set Fabrication & Stage Architecture',
    tagline: 'Custom soundstages, precision physical sets, and bespoke studio engineering.',
    heroBadge: 'Physical Engineering',
    ambientColor: 'rgba(249, 115, 22, 0.14)',
    ambientGlow: 'rgba(234, 88, 12, 0.35)',
    accentHex: '#F97316',
    description:
      'We transform physical spaces into breathing, cinematic worlds. From soundproofed infinity cycloramas to complex architectural set pieces for commercials and feature productions, our master carpenters, acoustic engineers, and lighting artisans build with millimeters of tolerance.',
    leadParagraph:
      'Combining aerospace-grade acoustic dampening materials with bespoke parametric woodwork, our fabrication teams build durable, modular sets that adapt dynamically on shoot day. Seamless lighting grids, concealed cable troughs, and precision motorized backdrops ensure zero downtime.',
    specialties: [
      'Infinite U-Shaped Cyclorama Wall Construction',
      'Architectural Physical Props & Set Environments',
      'Soundproofing & STC 65+ Acoustic Treatment',
      'Motorized DMX Overhead Truss & Grid Systems',
      'Turn-Key Broadcast & Virtual Production Stages',
    ],
    specs: [
      { label: 'Acoustic Rating', value: 'NC-20 / STC 68 Sound Isolation' },
      { label: 'Grid System', value: 'Pre-Rigged 2-Inch Tubular DMX Truss' },
      { label: 'Finishes', value: 'Matte Non-Reflective Cinema Velvet & Wood' },
      { label: 'Modularity', value: 'Magnetized Quick-Swap Acoustic Panels' },
    ],
    metrics: [
      { label: 'Stages Built', value: '28,000+', sublabel: 'Square feet engineered' },
      { label: 'Sound Isolation', value: 'NC-20', sublabel: 'Studio whisper-quiet standard' },
      { label: 'Build Precision', value: '±1mm', sublabel: 'Cabinet-grade finish' },
    ],
    showcases: [
      {
        title: 'Stage 04 Infinite Cyclorama',
        client: 'Primelense Soundstage London',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
        description: 'A 4,200 sq ft dual-corner cyc with integrated continuous diffused softbox lighting and zero floor seam.',
        tags: ['Cyc Wall', 'DMX Lighting', 'Stage Engineering'],
      },
      {
        title: 'Brutalist Concrete & Walnut Set',
        client: 'Architectural Digest / Special Feature',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        description: 'Parametric acoustic fluted walnut paneling coupled with faux-raw concrete monoliths for an executive interview series.',
        tags: ['Custom Set', 'Acoustics', 'Architectural'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Space Dimensions & Build Requirements',
      options: [
        'Custom Cyclorama Wall (White / Green / Black)',
        'Full Studio Soundproofing & Acoustic Treatment',
        'Bespoke Episodic / Commercial Set Construction',
        'Motorized Overhead Truss & Lighting Grid Installation',
      ],
      placeholder: 'e.g. 1,500 sq ft empty commercial warehouse, need cyc wall + acoustic ceiling',
    },
  },

  'podcast-brand-videos': {
    id: 'podcast-brand-videos',
    title: 'Podcast Studios & Brand Broadcasts',
    tagline: 'Broadcast-grade multi-cam studios, broadcast fidelity audio, and live streaming.',
    heroBadge: 'Broadcast & Sound',
    ambientColor: 'rgba(16, 185, 129, 0.14)',
    ambientGlow: 'rgba(52, 211, 153, 0.35)',
    accentHex: '#10B981',
    description:
      'We engineer podcast environments that rival network television. Combining Shure SM7B signal chains, Neve analog preamplification, 4K multi-cam live-switching, and cinematic shallow depth of field, we make conversations look and feel monumental.',
    leadParagraph:
      'From Silicon Valley founders to chart-topping cultural commentators, our studio setups deliver pristine zero-noise isolation and magnetic visual warmth. Our team oversees live line-cutting, real-time ISO recording, and automated highlight distribution.',
    specialties: [
      '4K Multi-Cam Robotic & Operator Driven Setups',
      'Analog Sound Chains: Shure, Neumann & Rupert Neve',
      'Real-Time Live Switching & Remote Guest Integration',
      'Same-Day Social Micro-Clips & Vertical Highlights',
      'Custom Branded LED Neon & Atmospheric Luminescence',
    ],
    specs: [
      { label: 'Audio Chain', value: 'Neumann U87 / Shure SM7dB via Rupert Neve 5025' },
      { label: 'Visual Capture', value: '4x Sony FX6 Full Frame Cine Cams' },
      { label: 'Switching Unit', value: 'Blackmagic ATEM Constellation 8K' },
      { label: 'Live Monitoring', value: 'Zero-Latency Dante IP Audio Network' },
    ],
    metrics: [
      { label: 'Episodes Produced', value: '450+', sublabel: 'Aired internationally' },
      { label: 'Total Views Generated', value: '80M+', sublabel: 'Across YouTube & Spotify Video' },
      { label: 'Audio Noise Floor', value: '-82dB', sublabel: 'Crystal clear acoustic capture' },
    ],
    showcases: [
      {
        title: 'The Vanguard Dialogues',
        client: 'Global Venture Roundtable',
        year: '2026',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
        description: 'Multi-cam full-frame broadcast setup with custom acoustic warm-glow lighting and instant 9:16 short-form pipeline.',
        tags: ['Multi-Cam', 'Live Switcher', 'Broadcast Sound'],
      },
      {
        title: 'Unfiltered: Culture & Code',
        client: 'NextWave Media',
        year: '2025',
        aspectRatio: '16:9',
        imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80',
        description: 'A cozy midnight lounge podcast aesthetic with vintage analog vu-meters and high-contrast cinema lighting.',
        tags: ['Episodic', 'Analog Tone', 'Studio Setup'],
      },
    ],
    customInquiryFields: {
      questionLabel: 'Broadcast Format & Production Frequency',
      options: [
        'Turn-Key Podcast Season (12+ Multi-Cam Episodes)',
        'Private Executive Podcast Studio Build-out',
        'Live Multi-Platform Broadcast & Virtual Event',
        'Post-Production, Audio Mastering & Short-Form Clips',
      ],
      placeholder: 'e.g. Weekly 3-host conversation with in-studio guests, need full 4K multi-cam setup',
    },
  },
}

export const DISCIPLINE_KEYS = Object.keys(DISCIPLINES) as Array<keyof typeof DISCIPLINES>
