/**
 * SHOAL PRICING CONFIG
 * ---------------------------------------------------------------
 * This is the ONLY place to edit Shoal's offerings.
 * Change `price` strings, feature bullets, names or order freely —
 * the /shoal page renders straight from this array.
 */
export type ShoalService = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  features: string[];
};

export const SHOAL_SERVICES: ShoalService[] = [
  {
    id: "surface",
    name: "Surface",
    price: "Starting at $150",
    blurb: "Simple, professional digital presence.",
    features: [
      "HTML / CSS / JavaScript build",
      "Deployment",
      "Domain name setup",
    ],
  },
  {
    id: "systems",
    name: "Systems",
    price: "Starting at $450",
    blurb: "Web applications that do more than inform — they operate.",
    features: [
      "Dashboards",
      "Booking systems",
      "Inventory / customer portals",
      "E-commerce stores",
      "Online course platforms",
      "Database",
      "Front-end",
      "Back-end",
      "Deployment",
      "Domain name setup",
    ],
  },
  {
    id: "automation",
    name: "Automation",
    price: "Starting at $900",
    blurb: "Business infrastructure, not just a website.",
    features: [
      "Website / form → database",
      "CRM / notifications",
      "Analytics / reporting",
      "Connected workflows",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    price: "Contact for pricing",
    blurb: "Have something else in mind? Tell us about it.",
    features: [],
  },
];

/** Maintenance policy shown in the banner on /shoal. */
export const MAINTENANCE_NOTE =
  "Ongoing maintenance is included for the first 3 months after deployment. After that, maintenance continues as a paid monthly service.";
