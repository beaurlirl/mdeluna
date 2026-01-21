// Project data - Add your project images to /public/projects/{project-slug}/
// Each project should have: cover.jpg and optionally gallery images (1.jpg, 2.jpg, etc.)

export const projects = [
  // RESIDENTIAL
  {
    id: 'west-186th-street',
    title: 'West 186th Street',
    category: 'residential',
    location: 'Upper Manhattan',
    year: '2013',
    description: 'Complete residential renovation in Upper Manhattan featuring modern finishes while preserving historic architectural details.',
    coverImage: '/projects/west-186th-street/cover.jpg',
    gallery: [
      '/projects/west-186th-street/1.jpg',
      '/projects/west-186th-street/2.jpg',
      '/projects/west-186th-street/3.jpg',
    ],
    featured: true,
  },
  {
    id: 'east-81st-street',
    title: 'East 81st Street',
    category: 'residential',
    location: 'Manhattan',
    year: '2018',
    description: 'Luxury residential project on the Upper East Side with custom interior architecture and high-end finishes.',
    coverImage: '/projects/east-81st-street/cover.jpg',
    gallery: [
      '/projects/east-81st-street/1.jpg',
      '/projects/east-81st-street/2.jpg',
    ],
    featured: true,
  },
  
  // COMMERCIAL
  {
    id: 'petrossian-boutique',
    title: 'Petrossian Boutique',
    category: 'commercial',
    location: 'Manhattan, NY',
    year: '2019',
    description: 'Luxury retail boutique design featuring elegant materials and sophisticated spatial planning.',
    coverImage: '/projects/petrossian-boutique/cover.jpg',
    gallery: [
      '/projects/petrossian-boutique/1.jpg',
      '/projects/petrossian-boutique/2.jpg',
      '/projects/petrossian-boutique/3.jpg',
    ],
    featured: true,
  },
  {
    id: 'bk-heights-jewish-academy',
    title: 'BK Heights Jewish Academy',
    category: 'commercial',
    location: 'Brooklyn',
    year: '2014',
    description: 'Educational facility design with focus on functional spaces and community gathering areas.',
    coverImage: '/projects/bk-heights-jewish-academy/cover.jpg',
    gallery: [
      '/projects/bk-heights-jewish-academy/1.jpg',
      '/projects/bk-heights-jewish-academy/2.jpg',
    ],
    featured: false,
  },
  
  // HOSPITALITY
  {
    id: 'shelter-pizza',
    title: 'Shelter Pizza',
    category: 'hospitality',
    location: 'Brooklyn, NY',
    year: '2020',
    description: 'Contemporary pizzeria design with industrial aesthetic and welcoming atmosphere.',
    coverImage: '/projects/shelter-pizza/cover.jpg',
    gallery: [
      '/projects/shelter-pizza/1.jpg',
      '/projects/shelter-pizza/2.jpg',
      '/projects/shelter-pizza/3.jpg',
    ],
    featured: true,
  },
  {
    id: 'grey-bar-restaurant',
    title: 'Grey Bar & Restaurant',
    category: 'hospitality',
    location: 'Manhattan, NY',
    year: '2021',
    description: 'Upscale bar and restaurant design featuring sophisticated interiors and ambient lighting.',
    coverImage: '/projects/grey-bar-restaurant/cover.jpg',
    gallery: [
      '/projects/grey-bar-restaurant/1.jpg',
      '/projects/grey-bar-restaurant/2.jpg',
    ],
    featured: true,
  },
  {
    id: 'ali-babas-terrace',
    title: "Ali Baba's Terrace",
    category: 'hospitality',
    location: 'Midtown East',
    year: '2017',
    description: 'Mediterranean restaurant with outdoor terrace design, blending indoor-outdoor dining experience.',
    coverImage: '/projects/ali-babas-terrace/cover.jpg',
    gallery: [
      '/projects/ali-babas-terrace/1.jpg',
      '/projects/ali-babas-terrace/2.jpg',
    ],
    featured: false,
  },
]

export const categories = [
  { id: 'residential', name: 'Residential', description: 'Private residences and apartment renovations' },
  { id: 'commercial', name: 'Commercial', description: 'Retail, office, and institutional spaces' },
  { id: 'hospitality', name: 'Hospitality', description: 'Restaurants, bars, and entertainment venues' },
]

export const getProjectsByCategory = (category) => {
  return projects.filter(p => p.category === category)
}

export const getFeaturedProjects = () => {
  return projects.filter(p => p.featured)
}

export const getProjectById = (id) => {
  return projects.find(p => p.id === id)
}

