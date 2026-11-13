import { createClient, Client } from '@libsql/client'
import path from 'path'
import fs from 'fs'
import crypto from 'node:crypto'

let clientInstance: Client | null = null
let initPromise: Promise<void> | null = null

export function getDbClient(): Client {
  if (clientInstance) return clientInstance

  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN

  if (tursoUrl) {
    // Cloud database (Turso / LibSQL serverless)
    clientInstance = createClient({
      url: tursoUrl,
      authToken: tursoAuthToken,
    })
  } else {
    // Local fallback for local dev or persistent server / VPS
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true })
      } catch (e) {
        // Ignore if directory cannot be created (e.g. read-only env)
      }
    }
    const dbPath = path.join(dataDir, 'primelense_admin.sqlite')
    clientInstance = createClient({
      url: `file:${dbPath}`,
    })
  }

  return clientInstance
}

export async function ensureDbInitialized(): Promise<Client> {
  const db = getDbClient()
  if (!initPromise) {
    initPromise = (async () => {
      // 1. Create tables if not exist
      await db.executeMultiple(`
        CREATE TABLE IF NOT EXISTS admins (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          salt TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'superadmin',
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          admin_id TEXT NOT NULL,
          expires_at INTEGER NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
        );

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

      // 2. Default admin check & seed
      const adminRes = await db.execute({
        sql: 'SELECT id FROM admins WHERE username = ?',
        args: ['admin'],
      })

      if (adminRes.rows.length === 0) {
        const salt = crypto.randomBytes(16).toString('hex')
        const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'PrimeLense@2026'
        const passwordHash = hashPassword(initialPassword, salt)
        const adminId = 'adm-' + crypto.randomUUID()
        await db.execute({
          sql: 'INSERT INTO admins (id, username, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          args: [adminId, 'admin', passwordHash, salt, 'superadmin', new Date().toISOString()],
        })
      }

      // 3. Default testimonials check & seed
      const testRes = await db.execute('SELECT COUNT(*) as count FROM testimonials')
      const testCount = Number(testRes.rows[0]?.count || 0)
      if (testCount === 0) {
        await db.execute({
          sql: `INSERT INTO testimonials (id, author, role, company, avatar_url, content, rating, service_tag, is_featured, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            't-1',
            'Chief Adebayo Adeleke',
            'Executive Director of Communications',
            'Pan-African Leadership Initiative',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            'PrimeLense Media delivered a masterclass in visual storytelling for our continental documentary. Their cinematic precision, lighting rig and sound staging exceeded our international broadcast partners expectations.',
            5,
            'Media Production',
            1,
            new Date().toISOString(),
          ],
        })
        await db.execute({
          sql: `INSERT INTO testimonials (id, author, role, company, avatar_url, content, rating, service_tag, is_featured, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            't-2',
            'Folashade Balogun',
            'Head of Brand Marketing',
            'Vanguard Sovereign Holdings',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            'From corporate profiles to multi-cam event broadcasts, the team handled every nuance with executive poise. We have already booked them for our upcoming fiscal showcase.',
            5,
            'Live Broadcast & Events',
            1,
            new Date().toISOString(),
          ],
        })
        await db.execute({
          sql: `INSERT INTO testimonials (id, author, role, company, avatar_url, content, rating, service_tag, is_featured, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            't-3',
            'David O. Mensah',
            'Founder & Managing Director',
            'Helios Industrial Group',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
            'The studio acoustic treatment and production gear at PrimeLense are truly world-class. Our brand series gained unprecedented traction on LinkedIn and national television.',
            5,
            'Studio Design & Acoustic Engineering',
            1,
            new Date().toISOString(),
          ],
        })
      }

      // 4. Default sections check & seed
      const secRes = await db.execute('SELECT COUNT(*) as count FROM sections')
      const secCount = Number(secRes.rows[0]?.count || 0)
      if (secCount === 0) {
        await seedDefaultSections(db)
      }
    })()
  }

  await initPromise
  return db
}

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex')
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const calculatedHash = hashPassword(password, salt)
  return crypto.timingSafeEqual(Buffer.from(calculatedHash, 'hex'), Buffer.from(hash, 'hex'))
}

async function seedDefaultSections(db: Client) {
  const upsert = async (params: any[]) => {
    await db.execute({
      sql: `
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
          media_type = excluded.media_type,
          media_source = excluded.media_source,
          media_url = excluded.media_url,
          media_poster = excluded.media_poster,
          cta_primary_label = excluded.cta_primary_label,
          cta_primary_link = excluded.cta_primary_link,
          cta_secondary_label = excluded.cta_secondary_label,
          cta_secondary_link = excluded.cta_secondary_link,
          og_title = excluded.og_title,
          og_description = excluded.og_description,
          og_image = excluded.og_image,
          metadata = excluded.metadata,
          updated_at = excluded.updated_at
      `,
      args: params,
    })
  }

  const now = new Date().toISOString()

  // 1. Hero
  await upsert([
    'hero',
    'Ideas in Motion.',
    'Creative Media Production & Studio Solutions',
    'From Script to Master Deliverable',
    'Spaces with Purpose.',
    'We produce compelling visual stories and build high-performance studio environments across Africa and global markets.',
    '<p>PrimeLense Media combines cinematic storytelling, television broadcasting expertise, and architectural studio acoustics to help brands and institutions communicate with international caliber.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    null,
    'Start a Project',
    '#start-a-project',
    'Explore Capabilities',
    '#disciplines',
    'PrimeLense Media - Ideas in Motion. Spaces with Purpose.',
    'Commercial media production, TV studios, and acoustic solutions.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 2. About
  await upsert([
    'about',
    'Architects of Visual Storytelling & Acoustic Precision',
    'Who We Are',
    'PrimeLense Media Limited',
    'Built for Precision.',
    'PrimeLense Media is a full-service creative media production company and turnkey studio design consultancy. Headquartered in Abuja, Nigeria, we serve corporations, broadcast networks, public institutions, and visionary creators across the continent.',
    '<p>From award-winning corporate documentaries to state-of-the-art podcast facilities, we turn ambitious briefs into broadcast realities with unyielding technical discipline.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    null,
    'Explore Our Work',
    '#work',
    'Schedule Consultation',
    '#start-a-project',
    'About PrimeLense Media',
    'Creative production company and turnkey studio design consultancy.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 3. Mission
  await upsert([
    'mission',
    'Our Mission: Global Standards, Authentic Narratives',
    'Our Purpose',
    'Empowering Voices Through Cinematic Excellence',
    'Global Standards',
    'To engineer world-class visual content and acoustically isolated production environments that elevate African and international stories to global prominence.',
    '<p>We exist to bridge the gap between creative vision and broadcast technical excellence, ensuring every client project commands attention and enduring credibility.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    null,
    'Work With Us',
    '#start-a-project',
    null,
    null,
    'Our Mission - PrimeLense Media',
    'Elevating African and international stories to global prominence.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 4. Vision
  await upsert([
    'vision',
    'Our Vision: The Benchmark for Creative Media & Studio Architecture',
    'Looking Ahead',
    'Leading Africa’s Media Infrastructure Revolution',
    'Creative Benchmark',
    'To become Africa’s foremost creative media power and studio fabrication authority, celebrated for innovation, acoustic integrity, and unforgettable cinematic craft.',
    '<p>We envision a decentralized network of high-fidelity studios and storytelling hubs that empower institutions, brands, and creators across emerging markets.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    null,
    'Join Our Network',
    '#start-a-project',
    null,
    null,
    'Our Vision - PrimeLense Media',
    'Leading Africa’s media infrastructure and creative production benchmark.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 5. Who We Serve
  await upsert([
    'who-we-serve',
    'Who We Serve: Multinationals, Governments & Creators',
    'Clients & Partners',
    'Tailored Solutions Across Industries',
    'Enterprise Caliber',
    'We partner with tier-1 corporations, non-governmental bodies, broadcast television channels, public ministries, and high-impact media personalities.',
    '<p>Our clients demand broadcast confidentiality, technical compliance, and cinematic impact. We deliver turnkey creative pipelines adapted to each client’s operational scale.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    null,
    'Book Corporate Briefing',
    '#start-a-project',
    null,
    null,
    'Who We Serve - PrimeLense Media',
    'Solutions for corporations, governments, broadcasters and creators.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 6. Services
  await upsert([
    'services',
    'End-to-End Capabilities Across Production & Studio Engineering',
    'Core Offerings',
    '7 Core Disciplines Under One Roof',
    'Turnkey Excellence',
    'From concept scripting and camera ops to multi-cam switching and custom studio builds, our integrated service portfolio covers the entire media value chain.',
    '<p>Discover our dedicated services: Media Production, Television & Broadcast, Podcast Studios, Content Creation, Commercial Advertising, Studio Design, and Media Consultation.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    null,
    'Explore All 7 Services',
    '#disciplines',
    null,
    null,
    'Services & Capabilities - PrimeLense Media',
    'Full-service creative production and turnkey acoustic design.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 7. Studio Design
  await upsert([
    'studio-design',
    'Acoustic Design, Architectural Fabrication & Equipment Integration',
    'Turnkey Spaces',
    'Calibrated for Broadcast Sound & Video',
    'Acoustic Integrity',
    'We architect, build, and equip bespoke podcast studios, television newsrooms, sound stages, and post-production suites with precision acoustic engineering.',
    '<p>Every room is designed to STC/NC isolation benchmarks with custom wooden diffusion panels, floating floors, whisper-quiet HVAC attenuation, and calibrated broadcast LED grids.</p>',
    'image',
    'cloudinary',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    null,
    'Request Studio Blueprint',
    '#start-a-project',
    'View Acoustic Specs',
    '#disciplines',
    'Studio Design & Turnkey Acoustics - PrimeLense Media',
    'Custom podcast and television studios designed and built to acoustic perfection.',
    '/opengraph-image.png',
    null,
    now,
  ])

  // 8. Work Showcase
  const defaultProjects = JSON.stringify([
    {
      id: 'proj-1',
      title: 'Echoes of the Sahel: A Regional Climate Documentary',
      category: 'Documentary',
      client: 'Continental Sustainability Foundation',
      year: '2025',
      description: 'Feature-length documentary exploring indigenous adaptation techniques across 6 West African borders.',
      thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      mediaSource: 'cloudinary',
      mediaUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      deliverables: ['4K Master', 'Color Grade', 'Stereo Mix'],
    },
    {
      id: 'proj-2',
      title: 'Apex Sovereign: Annual Summit Live Multicam Broadcast',
      category: 'Live Broadcast',
      client: 'Apex Banking Consortium',
      year: '2026',
      description: 'Zero-latency multi-camera hybrid live stream connecting 12 global financial hubs simultaneously.',
      thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      mediaSource: 'cloudinary',
      mediaUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      deliverables: ['Live Feed', 'Highlights Cut', 'Social Clips'],
    },
    {
      id: 'proj-3',
      title: 'Soundstage 4: Turnkey 4-Host Podcast Facility',
      category: 'Studio Fabrication',
      client: 'Vanguard Media Group',
      year: '2025',
      description: 'Architectural acoustic isolation, wooden diffusion array, Shure broadcast mic chains, and robotic PTZ switching.',
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      mediaSource: 'cloudinary',
      mediaUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      deliverables: ['Acoustic Build', 'PTZ Rigging', 'Dante Audio'],
    },
  ])

  await upsert([
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
    defaultProjects,
    now,
  ])

  // 9. Showreel
  await upsert([
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
    now,
  ])

  // 10. Why Choose Us
  await upsert([
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
    now,
  ])
}
