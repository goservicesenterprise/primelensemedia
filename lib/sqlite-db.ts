import { DatabaseSync } from 'node:sqlite'
import path from 'path'
import fs from 'fs'
import crypto from 'node:crypto'
import { EnquiryItem, TestimonialItem, SectionContent } from '@/types/admin'

const DATA_DIR = path.join(process.cwd(), 'data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const DB_PATH = path.join(DATA_DIR, 'primelense_admin.sqlite')

let dbInstance: DatabaseSync | null = null

export function getDatabase(): DatabaseSync {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH)
    dbInstance.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA foreign_keys = ON;

      -- Admins table
      CREATE TABLE IF NOT EXISTS admins (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'superadmin',
        created_at TEXT NOT NULL
      );

      -- Sessions table
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        admin_id TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
      );

      -- Enquiries table
      CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        organization TEXT,
        service TEXT NOT NULL,
        shoot_type TEXT,
        budget TEXT,
        timeline TEXT,
        location TEXT,
        project_scope TEXT,
        reference_links TEXT,
        stages TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        notes TEXT,
        created_at TEXT NOT NULL
      );

      -- Testimonials table
      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        author TEXT NOT NULL,
        role TEXT NOT NULL,
        company TEXT NOT NULL,
        avatar_url TEXT,
        content TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        service_tag TEXT NOT NULL,
        is_featured INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL
      );

      -- Sections table
      CREATE TABLE IF NOT EXISTS sections (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        badge TEXT,
        tagline TEXT,
        highlight_text TEXT,
        description TEXT,
        rich_text_html TEXT,
        media_type TEXT DEFAULT 'image',
        media_source TEXT DEFAULT 'cloudinary',
        media_url TEXT,
        media_poster TEXT,
        cta_primary_label TEXT,
        cta_primary_link TEXT,
        cta_secondary_label TEXT,
        cta_secondary_link TEXT,
        og_title TEXT,
        og_description TEXT,
        og_image TEXT,
        metadata TEXT,
        updated_at TEXT NOT NULL
      );
    `)

    // Migrate any missing columns if table existed previously with simpler schema
    try {
      const tableInfo = dbInstance.prepare("PRAGMA table_info('sections')").all() as any[]
      const colNames = new Set(tableInfo.map((c) => c.name))
      if (!colNames.has('highlight_text')) {
        dbInstance.exec('ALTER TABLE sections ADD COLUMN highlight_text TEXT;')
      }
      if (!colNames.has('media_type')) {
        dbInstance.exec("ALTER TABLE sections ADD COLUMN media_type TEXT DEFAULT 'image';")
      }
      if (!colNames.has('media_source')) {
        dbInstance.exec("ALTER TABLE sections ADD COLUMN media_source TEXT DEFAULT 'cloudinary';")
      }
      if (!colNames.has('media_poster')) {
        dbInstance.exec('ALTER TABLE sections ADD COLUMN media_poster TEXT;')
      }
      if (!colNames.has('cta_primary_label')) {
        dbInstance.exec('ALTER TABLE sections ADD COLUMN cta_primary_label TEXT;')
      }
      if (!colNames.has('cta_primary_link')) {
        dbInstance.exec('ALTER TABLE sections ADD COLUMN cta_primary_link TEXT;')
      }
      if (!colNames.has('cta_secondary_label')) {
        dbInstance.exec('ALTER TABLE sections ADD COLUMN cta_secondary_label TEXT;')
      }
      if (!colNames.has('cta_secondary_link')) {
        dbInstance.exec('ALTER TABLE sections ADD COLUMN cta_secondary_link TEXT;')
      }
    } catch (e) {
      // Ignore migration errors if already present
    }

    initDefaultData(dbInstance)
  }
  return dbInstance
}

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex')
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const calculatedHash = hashPassword(password, salt)
  return crypto.timingSafeEqual(Buffer.from(calculatedHash, 'hex'), Buffer.from(hash, 'hex'))
}

function initDefaultData(db: DatabaseSync) {
  // Check if default admin exists
  const adminCheck = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin')
  if (!adminCheck) {
    const salt = crypto.randomBytes(16).toString('hex')
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'PrimeLense@2026'
    const passwordHash = hashPassword(initialPassword, salt)
    const adminId = 'adm-' + crypto.randomUUID()
    const stmt = db.prepare(
      'INSERT INTO admins (id, username, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    stmt.run(adminId, 'admin', passwordHash, salt, 'superadmin', new Date().toISOString())
  }

  // Seed default testimonials if empty
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as { count: number }
  if (countStmt.count === 0) {
    const insertTestimonial = db.prepare(`
      INSERT INTO testimonials (id, author, role, company, avatar_url, content, rating, service_tag, is_featured, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    insertTestimonial.run(
      't-1',
      'Chief Adebayo Adeleke',
      'Executive Director of Communications',
      'Pan-African Leadership Initiative',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'PrimeLense Media delivered a masterclass in visual storytelling for our continental documentary. Their cinematic precision, lighting rig and sound staging exceeded our international broadcast partners expectations.',
      5,
      'Media Production',
      1,
      new Date().toISOString()
    )
    insertTestimonial.run(
      't-2',
      'Folashade Balogun',
      'Head of Brand Marketing',
      'Vanguard Sovereign Holdings',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      'From corporate profiles to multi-cam event broadcasts, the team handled every nuance with executive poise. We have already booked them for our upcoming fiscal showcase.',
      5,
      'Live Broadcast & Events',
      1,
      new Date().toISOString()
    )
    insertTestimonial.run(
      't-3',
      'David O. Mensah',
      'Founder & Managing Director',
      'Helios Industrial Group',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      'The studio acoustic treatment and production gear at PrimeLense are truly world-class. Our brand series gained unprecedented traction on LinkedIn and national television.',
      5,
      'Studio Design & Acoustic Engineering',
      1,
      new Date().toISOString()
    )
  }

  // Upsert all landing page sections with full live website copy
  const upsertSection = db.prepare(`
    INSERT INTO sections (
      id, title, badge, tagline, highlight_text, description, rich_text_html,
      media_type, media_source, media_url, media_poster,
      cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link,
      og_title, og_description, og_image, metadata, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      badge = excluded.badge,
      tagline = excluded.tagline,
      highlight_text = excluded.highlight_text,
      description = excluded.description,
      rich_text_html = excluded.rich_text_html,
      media_type = COALESCE(sections.media_type, excluded.media_type),
      media_source = COALESCE(sections.media_source, excluded.media_source),
      media_url = COALESCE(sections.media_url, excluded.media_url),
      media_poster = COALESCE(sections.media_poster, excluded.media_poster),
      cta_primary_label = excluded.cta_primary_label,
      cta_primary_link = excluded.cta_primary_link,
      cta_secondary_label = excluded.cta_secondary_label,
      cta_secondary_link = excluded.cta_secondary_link,
      og_title = excluded.og_title,
      og_description = excluded.og_description,
      og_image = excluded.og_image,
      metadata = excluded.metadata,
      updated_at = excluded.updated_at
  `)

  // 1. Hero Section
  upsertSection.run(
    'hero',
    'Ideas in Motion.',
    'Creative Media Production & Studio Solutions',
    'From Script to Master Deliverable',
    'Spaces with Purpose.',
    'Creative media production and turnkey studio solutions. From documentaries, commercials, and podcasts to broadcast television and custom-built studios.',
    '<p>We deploy seasoned directors, cinematographers, precision lighting, and world-class studio acoustic engineering across Africa and the United Kingdom.</p>',
    'video',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '/primelense_media_logo_clean.png',
    'Start a Project',
    '#start-a-project',
    'View Our Work',
    '#our-work',
    'PrimeLense Media | Ideas in Motion. Spaces with Purpose.',
    'Creative media production and turnkey studio solutions based in Lagos, Nigeria.',
    '/opengraph-image.png',
    JSON.stringify({
      stats: [
        { label: 'Productions Delivered', value: '150+' },
        { label: 'Client Satisfaction', value: '100%' },
      ],
    }),
    new Date().toISOString()
  )

  // 2. Company Profile (About)
  upsertSection.run(
    'about',
    'We Create. We Produce. We Build.',
    'Company Profile',
    'Lagos Studio Headquarters • Registered Enterprise',
    'From Raw Space to Broadcast Reality',
    'PrimeLense Media Ltd. produces video and builds studios in Lagos. We combine hands-on camera work, directing, and carpentry to deliver projects for broadcasters, companies, and creators.',
    '<p>We started behind the camera in cinematography and editing, then expanded into directing, production management, and studio fabrication. Over the years, we have worked with television networks, corporate teams, government agencies, churches, and independent creators.</p><p>We handle projects across five areas: documentaries, television and event coverage, commercial ads, short-form digital content, and acoustically treated production sets.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    null,
    'Explore Capabilities',
    '#services',
    null,
    null,
    'About PrimeLense Media | We Create. We Produce. We Build.',
    'Cinematography, directing, and turnkey acoustic studio construction in Lagos.',
    '/og-image-square.png',
    JSON.stringify({
      operatingHours: 'Mon – Sat: 8:00 AM – 7:00 PM WAT',
      headquarters: 'Lagos, Nigeria',
    }),
    new Date().toISOString()
  )

  // 3. Mission
  upsertSection.run(
    'mission',
    'Our Mission',
    'Core Purpose',
    'Dependable execution on every shoot and build',
    'Precision & Polish',
    'Deliver dependable video production and custom studio builds that help businesses and creators present their work clearly.',
    '<p>We combine cinema-grade technology with disciplined project management to bring stories to life on screen and in custom-built studios.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    null,
    null,
    null,
    null,
    null,
    'Our Mission - PrimeLense Media',
    'Deliver dependable video production and custom studio builds.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )

  // 4. Vision
  upsertSection.run(
    'vision',
    'Our Vision',
    'Future Horizon',
    'Recognized across Nigeria and beyond',
    'Leading Creative Infrastructure',
    'Build a reliable media house and studio design firm known across Nigeria for technical quality and straightforward execution.',
    '<p>Setting the benchmark for acoustic excellence, broadcast standards, and creative storytelling in West Africa.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
    null,
    null,
    null,
    null,
    null,
    'Our Vision - PrimeLense Media',
    'Setting the benchmark for broadcast standards and studio design.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )

  // 5. Who We Serve
  upsertSection.run(
    'who-we-serve',
    'Who We Serve',
    'Target Audience',
    'From Global Brands to Independent Creators',
    'Enterprises & Visionaries',
    'Companies, television stations, government parastatals, advertising agencies, churches, NGOs, and independent video creators.',
    '<ul><li><strong>Corporate Organizations & Financial Institutions:</strong> Executive interviews, brand documentaries, AGM broadcasts.</li><li><strong>Broadcasters & TV Networks:</strong> Multicamera event coverage, talk show sets, sound stages.</li><li><strong>Agencies & Brands:</strong> High-impact commercial ads and digital marketing series.</li><li><strong>Churches, NGOs & Creators:</strong> Live stream setups, podcast studios, acoustic treatment.</li></ul>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    null,
    'Book a Consultation',
    '#start-a-project',
    null,
    null,
    'Who We Serve - PrimeLense Media',
    'Trusted by corporate enterprises, television stations, agencies, and creators.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )

  // 6. Services Overview
  upsertSection.run(
    'services',
    'Seven Disciplines. One High Standard.',
    'Capabilities & Solutions',
    'End-to-End Creative & Technical Services',
    'One High Standard.',
    'Whether you need a full production crew on location, a live multicamera broadcast, or an acoustic studio built from scratch, our team delivers every phase under one roof.',
    '<p>PrimeLense Media integrates cinema equipment, seasoned directors, acoustic carpenters, and post-production colorists to produce work that stands out internationally.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    null,
    'Start a Project',
    '#start-a-project',
    'Explore Disciplines',
    '#media-production',
    'Services & Disciplines - PrimeLense Media',
    'Media production, studio fabrication, live broadcasting, and podcasting.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )

  // 7. Studio Design & Fabrication
  upsertSection.run(
    'studio-design',
    'Acoustic Engineering & Turnkey Studio Fabrication',
    'Studio Buildouts',
    'From bare shell to broadcast-ready acoustics',
    'Built for Precision Sound & Vision',
    'We design and construct broadcast-grade soundstages, podcast studios, and commercial editing suites with certified STC soundproofing, bass trapping, custom lighting grids, and bespoke furniture.',
    '<p>Every room is engineered with decoupled framing, high-density acoustic insulation, diffusion panels, and silent air exchange systems to ensure zero ambient noise bleed.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    null,
    'Commission a Studio Build',
    '#start-a-project',
    'View Specifications',
    '#process',
    'Studio Design & Turnkey Fabrication - PrimeLense Media',
    'Certified STC acoustic isolation and bespoke studio construction in Lagos.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )

  // 8. Work Showcase
  const defaultWorkShowcaseProjects = JSON.stringify({
    projects: [
      {
        id: 'proj-1',
        title: 'Legacy of Vision',
        client: 'Pan-African Leadership Initiative',
        category: 'FILM & DOCUMENTARIES',
        year: '2025',
        mediaType: 'image',
        mediaSource: 'cloudinary',
        mediaUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
        description: 'Feature documentary exploring leadership, continental infrastructure, and generational change.',
        tags: ['Documentary', 'Cinema 4K', 'Global Broadcast'],
      },
      {
        id: 'proj-2',
        title: 'Apex Newsroom & Studio 01',
        client: 'Continental Media Network',
        category: 'STUDIO DESIGN',
        year: '2026',
        mediaType: 'image',
        mediaSource: 'cloudinary',
        mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        description: 'Complete 3D design, acoustic fabrication, custom anchor desk, and DMX lighting array.',
        tags: ['Studio Design', 'Turnkey Build', 'Broadcast'],
      },
      {
        id: 'proj-3',
        title: 'Beyond the Curve',
        client: 'Founders Circle Africa',
        category: 'PODCASTS',
        year: '2026',
        mediaType: 'image',
        mediaSource: 'cloudinary',
        mediaUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
        description: 'Flagship multi-cam video podcast capturing in-depth dialogue with prominent African business leaders.',
        tags: ['Video Podcast', 'Multi-Cam', 'Social Cutdowns'],
      },
      {
        id: 'proj-4',
        title: 'Essence of Purity',
        client: 'Aura Luxury Fragrances',
        category: 'COMMERCIALS',
        year: '2026',
        mediaType: 'image',
        mediaSource: 'cloudinary',
        mediaUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
        image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
        description: 'High-speed television commercial and digital ad campaign driving premier luxury engagement.',
        tags: ['Commercial', 'TVC', 'High-Speed Cinema'],
      },
      {
        id: 'proj-5',
        title: 'The Dialogue Hour',
        client: 'National Broadcast Service',
        category: 'TELEVISION',
        year: '2025',
        mediaType: 'image',
        mediaSource: 'cloudinary',
        mediaUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80',
        image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80',
        description: 'Syndicated weekly talk show featuring multi-camera live switching and custom set backdrop.',
        tags: ['Television', 'Talk Show', 'Syndication'],
      },
      {
        id: 'proj-6',
        title: 'Global Summit 2025',
        client: 'West African Economic Forum',
        category: 'EVENTS',
        year: '2025',
        mediaType: 'image',
        mediaSource: 'cloudinary',
        mediaUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        description: 'Live broadcast production, keynote recording, and real-time social media video clip delivery.',
        tags: ['Event Production', 'Live Stream', 'Multi-Cam'],
      },
    ],
  })

  upsertSection.run(
    'work-showcase',
    'Selected Productions & Recent Works',
    'Portfolio & Showcase',
    'Films, Commercials, Documentaries & Broadcasts',
    'Craft in Every Cut.',
    'Explore featured projects executed across cinema 4K RAW capture, broadcast television, and corporate brand profiles.',
    '<p>Each project reflects our dedication to cinematic composition, organic lighting, calibrated DaVinci Resolve color, and clean sound capture.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    null,
    'View Showreel',
    '#showreel',
    'Discuss Your Brief',
    '#start-a-project',
    'Our Work - PrimeLense Media',
    'Documentaries, commercial advertising, and event broadcast showcase.',
    '/opengraph-image.png',
    defaultWorkShowcaseProjects,
    new Date().toISOString()
  )

  // 9. Showreel Section
  upsertSection.run(
    'showreel',
    'Watch the PrimeLense Media Official Showreel',
    'Cinema Reel 2026',
    'Director Cuts & Highlights',
    'Experience the Vision',
    'A cinematic compilation of our cinematography, documentary directing, event multicam coverage, and broadcast studio productions.',
    '<p>Streamed in high definition with stereo broadcast audio mix.</p>',
    'video',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    'Watch Full Reel',
    '#showreel',
    'Start a Project',
    '#start-a-project',
    'Official Showreel - PrimeLense Media',
    'Cinematography and production highlights.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )

  // 10. Why Choose Us & Process
  upsertSection.run(
    'why-choose-us',
    'Why Productions and Studios Choose PrimeLense',
    'Our Methodology',
    'Disciplined 5-Stage Execution Framework',
    'Proven Reliability',
    'From initial treatment and budgeting to shoot day and final master color delivery, our 5-step framework keeps your timeline predictable and quality uncompromised.',
    '<ol><li><strong>1. Concept & Feasibility:</strong> Treatment, shotlists, budget transparency.</li><li><strong>2. Pre-Production:</strong> Casting, location scouting, set design.</li><li><strong>3. Principal Photography:</strong> Cinema camera packages, directors, sound engineers.</li><li><strong>4. Post-Production:</strong> Editorial cut, DaVinci Resolve color, audio mastering.</li><li><strong>5. Delivery & Distribution:</strong> Multi-format exports for broadcast, digital, and cinema.</li></ol>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
    null,
    'Start a Project',
    '#start-a-project',
    null,
    null,
    'Why Choose Us - PrimeLense Media',
    'Our proven 5-stage production and studio fabrication framework.',
    '/opengraph-image.png',
    null,
    new Date().toISOString()
  )
}
