// Site content - Easy to update contact info and about content

export const siteInfo = {
  name: 'Michael De Luna, AIA',
  title: 'Architect',
  tagline: 'Code / Zoning / Architecture / Filing',
  description: 'Full-service architecture firm in New York City. Expert in DOB filings, zoning analysis, and code compliance.',
}

export const contact = {
  address: {
    street: '220 Congress Street, Suite 4F',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
  },
  phone: '917.405.7186',
  cell: '929.761.6640',
  email: 'michael@mdeluna.com',
  social: {
    linkedin: '#',
  },
}

export const services = [
  {
    id: 'approvals',
    letter: 'A',
    title: 'Approvals and Building Department',
    color: '#6B1629',
    details: [
      'New Building Applications',
      'Subsequent applications for Structural',
      'Type 1-CO Applications - Change of Use',
      'Subsequent applications for Foundations, Earthwork, and Support for Excavation',
      'Type 2 Applications - Directive 2 and Directive 14 - No Change to Use Egress or Occupancy',
      'Public Assembly Applications',
      'Subsequent filings for Mechanical and Plumbing',
      'Post Approval Amendments',
      'Filing of Progress and Special Inspections',
      'Letter of Completions for Completed Projects',
      'Reassignments of applications',
      'Reinstatements of applications',
    ],
  },
  {
    id: 'work-permits',
    letter: 'W',
    title: 'Work Permits',
    color: '#6B1629',
    details: [
      'Obtaining Permit for Contractor',
      'Permit Renewals',
      'After Hours Permits',
      'Equipment Use Permits',
      'Temporary Public Assembly Permits',
    ],
  },
  {
    id: 'landmarks',
    letter: 'L',
    title: 'NYC Landmarks Preservation Commission Services',
    color: '#6B1629',
    details: [
      'Certificates of No Effect',
      'Certificates of Minor Work',
      'Certificates of Appropriateness',
      'Public Hearings',
    ],
  },
  {
    id: 'occupancy-fire',
    letter: 'C',
    title: 'Certificate of Occupancy and Fire Department Approvals',
    color: '#6B1629',
    details: [
      'TCO Renewals',
      'Divisional Sign Offs: Updates',
      'Obtaining Certificate of Occupancy',
      'Post Approval Amendments',
      'Ansul Systems',
      'Fire Alarms',
      'Fire Protection Plans',
      'Emergency Action Plans',
      'Indoor Automated Parking Garages',
    ],
  },
  {
    id: 'otcr-dot',
    letter: 'O',
    title: 'OTCR and DOT Permits',
    color: '#6B1629',
    details: [
      'Indoor Automated Parking Garages',
      'Construction Equipment Permits and Renewals',
      'Department of Environmental Protection Approvals',
      'SD 1 and 2',
      'RPZ Valves',
    ],
  },
]

export const consultingWork = [
  {
    title: 'Code / Zoning / Filing',
    items: [
      "308 East 38th Street - Dr. Posner's Office",
      '133 West 55th Street - City Center',
      'Cornerstone Housing - Madison & Putnam Street, Brooklyn',
      '40 Hudson Street - Dean Wolf Loft',
      '1509 Bergen Street Housing - Our Lady of Loreto',
      '1630 Dean Street',
      '249 & 251 16th Street, Brooklyn',
      'Big Apple Circus - All Boroughs',
      'Automated Parking Garage (APG)',
      '70-76 Schermerhorn Street, Brooklyn',
      '21-21 31st Street, Astoria',
      '100 Varick Street (SOHO Tower)',
      '1508 Coney Island Avenue',
      '215 & 225 West 28th Street, Manhattan',
    ],
  },
  {
    title: 'Fire Protection Plan and Emergency Action Plan',
    items: [
      '99 Madison Avenue',
      '1508 Coney Island Avenue',
      '37 West 26th Street',
      '118 East 28th Street',
    ],
  },
  {
    title: 'Local Law 11, Facade Maintenance, Repair Filings',
    items: [
      '118 East 28th Street - Facade',
      '115 West 45th Street - Facade',
      '99 Madison Avenue',
      '31 East 32nd Street - Facade',
    ],
  },
]

export const consultingProjects = [
  { id: 'posner-office',      title: "Dr. Posner's Office",          address: '308 East 38th Street',           borough: 'Manhattan'       },
  { id: 'city-center',        title: 'City Center',                  address: '133 West 55th Street',           borough: 'Manhattan'       },
  { id: 'cornerstone',        title: 'Cornerstone Housing',          address: 'Madison & Putnam Street',        borough: 'Brooklyn'        },
  { id: 'dean-wolf-loft',     title: 'Dean Wolf Loft',               address: '40 Hudson Street',               borough: 'Manhattan'       },
  { id: 'our-lady-loreto',    title: 'Our Lady of Loreto',           address: '1509 Bergen Street',             borough: 'Brooklyn'        },
  { id: '1630-dean',          title: '1630 Dean Street',             address: '1630 Dean Street',               borough: 'Brooklyn'        },
  { id: '249-16th',           title: '249 & 251 16th Street',        address: '249 & 251 16th Street',          borough: 'Brooklyn'        },
  { id: 'big-apple-circus',   title: 'Big Apple Circus',             address: 'All Boroughs',                   borough: 'Citywide'        },
  { id: 'apg',                title: 'Automated Parking Garage',     address: 'APG',                            borough: 'Manhattan'       },
  { id: 'schermerhorn',       title: '70–76 Schermerhorn Street',    address: '70–76 Schermerhorn Street',      borough: 'Brooklyn'        },
  { id: '21-31st-astoria',    title: '21-21 31st Street',            address: '21-21 31st Street',              borough: 'Queens'          },
  { id: '100-varick',         title: '100 Varick Street',            address: '100 Varick Street (SOHO Tower)', borough: 'Manhattan'       },
  { id: '1508-coney-island',  title: '1508 Coney Island Avenue',     address: '1508 Coney Island Avenue',       borough: 'Brooklyn'        },
  { id: '215-28th',           title: '215 & 225 West 28th Street',   address: '215 & 225 West 28th Street',     borough: 'Manhattan'       },
]

export const codeServices = [
  {
    id: 'special-inspections',
    title: 'Special Inspections',
    description: 'NYC DOB requires special inspections for structural, mechanical, and fire-protection work. We coordinate with approved agencies and file all required inspection reports.',
    items: [
      'Structural Steel — Welding and Bolting',
      'Concrete — Mix Design, Placement, and Curing',
      'Masonry — Mortar Mix and Placement',
      'Soils and Foundations',
      'Sprinkler Systems',
      'Fire-Stopping and Fire-Blocking',
      'Mechanical Systems',
      'Elevator and Escalator',
      'Energy Code Compliance',
      'Special Inspections for Demolition',
    ],
  },
  {
    id: 'apartment-approvals',
    title: 'Apartment Approvals',
    description: 'Residential alteration approvals for co-ops, condos, and rental buildings — from initial scope review through final sign-off.',
    items: [
      'Co-op and Condo Board Submissions',
      'Alteration Type 1 — Change of Use or Egress',
      'Alteration Type 2 — Interior Renovations',
      'Structural Alterations and Underpinning',
      'Plumbing and Mechanical Filings',
      'Landmark Buildings — Certificates of No Effect',
      'Letter of Completion',
      'TCO and CO Procurement',
    ],
  },
  {
    id: 'equipment-permits',
    title: 'Equipment Use Permits',
    description: 'Permits required for cranes, hoists, derricks, supported scaffolds, and all major construction equipment operating in New York City.',
    items: [
      'Crane Permits (CD1)',
      'Hoist and Derrick Permits',
      'Supported Scaffold Permits',
      'Sidewalk Shed and Fence Permits',
      'Construction Equipment Renewals',
      'OTCR Equipment Filings',
      'After-Hours Variances',
    ],
  },
  {
    id: 'restaurant-approvals',
    title: 'Restaurant & Food Service Approvals',
    description: 'Full-service approval coordination for restaurant build-outs, including DOB, FDNY, and Board of Health requirements.',
    items: [
      'DOB Change of Use — A2 Assembly',
      'Public Assembly Permits (over 74 persons)',
      'FDNY Ansul System Approvals',
      'Fire Alarm System Filings',
      'Grease Duct and Hood Filings',
      'Emergency Action Plans',
      'NYC Health Department Coordination',
      'Outdoor Dining (Sidewalk Café) Permits',
      'Exhaust and Ventilation Filings',
    ],
  },
  {
    id: 'certificates-occupancy',
    title: 'Certificates of Occupancy',
    description: 'Procurement of Temporary and Final Certificates of Occupancy, TCO renewals, and all divisional sign-offs required for project close-out.',
    items: [
      'Temporary Certificate of Occupancy (TCO)',
      'TCO Renewals',
      'Final Certificate of Occupancy',
      'Divisional Sign-Offs — All Trades',
      'Objection Resolution',
      'Post Approval Amendments (PAA)',
      'Letter of Completion (LOC)',
      'Buildings Information System (BIS) Coordination',
    ],
  },
]

export const stats = [
  { value: '30+',    label: 'YEARS',    note: 'Licensed since 1994' },
  { value: '1,800+', label: 'PROJECTS', note: 'Across all five boroughs' },
  { value: '5',      label: 'BOROUGHS', note: 'Manhattan to Staten Island' },
  { value: '1994',   label: 'EST.',      note: 'NYS Lic. № 024891' },
]

export const about = {
  headline: 'Designing New York Since 1993',
  intro: 'Michael De Luna, AIA, brings over three decades of experience to every project. As a licensed architect in New York State, Michael has developed expertise across residential, commercial, and hospitality sectors.',
  paragraphs: [
    'Our practice integrates architectural design with deep knowledge of NYC building regulations. This unique combination allows us to create inspired spaces while navigating the complex approval process efficiently.',
    'We believe great architecture emerges from understanding both the aspirations of our clients and the constraints of the built environment. Every project is an opportunity to add something meaningful to New York\'s architectural fabric.',
    'From brownstone renovations to ground-up commercial buildings, our portfolio reflects a commitment to design excellence and client service.',
  ],
  credentials: [
    'Licensed Architect, New York State — Lic. № 024891',
    'Member, American Institute of Architects (AIA)',
    'Special Inspector Agency — SIA № 008232',
  ],
}

