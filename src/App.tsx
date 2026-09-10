import { useEffect, useState, type ReactNode } from 'react'
import { ArrowDownToLine, ArrowUpRight, Download, Mail, MapPin, Menu, Moon, Send, Sun, X } from 'lucide-react'
import { achievements } from './data/archive'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { experience } from './data/experience'
import { galleryItems, type GalleryItem } from './data/gallery'
import { projects } from './data/projects'
import './App.css'

const navItems = [['ABOUT', '#about'], ['EDUCATION', '#education'], ['SKILLS', '#skills'], ['EXPERIENCE', '#experience'], ['PROJECTS', '#projects'], ['CONTACT', '#contact']] as const
const skillGroups = [
  ['LANGUAGES', ['Python', 'Java', 'SQL', 'Kotlin', 'Golang']],
  ['AI / ML', ['TensorFlow', 'Keras', 'OpenCV', 'CNN', 'Image Processing']],
  ['EMBEDDED', ['Arduino', 'Raspberry Pi', 'Embedded C', 'PWM', 'IoT']],
  ['ANDROID', ['Android Studio', 'Jetpack Compose', 'Firebase', 'REST APIs']],
  ['SECURITY', ['TLS 1.3', 'ML-KEM', 'X25519', 'mTLS']],
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
  return <header className="site-header"><div className="nav-wrap"><a className="brand" href={homeHref('#top')}>NAVEEN<span>.</span></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a className={active === href ? 'active' : ''} aria-current={active === href ? 'page' : undefined} href={homeHref(href)} key={label}>{label}</a>)}</nav><div className="header-actions"><ThemeToggle /><button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div><AnimatePresence>{open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{links.map(([label, href]) => <a className={active === href ? 'active' : ''} aria-current={active === href ? 'page' : undefined} href={homeHref(href)} key={label} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={14} /></a>)}</motion.nav>}</AnimatePresence></header>
}

function EngineeringMotif() {
  const reduced = useReducedMotion()
  return <div className="engineering-motif" aria-hidden="true"><svg viewBox="0 0 900 520" preserveAspectRatio="none"><path d="M-40 410C120 330 156 400 278 300S465 146 596 224s164 12 344-122" /><path d="M40 80C190 140 220 42 360 116s170 200 286 132 170-22 294 64" /><g><circle cx="278" cy="300" r="4" /><circle cx="596" cy="224" r="4" /><circle cx="360" cy="116" r="4" /><circle cx="646" cy="248" r="4" /></g>{!reduced && <motion.circle className="motif-signal" r="4" initial={{ cx: 40, cy: 388 }} animate={{ cx: [40, 278, 596, 860], cy: [388, 300, 224, 106] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />}</svg></div>
}

function Hero() {
  return <section className="hero page-section" id="top"><div className="hero-copy"><Reveal><p className="eyebrow">I AM</p></Reveal><Reveal delay={.08}><h1>M NAVEEN<br />CHANDRA</h1></Reveal><Reveal delay={.16}><p className="hero-role">Electronics &amp; Communication Engineer</p></Reveal><Reveal delay={.24}><p className="hero-description">I build across embedded systems, intelligent software and secure communication.</p></Reveal><Reveal className="hero-actions" delay={.32}><a className="button button-primary" href="#projects">VIEW PROJECTS <ArrowUpRight size={16} /></a><a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">DOWNLOAD RESUME <ArrowDownToLine size={16} /></a></Reveal><Reveal className="hero-socials" delay={.4}><a href="#contact">GitHub</a><a href="#contact">LinkedIn</a><span>Bengaluru, India</span></Reveal></div><Reveal className="hero-visual" delay={.18}><div className="visual-label">HARDWARE / SOFTWARE / SECURITY</div><div className="system-mark" aria-hidden="true"><span /><span /><span /><i /><i /><i /></div></Reveal></section>
}

function SectionHeading({ label, title }: { label: string; title: string }) { return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2></div> }

function About() {
  return <section className="page-section about" id="about"><Reveal><SectionHeading label="01 / ABOUT" title="Engineering across physical and digital systems." /></Reveal><Reveal className="about-grid" delay={.08}><div><p className="education-title">B.E. Electronics and Communication Engineering</p><p className="muted">AMC Engineering College<br />CGPA: 7.97 / 10</p></div><p className="about-copy">I work across embedded systems, AI/ML, Android development and secure communication. My projects move between physical devices and intelligent software, with a focus on building useful systems that can work in the real world.</p></Reveal></section>
}

function Education() {
  return <section className="page-section education" id="education"><Reveal><SectionHeading label="02 / EDUCATION" title="Education." /></Reveal><Reveal className="education-timeline" delay={.08}><article><div className="education-period">2022 — 2026</div><div className="education-marker" aria-hidden="true" /><div><h3>B.E. Electronics &amp; Communication Engineering</h3><p>AMC Engineering College</p><strong>CGPA: 7.97 / 10</strong></div></article></Reveal></section>
}

function Skills() {
  return <section className="page-section skills-section" id="skills"><Reveal><SectionHeading label="03 / SKILLS" title="Technical range." /></Reveal><Reveal className="skills" delay={.08}><div className="skill-grid">{skillGroups.map(([group, items]) => <div className="skill-group" key={group}><p>{group}</p><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div><div className="certificate-inline"><span>CERTIFICATIONS</span><p>HackerRank SQL Basic · Infosys Springboard DSA</p></div></Reveal></section>
}

function Experience() {
  return <section className="page-section experience" id="experience"><Reveal><SectionHeading label="04 / EXPERIENCE" title="Experience." /></Reveal><div className="experience-list">{experience.map((item, index) => <Reveal className="experience-item" delay={index * .08} key={item.organization}><div className="experience-period">{item.period}</div><div><h3>{item.organization}</h3><h4>{item.role}</h4><ul><li>{item.work.split(',')[0]}.</li><li>{item.focus.split(' · ').slice(0, 2).join(' and ')}.</li></ul><div className="tag-list">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></Reveal>)}</div></section>
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

function Projects() {
  return <section className="page-section projects" id="projects"><Reveal><SectionHeading label="05 / PROJECTS" title="Projects." /></Reveal><div className="project-grid">{projects.map((project, index) => <Reveal className="project-card" delay={index * .06} key={project.number}><ProjectVisual number={project.number} image={projectImages[index][0]} alt={projectImages[index][1]} /><div className="project-card-body"><div className="project-card-title"><h3>{project.title.replace(' USING RASPBERRY PI AND CNN', '').replace(' FOR ENHANCING NIGHT VISION', '')}</h3><ArrowUpRight size={19} /></div><p>{project.summary}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><strong>{projectResult(project.impact)}</strong></div></Reveal>)}</div><Recognition /></section>
}

const competitionHighlights: { image: string; event: string; result: string; description: string }[] = []

function Recognition() {
  const award = achievements.find(([label]) => label === 'IEEE')
  const grant = achievements.find(([label]) => label === 'KSCST')
  const publication = achievements.find(([label]) => label === 'RESEARCH')
  const patents = achievements.find(([label]) => label === 'PATENTS')
  const workshop = achievements.find(([label]) => label === 'KNOWLEDGE SHARING')
  const records = [
    ['AWARDS / COMPETITIONS', 'Best Project Innovation Award', `${award?.[2]} · ${grant?.[1]} — ${grant?.[2]}`],
    ['PUBLICATIONS', 'Published research paper', `${publication?.[2]} · Oral Cancer Detection Using Raspberry Pi and CNN for Early Diagnosis`],
    ['PATENTS', 'Oral Cancer Detection · Matrix Headlight', patents?.[2] ?? ''],
    ['WORKSHOPS / KNOWLEDGE SHARING', 'Quantum Computing Basics workshop', workshop?.[2] ?? ''],
  ] as const
  return <div className="recognition"><Reveal><div className="recognition-heading"><p className="eyebrow">PROJECT EVIDENCE</p><h3>Achievements &amp; Recognition.</h3></div></Reveal><div className="recognition-grid">{records.map(([label, title, detail]) => <Reveal className="recognition-item" delay={.04} key={label}><span>{label}</span><h4>{title}</h4><p>{detail}</p></Reveal>)}</div><div className="highlight-area"><p className="eyebrow">FUTURE EVIDENCE</p><h4>Competition &amp; Event Highlights</h4>{competitionHighlights.length === 0 ? <p className="highlight-empty">Future entries can include an image, event or competition name, award or result, and a short description.</p> : <div className="highlight-grid">{competitionHighlights.map((highlight) => <article key={`${highlight.event}-${highlight.result}`}><img src={highlight.image} alt={highlight.event} /><strong>{highlight.event}</strong><span>{highlight.result}</span><p>{highlight.description}</p></article>)}</div>}</div></div>
}

function Contact() {
  return <section className="page-section contact" id="contact"><Reveal><SectionHeading label="06 / CONTACT" title="Let&apos;s connect." /></Reveal><div className="contact-grid"><Reveal className="contact-content" delay={.08}><p>I&apos;m open to opportunities in software engineering, product development and technically challenging projects.</p><div className="contact-actions"><a className="button button-primary" href="mailto:naveenchandram2004@gmail.com"><Mail size={16} /> EMAIL ME <ArrowUpRight size={16} /></a><a href="https://github.com/Naveenchandra29" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> GitHub</a><a href="#contact"><ArrowUpRight size={16} /> LinkedIn</a><a href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={16} /> Resume</a></div></Reveal><Reveal className="contact-details" delay={.14}><div><span><Mail size={13} /> EMAIL</span><a href="mailto:naveenchandram2004@gmail.com">naveenchandram2004@gmail.com</a></div><div><span><MapPin size={13} /> LOCATION</span><p>Bengaluru, India</p></div><div><span><ArrowUpRight size={13} /> LINKEDIN</span><p>M Naveen Chandra</p></div><div><span><ArrowUpRight size={13} /> GITHUB</span><a href="https://github.com/Naveenchandra29" target="_blank" rel="noreferrer">Naveenchandra29</a></div></Reveal><Reveal className="contact-form" delay={.2}><form onSubmit={(event) => event.preventDefault()}><label>Your Name<input name="name" type="text" autoComplete="name" placeholder="Your Name" /></label><label>Your Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Your Message<textarea name="message" rows={4} placeholder="How can we work together?" /></label><button className="button button-primary" type="submit">SEND MESSAGE <Send size={15} /></button><small>Form preview only · no backend connected</small></form></Reveal></div></section>
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
