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
    id: "static",
    name: "Static Website",
    price: "Starting at $150",
    blurb: "A fast, hand-built site for businesses and portfolios.",
    features: [
      "HTML / CSS / JavaScript build",
      "Deployment",
      "Domain name setup",
    ],
  },
  {
    id: "dynamic",
    name: "Dynamic Website",
    price: "Starting at $450",
    blurb: "Content that changes, users that log in, data that persists.",
    features: [
      "Database",
      "Front-end",
      "Back-end",
      "Deployment",
      "Domain name setup",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    price: "Starting at $600",
    blurb: "Sell online with a storefront built to convert.",
    features: [
      "Product catalog",
      "Cart & checkout",
      "Payment integration",
      "Deployment",
      "Domain name setup",
    ],
  },
  {
    id: "teaching",
    name: "Teaching Platform",
    price: "Starting at $700",
    blurb: "Courses, students and content delivery in one system.",
    features: [
      "Course / content management",
      "User accounts",
      "Video & content delivery",
      "Deployment",
      "Domain name setup",
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
