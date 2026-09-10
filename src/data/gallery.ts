export type GalleryItem = {
  id: string
  year: string
  category: 'PROJECT ARTIFACTS' | 'AWARDS' | 'RESEARCH' | 'WORKSHOPS' | 'CERTIFICATIONS' | 'EVENTS' | 'ENGINEERING'
  title: string
  description: string
  image?: string
  placeholder: string
  alt: string
}

export const galleryItems: GalleryItem[] = [
  { id: 'edge-vision', year: '—', category: 'PROJECT ARTIFACTS', title: 'EDGE VISION', description: 'Oral lesion detection system using Raspberry Pi and CNN.', placeholder: 'PROJECT ARTIFACT', alt: 'Edge Vision project artifact placeholder' },
  { id: 'quantum-safe-gateway', year: '2026', category: 'ENGINEERING', title: 'QUANTUM-SAFE GATEWAY', description: 'Hybrid TLS 1.3 and post-quantum cryptography prototype.', placeholder: 'ENGINEERING RECORD', alt: 'Quantum-Safe Gateway engineering artifact placeholder' },
  { id: 'matrix-headlight', year: '—', category: 'PROJECT ARTIFACTS', title: 'MATRIX HEADLIGHT', description: 'Adaptive LED headlight system with LDR sensing and PWM.', placeholder: 'PROJECT ARTIFACT', alt: 'Matrix headlight project artifact placeholder' },
  { id: 'oral-cancer-research', year: '—', category: 'RESEARCH', title: 'ORAL CANCER DETECTION', description: 'AI-based healthcare framework and research publication.', placeholder: 'RESEARCH RECORD', alt: 'Oral cancer detection research artifact placeholder' },
  { id: 'quantum-workshop', year: '—', category: 'WORKSHOPS', title: 'QUANTUM COMPUTING BASICS', description: 'Technical workshop delivered across two engineering colleges.', placeholder: 'WORKSHOP RECORD', alt: 'Quantum computing workshop artifact placeholder' },
  { id: 'certifications', year: '—', category: 'CERTIFICATIONS', title: 'SQL & DSA', description: 'HackerRank SQL Basic and Infosys Springboard DSA.', placeholder: 'CERTIFICATION RECORD', alt: 'Certification archive placeholder' },
  { id: 'ieee-award', year: '—', category: 'AWARDS', title: 'BEST PROJECT INNOVATION AWARD', description: 'I2CONNECT — IEEE Mangalore Section.', placeholder: 'AWARD RECORD', alt: 'IEEE award archive placeholder' },
]
