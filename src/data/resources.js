// Official NYC links. Every URL here was checked against nyc.gov / the agency's own site.
const B = 'https://www.nyc.gov/site/buildings'

export const resourceSections = [
  {
    id: 'dob-forms',
    title: 'DOB Forms & Applications',
    intro: 'Where the Department of Buildings keeps its forms, permit guidance and filing instructions.',
    links: [
      { label: 'Forms & Applications', href: `${B}/dob/forms.page`, note: 'Every current DOB form, application and PDF.' },
      { label: 'Obtaining a Permit', href: `${B}/property-or-business-owner/obtaining-a-permit.page`, note: 'Permit types, requirements and who can file.' },
      { label: 'Certificate of Occupancy', href: `${B}/property-or-business-owner/certificate-of-occupancy.page`, note: 'Applying for, amending and finding a CO.' },
      { label: 'After Hour Variances', href: `${B}/property-or-business-owner/after-hour-variances-info.page`, note: 'Permission to work outside regular hours.' },
      { label: 'Professional Certification', href: `${B}/industry/professional-certification.page`, note: 'Program rules for self-certified filings.' },
      { label: 'Special Inspections', href: `${B}/industry/special-inspections.page`, note: 'Required inspections and approved agencies.' },
    ],
  },
  {
    id: 'online-systems',
    title: 'DOB NOW & Online Systems',
    intro: 'The portals used to file, track and look up work on a property.',
    links: [
      { label: 'DOB NOW', href: 'https://a810-dobnow.nyc.gov/publish/#!/', note: 'Online filing, permits, inspections and payments.' },
      { label: 'How to Use DOB NOW', href: `${B}/dob/use-dob-now.page`, note: 'Guides for each DOB NOW module.' },
      { label: 'DOB NOW Training & Resources', href: `${B}/industry/dob-now-training.page`, note: 'Prior meeting and training materials.' },
      { label: 'Buildings Information System (BIS)', href: 'http://www.nyc.gov/bis', note: 'Property profiles, job history, violations and COs by address.' },
      { label: 'eFiling', href: 'https://a810-efiling.nyc.gov/eRenewal/loginER.jsp', note: 'Legacy eFiling login and renewals.' },
      { label: 'Make an Appointment', href: 'https://a810-dobnow.nyc.gov/Publish/Appointments/index.html#/', note: 'Book time with DOB staff.' },
      { label: 'Job Status Updates', href: `${B}/dob/get-job-status-updates.page`, note: 'Get notified as a filing moves.' },
    ],
  },
  {
    id: 'codes-bulletins',
    title: 'Codes, Bulletins & Notices',
    intro: 'The rules behind a filing and the interpretations DOB issues about them.',
    links: [
      { label: 'Construction Codes', href: `${B}/codes/codes.page`, note: 'Building, Mechanical, Plumbing, Fuel Gas and related codes.' },
      { label: 'Buildings Bulletins', href: `${B}/codes/building-bulletins-current.page`, note: 'Current bulletins on code interpretation and policy.' },
      { label: 'Code Notes', href: `${B}/codes/code-notes.page`, note: 'Clarifications on specific code provisions.' },
      { label: 'Service Updates & Changes', href: `${B}/dob/service-updates.page`, note: 'Upcoming changes to DOB systems and procedures.' },
      { label: 'Project Guidelines', href: `${B}/dob/project-guidelines.page`, note: 'DOB guidance for specific project types.' },
      { label: 'Energy Conservation Code', href: `${B}/codes/energy-conservation-code.page`, note: 'NYC Energy Conservation Code and compliance paths.' },
    ],
  },
  {
    id: 'violations',
    title: 'Violations & Enforcement',
    intro: 'For stop work orders, summonses and complaints.',
    links: [
      { label: 'Resolve a Summons or Violation', href: `${B}/dob/resolve-a-summons-or-violation.page`, note: 'Steps to cure, certify and pay.' },
      { label: 'Stop Work Order Guide', href: `${B}/safety/swo-common-conditions.page`, note: 'Common conditions and how to lift an order.' },
      { label: 'File a Complaint', href: `${B}/dob/file-a-complaint.page`, note: 'Report unsafe or unpermitted work.' },
      { label: 'Enforcement Action Bulletins', href: `${B}/dob/enforcement-action-bulletins.page`, note: 'DOB notices on enforcement actions.' },
      { label: 'Project Advocate Program', href: `${B}/property-or-business-owner/project-advocate-program.page`, note: 'Meet with DOB staff on complex projects.' },
    ],
  },
  {
    id: 'agencies',
    title: 'Zoning, Landmarks & Other Agencies',
    intro: 'Other city offices a project often has to clear.',
    links: [
      { label: 'ZoLa — Zoning & Land Use Map', href: 'https://zola.planning.nyc.gov/', note: 'Zoning district, lot and overlay lookup by address.' },
      { label: 'About Zoning (City Planning)', href: 'https://www.nyc.gov/site/planning/zoning/about-zoning.page', note: 'Overview of the Zoning Resolution.' },
      { label: 'Landmarks Preservation Commission', href: 'https://www.nyc.gov/site/lpc/index.page', note: 'Landmark and historic district approvals.' },
      { label: 'LPC Applications', href: 'https://www.nyc.gov/site/lpc/applications/applications.page', note: 'Application types and submission steps.' },
      { label: 'Board of Standards and Appeals', href: 'https://www.nyc.gov/site/bsa/index.page', note: 'Zoning variances and special permits.' },
      { label: 'BSA Applications', href: 'https://www.nyc.gov/site/bsa/applications/applications.page', note: 'Filing requirements and forms.' },
      { label: 'ACRIS — Property Records', href: 'https://a836-acris.nyc.gov/', note: 'Deeds, mortgages and other recorded documents.' },
      { label: 'DOB Borough Offices', href: `${B}/dob/office-locations.page`, note: 'Addresses and hours for each borough.' },
    ],
  },
]
