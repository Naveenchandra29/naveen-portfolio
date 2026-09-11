import { useEffect, useState, type ReactNode } from 'react'
import { ArrowDownToLine, ArrowUpRight, Download, Mail, MapPin, Menu, Moon, Send, Sun, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { experience } from './data/experience'
import { galleryItems, type GalleryItem } from './data/gallery'
import { projects } from './data/projects'
import './App.css'

const navItems = [['ABOUT', '#about'], ['EDUCATION', '#education'], ['SKILLS', '#skills'], ['EXPERIENCE', '#experience'], ['PROJECTS', '#projects'], ['CONTACT', '#contact']] as const
const skillGroups = [
  ['LANGUAGES', ['Python', 'Java', 'SQL', 'Kotlin', 'Golang']],
  ['AI / ML', ['TensorFlow', 'Keras', 'OpenCV', 'CNN', 'Image Processing']],
  ['EMBEDDED', ['Embedded C', 'Arduino', 'Raspberry Pi', 'Sensor Interfacing','PWM', 'IoT']],
  ['ANDROID', ['Android Studio', 'Jetpack Compose', 'Firebase', 'REST APIs']],
  ['SECURITY', ['TLS 1.3', 'ML-KEM', 'X25519', 'mTLS']],
  ['TOOLS & PLATFORMS', ['Git', 'Docker', 'VS Code', 'Jupyter', 'Arduino IDE', 'Jira']],
] as const

function Reveal({ children, className = '', id, delay = 0 }: { children: ReactNode; className?: string; id?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} id={id} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .5, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'light'
  })
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme) }, [theme])
  return <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#about')
  const isGallery = window.location.pathname.replace(/\/$/, '') === '/gallery'
  const links = navItems
  const homeHref = (href: string) => isGallery && href.startsWith('#') ? `/${href}` : href
  useEffect(() => {
    if (isGallery) return
    const sections = navItems.map(([, href]) => document.querySelector(href)).filter((section): section is Element => section !== null)
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`) }) }, { rootMargin: '-35% 0px -55% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isGallery])
  return <header className="site-header"><div className="nav-wrap"><a className="brand" href={homeHref('#top')}>M NAVEEN CHANDRA</a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a className={active === href ? 'active' : ''} aria-current={active === href ? 'page' : undefined} href={homeHref(href)} key={label}>{label}</a>)}</nav><div className="header-actions"><ThemeToggle /><button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div><AnimatePresence>{open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{links.map(([label, href]) => <a className={active === href ? 'active' : ''} aria-current={active === href ? 'page' : undefined} href={homeHref(href)} key={label} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={14} /></a>)}</motion.nav>}</AnimatePresence></header>
}

function EngineeringMotif() {
  const reduced = useReducedMotion()
  return <div className="engineering-motif" aria-hidden="true"><svg viewBox="0 0 900 520" preserveAspectRatio="none"><path d="M-40 410C120 330 156 400 278 300S465 146 596 224s164 12 344-122" /><path d="M40 80C190 140 220 42 360 116s170 200 286 132 170-22 294 64" /><g><circle cx="278" cy="300" r="4" /><circle cx="596" cy="224" r="4" /><circle cx="360" cy="116" r="4" /><circle cx="646" cy="248" r="4" /></g>{!reduced && <motion.circle className="motif-signal" r="4" initial={{ cx: 40, cy: 388 }} animate={{ cx: [40, 278, 596, 860], cy: [388, 300, 224, 106] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />}</svg></div>
}

function Hero() {
  const [imageAvailable, setImageAvailable] = useState(true)
  return <section className="hero page-section" id="top"><div className="hero-copy"><Reveal><p className="eyebrow">Hello I'm</p></Reveal><Reveal delay={.08}><h1>M NAVEEN<br />CHANDRA</h1></Reveal><Reveal delay={.16}><p className="hero-role">Electronics &amp; Communication Engineer</p></Reveal><Reveal delay={.24}><p className="hero-description">I build practical engineering solutions across software, embedded systems, AI/ML and secure communication</p></Reveal><Reveal className="hero-actions" delay={.32}><a className="button button-primary" href="#projects">VIEW PROJECTS <ArrowUpRight size={16} /></a><a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">DOWNLOAD RESUME <ArrowDownToLine size={16} /></a></Reveal><Reveal className="hero-socials" delay={.4}><a href="#contact">GitHub</a><a href="#contact">LinkedIn</a><span>Bengaluru, India</span></Reveal></div><Reveal className="hero-visual" delay={.18}>{imageAvailable ? <img className="profile-image" src="/profile/naveen-profile.jpg" alt="Portrait of M Naveen Chandra" onError={() => setImageAvailable(false)} /> : <div className="system-mark" aria-hidden="true"><span /><span /><span /><i /><i /><i /></div>}</Reveal></section>
}

function SectionHeading({ label, title }: { label: string; title: string }) { return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2></div> }

function About() {
  return <section className="page-section about" id="about"><Reveal><SectionHeading label="01 / ABOUT" title="Building across hardware, software and intelligent systems" /></Reveal><Reveal className="about-grid" delay={.08}><div><p className="education-title">B.E. Electronics and Communication Engineering</p><p className="muted">AMC Engineering College<br />CGPA: 7.97 / 10</p></div><p className="about-copy">I’m an Electronics & Communication Engineer with hands-on experience in software development, embedded systems, AI/ML and secure communication. I enjoy building practical solutions that connect hardware and software, from intelligent edge applications to secure and connected systems.</p></Reveal></section>
}

function Education() {
  const entries = [['2022 — 2026', 'AMC ENGINEERING COLLEGE', 'Bachelor of Engineering in Electronics & Communication Engineering', 'CGPA: 7.97 / 10'], ['2020 — 2022', 'NARAYANA PU COLLEGE','PCMB', '']] as const
  return <section className="page-section education" id="education"><Reveal><SectionHeading label="02 / EDUCATION" title="Education" /></Reveal><Reveal className="education-timeline" delay={.08}>{entries.map(([period, title, institution, detail]) => <article key={title}><div className="education-period">{period}</div><div className="education-marker" aria-hidden="true" /><div><h3>{title}</h3>{institution && <p>{institution}</p>}{detail && <strong>{detail}</strong>}</div></article>)}</Reveal></section>
}

function Skills() {
  return <section className="page-section skills-section" id="skills"><Reveal><SectionHeading label="03 / SKILLS" title="Technical Skills" /></Reveal><Reveal className="skills" delay={.08}><div className="skill-grid">{skillGroups.map(([group, items]) => <div className="skill-group" key={group}><p>{group}</p><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></Reveal></section>
}

function Experience() {
  return <section className="page-section experience" id="experience"><Reveal><SectionHeading label="04 / EXPERIENCE" title="Experience" /></Reveal><div className="experience-list">{experience.map((item, index) => <Reveal className="experience-item" delay={index * .08} key={item.organization}><div className="experience-period">{item.period}</div><div><h3>{item.organization}</h3><h4>{item.role}</h4><p className="experience-description">{item.work}</p>{item.evidence && (
  <a
    className="experience-evidence"
    href={item.evidence}
    target="_blank"
    rel="noreferrer"
  >
    {item.evidenceLabel ?? 'VIEW CERTIFICATE ↗'}
  </a>
)}</div></Reveal>)}</div></section>
}

const projectImages = [
  ['/projects/quantum-safe-gateway.png', 'Quantum-Safe Gateway project visual'],
  ['/projects/oral-cancer-detection.png', 'Oral cancer detection project visual'],
  ['/projects/matrix-headlight.png', 'Matrix headlight project visual'],
  ['/projects/android-applications.png', 'Android applications project visual'],
] as const

function ProjectVisual({ number, image, alt }: { number: string; image: string; alt: string }) { return <div className="project-visual"><img src={image} alt={alt} /><span>{number}</span><b>PROJECT / SYSTEM</b></div> }

function projectResult(impact: string) {
  return impact.replace(' · Research paper · Patent', '').replace(' · Patent', '')
}

function ReportLink({ path }: { path?: string }) {
  const [available, setAvailable] = useState(false)
  useEffect(() => {
    if (!path) return
    let mounted = true
    fetch(path, { method: 'HEAD' }).then((response) => { if (mounted && response.ok && response.headers.get('content-type')?.includes('application/pdf')) setAvailable(true) }).catch(() => undefined)
    return () => { mounted = false }
  }, [path])
  return available ? <a className="project-report" href={path} target="_blank" rel="noreferrer">VIEW REPORT ↗</a> : null
}

function Projects() {
  return <section className="page-section projects" id="projects"><Reveal><SectionHeading label="05 / PROJECTS" title="Projects" /></Reveal><div className="project-grid">{projects.map((project, index) => <Reveal className="project-card" delay={index * .06} key={project.number}><ProjectVisual number={project.number} image={projectImages[index][0]} alt={projectImages[index][1]} /><div className="project-card-body"><div className="project-card-title"><h3>{project.title.replace(' USING RASPBERRY PI AND CNN', '').replace(' FOR ENHANCING NIGHT VISION', '')}</h3><ArrowUpRight size={19} /></div><p>{project.summary}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><strong>{projectResult(project.impact)}</strong><ReportLink path={project.report} /></div></Reveal>)}</div><Recognition /></section>
}

type AchievementEvidence = { image: string; title: string; description: string; alt: string; link?: string; action?: string }

const achievementEvidence: AchievementEvidence[] = [
  { image: '/achievements/awards/i2connect-award.jpg', title: 'Best Project Innovation Award', description: 'Secured First Place at IEEE I2CONNECT-2025 for the Matrix Headlight project.', alt: 'Secured First Place at IEEE I2CONNECT-2025 for the Matrix Headlight project' },
  { image: '/achievements/awards/ieeemembership.png', title: 'IEEE Membership', description: 'Member of the IEEE Signal Processing Society, with active participation in technical activities and workshops.', alt: 'IEEE membership evidence' },
  { image: '/achievements/awards/NIE Mysore.png', title: 'Best Project Presentation', description: 'Recognition associated with participation in a technical event at the National Institute of Engineering, Mysore.', alt: 'NIE Mysore recognition evidence' },
  { image: '/achievements/workshops/quantumworkshopamc.png', title: 'Quantum Computing Basics Workshop— AMC', description: 'Served as a speaker at AMC Engineering College, delivering a hands-on session introducing quantum computing fundamentals, concepts, and emerging technological applications.', alt: 'Quantum Computing Basics workshop at AMC evidence' },
  { image: '/achievements/workshops/quantumworkshopdsu.png', title: 'Quantum Computing Basics Workshop— DSU', description: 'Delivered a hands-on quantum computing workshop at Dayananda Sagar College of Engineering, explaining core concepts and connecting emerging quantum technologies with practical applications.', alt: 'Quantum Computing Basics workshop at DSU evidence' },
  { image: '/achievements/publications/grant.png', title: 'Project Grant Received', description: 'Received ₹6,000 KSCST funding for the Oral Cancer Detection project under the Student Project Programme.', alt: 'Government project grant evidence' },
  { image: '/achievements/publications/researchpaper.png', title: 'Oral Cancer Detection Using Raspberry Pi and CNN for Early Diagnosis', description: 'Published the CNN-driven Raspberry Pi framework for multi-class oral lesion diagnosis in IJCRT.', alt: 'Oral Cancer Detection research paper preview', link: '/achievements/publications/researchpaper.pdf', action: 'VIEW PAPER ↗' },
  { image: '/achievements/patents/oral-cancer-patent.png', title: 'PATENT - Oral Cancer Detection', description: 'Patent application covering a Raspberry Pi and CNN-based system for early oral cancer detection.', alt: 'Oral Cancer Detection patent evidence preview', action: 'VIEW PATENT ↗' },
  { image: '/achievements/patents/matrix-headlight-patent.png', title: 'PATENT - Matrix Headlight', description: 'Patent application for a smart weather-adaptive matrix LED headlight system for modern vehicles.', alt: 'Matrix Headlight patent evidence preview', action: 'VIEW PATENT ↗' },
]

function Recognition() {
  return <div className="recognition"><Reveal><div className="recognition-heading"><h3>Professional Highlights</h3></div></Reveal><EvidencePreview /></div>
}

function EvidencePreview() {
  const evidenceItems = achievementEvidence.map((item) => ({ ...item, link: item.link ?? item.image, action: item.action ?? '' }))
  return <div className="evidence-preview"><div className="evidence-gallery">{evidenceItems.map((item) => <a className="evidence-card" href={item.link} target="_blank" rel="noreferrer" key={item.image}><img src={item.image} alt={item.alt} /><strong>{item.title}</strong>{item.description && <span>{item.description}</span>}{item.action && <em>{item.action}</em>}</a>)}</div></div>
}

function Contact() {
  return <section className="page-section contact" id="contact"><Reveal><SectionHeading label="06 / CONTACT" title="Let&apos;s connect" /></Reveal><div className="contact-grid"><Reveal className="contact-content" delay={.08}><p>I’m open to software and embedded engineering opportunities, collaborative projects, and building practical solutions that create real-world impact.</p><div className="contact-actions"><a className="button button-primary" href="mailto:naveenchandram2004@gmail.com"><Mail size={16} /> EMAIL ME <ArrowUpRight size={16} /></a><a href="https://github.com/Naveenchandra29" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> GitHub</a><a
  href="https://www.linkedin.com/in/m-naveen-chandra"
  target="_blank"
  rel="noreferrer"
>
  <ArrowUpRight size={16} /> LinkedIn
</a><a href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={16} /> Resume</a></div></Reveal><Reveal className="contact-details" delay={.14}><div><span><Mail size={13} /> EMAIL</span><a href="mailto:naveenchandram2004@gmail.com">naveenchandram2004@gmail.com</a></div><div><span><MapPin size={13} /> LOCATION</span><p>Bengaluru, India</p></div><div><span><ArrowUpRight size={13} /> LINKEDIN</span><p><a
  href="https://www.linkedin.com/in/m-naveen-chandra"
  target="_blank"
  rel="noreferrer"
>
  M Naveen Chandra
</a></p></div><div><span><ArrowUpRight size={13} /> GITHUB</span><a href="https://github.com/Naveenchandra29" target="_blank" rel="noreferrer">Naveenchandra29</a></div></Reveal><Reveal className="contact-form" delay={.2}><form
  onSubmit={(event) => {
    event.preventDefault()

    const form = event.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    const subject = `Portfolio Contact from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

    window.location.href = `mailto:naveenchandram2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }}
>
  <label>
    Your Name*
    <input
      name="name"
      type="text"
      autoComplete="name"
      placeholder=""
      required
    />
  </label>

  <label>
    Email*
    <input
      name="email"
      type="email"
      autoComplete="email"
      placeholder=""
      required
    />
  </label>

  <label>
    Share Your Message
    <textarea
      name="message"
      rows={4}
      placeholder=""
      required
    />
  </label>

  <button className="button button-primary" type="submit">
    SEND MESSAGE <Send size={15} />
  </button>

  <small>Let’s build something meaningful</small>
</form></Reveal></div></section>
}

function Footer() { return <footer><div className="footer-identity"><strong>M NAVEEN CHANDRA</strong><span>Electronics &amp; Communication Engineer</span><span>Bengaluru, India</span></div><span>© 2026 M Naveen Chandra</span></footer> }

const galleryCategories = ['ALL', 'PROJECT ARTIFACTS', 'AWARDS', 'RESEARCH', 'WORKSHOPS', 'CERTIFICATIONS', 'ENGINEERING'] as const
function GalleryPlaceholder({ item }: { item: GalleryItem }) { return <div className="gallery-placeholder"><span>{item.placeholder}</span><div className="placeholder-mark" aria-hidden="true" /><strong>{item.title}</strong><em>{item.year}</em></div> }
function GalleryPage() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>('ALL')
  const visibleItems = galleryItems.filter((item) => filter === 'ALL' || item.category === filter)
  return <div className="gallery-page"><Header /><main className="gallery-main"><Reveal><p className="eyebrow">GALLERY</p><h1>PROJECTS, AWARDS<br />&amp; RESEARCH</h1><p className="gallery-intro">A growing collection of project artifacts, certificates and engineering records.</p></Reveal><div className="gallery-filter" aria-label="Gallery filters">{galleryCategories.map((category) => <button type="button" key={category} className={category === filter ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="gallery-grid">{visibleItems.map((item, index) => <Reveal delay={index * .04} key={item.id}><article className="gallery-item"><GalleryPlaceholder item={item} /><p>{item.description}</p></article></Reveal>)}</div></main><Footer /></div>
}

function App() {
  const isGallery = window.location.pathname.replace(/\/$/, '') === '/gallery'
  return <div className="portfolio-shell"><EngineeringMotif />{isGallery ? <GalleryPage /> : <><Header /><main><Hero /><About /><Education /><Skills /><Experience /><Projects /><Contact /></main><Footer /></>}</div>
}

export default App
