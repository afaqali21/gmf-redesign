// Site-wide content carried over from the WordPress site (header, footer, contact).

export const site = {
  name: "Global Marketing Firm",
  url: "https://globalmarketingfirm.co.uk",
  tagline: "Complete digital solution",
  blurb:
    "We are a marketing and web development team that is based within the U.K offering a wealth of services that will help your business grow online.",
  phone: {
    display: "0207 183 1099",
    tel: "tel:02071831099",
    whatsapp: "https://wa.me/+442071831099",
  },
  email: "info@globalmarketingfirm.co.uk",
  bookingPath: "/booking/",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/Globalmarketingfirm.co.uk/" },
    { label: "Instagram", href: "https://www.instagram.com/globalmarketingfirm.co.uk/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/globalmarketingfirm/" },
    { label: "Twitter", href: "https://twitter.com/GlobalMFirm" },
    { label: "YouTube", href: "https://www.youtube.com/@GlobalMarketingFirm" },
  ],
} as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const mainNav: NavItem[] = [
  {
    label: "Marketing",
    children: [
      { label: "Search Engine Marketing", href: "/search-engine-marketing/" },
      { label: "Social Media Marketing", href: "/social-media-marketing/" },
      { label: "Search Engine Optimization", href: "/search-engine-optimization/" },
      { label: "Email Marketing", href: "/email-marketing/" },
      { label: "Google Ads", href: "/google-ads/" },
      { label: "Branding", href: "/branding/" },
    ],
  },
  {
    label: "Development",
    children: [
      { label: "App Development", href: "/app-development/" },
      { label: "Web Development", href: "/web-development/" },
    ],
  },
  {
    label: "Designing",
    children: [
      { label: "App Design", href: "/app-design/" },
      { label: "Graphic Design", href: "/graphic-design/" },
      { label: "Web Design", href: "/web-design/" },
    ],
  },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "Contact", href: "/contact/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Marketing",
    links: (mainNav[0] as { children: NavLink[] }).children,
  },
  {
    heading: "Development",
    links: [
      { label: "Web Development", href: "/web-development/" },
      { label: "App Development", href: "/app-development/" },
    ],
  },
  {
    heading: "Designing",
    links: [
      { label: "Graphic Design", href: "/graphic-design/" },
      { label: "Web Design", href: "/web-design/" },
      { label: "App Design", href: "/app-design/" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Terms and Conditions", href: "/terms/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Cookie Policy", href: "/cookie-policy-uk/" },
];
