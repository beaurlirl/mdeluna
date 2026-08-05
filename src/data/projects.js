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
      '/projects/west-186th-street/cover.jpg',
      '/projects/west-186th-street/1.jpg',
      '/projects/west-186th-street/2.jpg',
      '/projects/west-186th-street/3.jpg',
      '/projects/west-186th-street/4.jpg',
      '/projects/west-186th-street/5.jpg',
      '/projects/west-186th-street/6.jpg',
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
      '/projects/east-81st-street/cover.jpg',
      '/projects/east-81st-street/1.jpg',
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
    coverImage: '/petrossian1.jpg',
    gallery: [
      '/petrossian1.jpg',
      '/petrossian2.jpg',
    ],
    featured: true,
  },
  {
    id: 'bk-heights-jewish-academy',
    title: 'Brooklyn Heights Jewish Academy',
    category: 'commercial',
    location: 'Brooklyn Heights, Brooklyn',
    year: '2014',
    description: 'Educational facility design with focus on functional spaces and community gathering areas.',
    coverImage: '/projects/bk-heights-jewish-academy/cover.jpg',
    gallery: [
      '/projects/bk-heights-jewish-academy/cover.jpg',
      '/projects/bk-heights-jewish-academy/1.jpg',
      '/projects/bk-heights-jewish-academy/2.jpg',
      '/projects/bk-heights-jewish-academy/3.jpg',
      '/projects/bk-heights-jewish-academy/4.jpg',
      '/projects/bk-heights-jewish-academy/5.jpg',
      '/projects/bk-heights-jewish-academy/6.jpg',
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
    coverImage: '/pizza1.jpg',
    gallery: [
      '/pizza1.jpg',
      '/pizza2.jpeg',
      '/pizza3.jpeg',
      '/pizza4.jpg',
      '/pizza5.jpg',
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
    coverImage: '/projects/grey-bar-restaurant/cover.jpeg',
    gallery: [
      '/projects/grey-bar-restaurant/cover.jpeg',
      '/projects/grey-bar-restaurant/1.jpeg',
      '/projects/grey-bar-restaurant/2.jpeg',
      '/projects/grey-bar-restaurant/3.jpeg',
      '/projects/grey-bar-restaurant/4.jpeg',
      '/projects/grey-bar-restaurant/5.jpeg',
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
  {
    id: 'gulluoglu',
    title: 'Güllüoğlu',
    category: 'hospitality',
    location: 'New York, NY',
    year: '',
    description: 'Turkish bakery and café build-out with a full pastry and baklava display, custom millwork, and an open kitchen.',
    coverImage: '/projects/gulluoglu/cover.jpg',
    gallery: [
      '/projects/gulluoglu/cover.jpg',
      '/projects/gulluoglu/1.jpg',
      '/projects/gulluoglu/2.jpg',
      '/projects/gulluoglu/3.jpg',
      '/projects/gulluoglu/4.jpg',
    ],
    featured: false,
  },
  {
    id: 'chickie-pigs',
    title: "Chickie Pig's",
    category: 'hospitality',
    location: 'New York, NY',
    year: '',
    description: 'Brick oven pizza restaurant build-out with exposed brick, a mural-lined dining room, and a storefront designed to stand out on the block.',
    coverImage: '/projects/chickie-pigs/cover.jpg',
    gallery: [
      '/projects/chickie-pigs/cover.jpg',
      '/projects/chickie-pigs/1.jpg',
      '/projects/chickie-pigs/2.jpg',
      '/projects/chickie-pigs/3.jpg',
      '/projects/chickie-pigs/4.jpg',
      '/projects/chickie-pigs/5.jpg',
    ],
    featured: false,
  },
  {
    id: 'petite-abeille',
    title: 'Petite Abeille',
    category: 'hospitality',
    location: 'Manhattan, NY',
    year: '',
    description: 'Belgian bistro build-out featuring a full dining room, bar, and finishes true to the concept.',
    coverImage: '/projects/petite-abeille/cover.jpg',
    gallery: [
      '/projects/petite-abeille/cover.jpg',
      '/projects/petite-abeille/1.jpg',
      '/projects/petite-abeille/2.jpg',
      '/projects/petite-abeille/3.jpg',
      '/projects/petite-abeille/4.jpg',
      '/projects/petite-abeille/5.jpg',
      '/projects/petite-abeille/6.jpg',
    ],
    featured: false,
  },
  {
    id: 't-poutine',
    title: 'T Poutine',
    category: 'hospitality',
    location: 'New York, NY',
    year: '',
    description: 'Bar and lounge build-out with exposed brick, walnut paneling, and custom banquette seating.',
    coverImage: '/projects/t-poutine/cover.jpg',
    gallery: [
      '/projects/t-poutine/cover.jpg',
      '/projects/t-poutine/1.jpg',
      '/projects/t-poutine/2.jpg',
      '/projects/t-poutine/3.jpg',
    ],
    featured: false,
  },
  {
    id: 'edamama',
    title: 'Edamama',
    category: 'commercial',
    location: 'New York, NY',
    year: '',
    description: "Children's hair salon and bookshop build-out with custom millwork and a playful, illustrated interior.",
    coverImage: '/projects/edamama/cover.jpeg',
    gallery: [
      '/projects/edamama/cover.jpeg',
      '/projects/edamama/1.jpeg',
      '/projects/edamama/2.jpeg',
    ],
    featured: false,
  },
  {
    id: 'kiddy-korner',
    title: 'Kiddy Korner',
    category: 'institutional',
    location: 'New York, NY',
    year: '',
    description: 'Childcare facility build-out, designed for daily classroom use.',
    coverImage: '/projects/kiddy-korner/cover.jpeg',
    gallery: [
      '/projects/kiddy-korner/cover.jpeg',
    ],
    featured: false,
  },
]

export const categories = [
  { id: 'residential',   name: 'Residential',   description: 'Private residences and apartment renovations' },
  { id: 'commercial',    name: 'Commercial',     description: 'Retail, office, and institutional spaces' },
  { id: 'hospitality',   name: 'Hospitality',    description: 'Restaurants, bars, and entertainment venues' },
  { id: 'institutional', name: 'Institutional',  description: 'Educational, civic, and cultural institutions' },
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

