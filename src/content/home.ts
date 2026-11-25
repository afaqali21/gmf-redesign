// Homepage content, carried over from https://globalmarketingfirm.co.uk/ (WordPress).
// Copy is unchanged except for approved typo fixes and merging duplicated blocks.

export const homeSeo = {
  path: "/",
  title: "Digital Marketing Agency London UK | Web Design | App Development",
  description:
    "Global Marketing Firm is a top digital marketing agency in London, UK. Best social media marketing, SEO, email marketing, Google Ads, web design and other services.",
  ogImage: { url: "/wp-content/uploads/2024/05/leedo-page-background.jpg", width: 1200, height: 675, type: "image/jpeg" },
  datePublished: "2018-09-26T18:35:44+00:00",
  dateModified: "2026-05-13T06:45:20+00:00",
};

// Formerly five Revolution Slider slides; now one hero plus three pillars.
export const hero = {
  eyebrow: "Digital Marketing Agency London UK",
  title: "SEO-focused digital marketing that turns clicks into customers.",
  intro:
    "SEO techniques with powerful digital marketing strategies to increase visibility, attract the right audience, and convert them into loyal customers.",
  featured: [
    { label: "AI & Human Call Center", href: "#call-center" },
    { label: "Taxi & Minicab Dispatch", href: "#taxi-dispatch" },
  ],
  note: "Creating meaningful change with digital solutions that are sustainable, inclusive, and ethically driven.",
  pillars: [
    {
      title: "End-to-End Technology Consulting & Development",
      text: "Empowering your business with data and intelligence for long-term success.",
    },
    {
      title: "Customer Support and Communication Solutions",
      text: "Delivering 24/7 customer support and seamless communication solutions for your business.",
    },
    {
      title: "SEO-focused Digital Marketing",
      text: "Increase visibility, attract the right audience, and convert them into loyal customers.",
    },
  ],
};

export const clients = {
  title: "Featured clients",
  logos: [
    { src: "/images/home/clients/client-1.png", alt: "Minicabs.co.uk", width: 100, height: 50 },
    { src: "/images/home/clients/client-2.png", alt: "B2B IT Solutions", width: 72, height: 50 },
    { src: "/images/home/clients/client-3.png", alt: "Breaking Bread Trust", width: 62, height: 50 },
    { src: "/images/home/clients/client-4.png", alt: "Guardforce Global", width: 100, height: 51 },
    { src: "/images/home/clients/client-5.png", alt: "MKM Global", width: 100, height: 45 },
    { src: "/images/home/clients/client-6.png", alt: "Ducane Dry Cleaners", width: 100, height: 39 },
    { src: "/images/home/clients/client-7.png", alt: "Autism Mosque", width: 88, height: 42 },
    { src: "/images/home/clients/client-8.png", alt: "Kingsbury Cab", width: 100, height: 40 },
    { src: "/images/home/clients/client-9.png", alt: "Minicab For London", width: 73, height: 42 },
    { src: "/images/home/clients/client-10.png", alt: "London Radio Cars", width: 100, height: 40 },
    { src: "/images/home/clients/client-11.png", alt: "TP German Tyres", width: 67, height: 47 },
    { src: "/images/home/clients/client-12.png", alt: "PCO GO", width: 47, height: 47 },
    { src: "/images/home/clients/client-13.png", alt: "Relo-I.T Workplace Solutions", width: 100, height: 71 },
  ],
};

export const trusted = {
  title: "Trusted around the world",
  lead: "for delivering excellence in design, development, Digital Marketing, AI, and IT consulting.",
  since: "Providing world-class technology solutions since 2019",
  vision: {
    title: "Vision",
    text: "Boosting businesses with smart, scalable technology solutions.",
    icon: { src: "/images/home/vision.png", width: 72, height: 95 },
  },
  mission: {
    title: "Mission",
    text: "Building trustworthy, innovative solutions that make a lasting impact.",
    icon: { src: "/images/home/mission.png", width: 72, height: 88 },
  },
  stats: [
    { value: 1, prefix: "", suffix: "K+", label: "Projects Completed" },
    { value: 100, prefix: "", suffix: "%", label: "On Time Delivery Record" },
    { value: 85, prefix: "", suffix: "%", label: "Repeat Business Rate" },
    { value: 99, prefix: "", suffix: "%+", label: "Client Satisfaction" },
  ],
};

export type ServiceIcon =
  | "headset"
  | "taxi"
  | "code"
  | "smartphone"
  | "search"
  | "target"
  | "share"
  | "palette"
  | "cloud";

export type Service = {
  title: string;
  text: string;
  icon: ServiceIcon;
  featured?: boolean;
  /** Short tags shown on featured cards. */
  tags?: string[];
  /** Service details carried over from the WordPress homepage (shown under "What's included"). */
  items: string[];
  links: { label: string; href: string }[];
};

// Service headings and copy supplied by GMF (2026-11-25). The bullet items are the
// original homepage service lists, regrouped under the matching service.
export const services = {
  eyebrow: "Our services",
  title: "Complete digital solution",
  cta: { label: "More about our services", href: "/about/" },
  items: [
    {
      title: "AI & Human Call Center Solutions",
      text: "Deliver 24/7 customer support, inbound/outbound communication, and lead handling powered by intelligent AI voice/chat workflows alongside trained human agents.",
      icon: "headset",
      featured: true,
      tags: ["24/7 support", "AI voice & chat", "Human agents", "Lead handling"],
      items: [],
      links: [
        { label: "Explore call center", href: "#call-center" },
        { label: "Talk to us", href: "/contact/" },
      ],
    },
    {
      title: "Taxi & Minicab Operations, Dispatching & Dashboards",
      text: "Provide 24/7 live dispatch support, trained call handlers, and real-time booking management across phone, WhatsApp, web, and mobile apps.",
      icon: "taxi",
      featured: true,
      tags: ["Live dispatch", "Multi-channel booking", "Dashboards", "Autocab · iCabbi · Cordic"],
      items: [],
      links: [
        { label: "Explore dispatch", href: "#taxi-dispatch" },
        { label: "Minicabs Solutions", href: "/minicabs-solutions/" },
      ],
    },
    {
      title: "Web Design & Custom Web Development",
      text: "Build fast, responsive, custom-coded websites and bespoke web applications tailored to business goals rather than rigid templates.",
      icon: "code",
      items: [
        "Custom Web & Mobile Applications",
        "Full-Stack Development Expertise",
        "Custom Software Development",
        "CMS Development (WordPress, Shopify, etc.)",
        "E-commerce Solutions with Payment Integration and checkout flows",
      ],
      links: [
        { label: "Web Design", href: "/web-design/" },
        { label: "Web Development", href: "/web-development/" },
      ],
    },
    {
      title: "Mobile App Development & UI/UX Design",
      text: "Design intuitive user journeys and build reliable web and mobile applications with clean interfaces.",
      icon: "smartphone",
      items: ["UI/UX with Intuitive Layouts and User Flows", "Custom, Brand-Focused Designs"],
      links: [
        { label: "App Development", href: "/app-development/" },
        { label: "App Design", href: "/app-design/" },
      ],
    },
    {
      title: "SEO & Local Search Marketing",
      text: "Grow organic rankings, local visibility, and qualified traffic through technical SEO, on-page optimization, content, and local search strategies.",
      icon: "search",
      items: [
        "SEO to Get Higher Rank & Organic Traffic",
        "Local SEO & Google My Business Optimization",
        "Analytics & Performance Tracking",
      ],
      links: [
        { label: "SEO", href: "/search-engine-optimization/" },
        { label: "Search Engine Marketing", href: "/search-engine-marketing/" },
      ],
    },
    {
      title: "Paid Media & Google Ads (PPC)",
      text: "Launch and optimize targeted PPC and Google Ads campaigns built for measurable ROI and lead generation.",
      icon: "target",
      items: ["Google Ads & PPC Campaigns"],
      links: [{ label: "Google Ads", href: "/google-ads/" }],
    },
    {
      title: "Social Media & Email Marketing",
      text: "Build brand authority, audience engagement, and repeat customer retention through coordinated social campaigns and targeted email flows.",
      icon: "share",
      items: [
        "Social Media Marketing To Build Brand & Engage Audience",
        "Email Marketing Campaigns That Drive Engagement, Bookings & Sales",
      ],
      links: [
        { label: "Social Media", href: "/social-media-marketing/" },
        { label: "Email Marketing", href: "/email-marketing/" },
      ],
    },
    {
      title: "Branding & Graphic Design",
      text: "Create cohesive brand identities, logos, social creatives, ad banners, and print/marketing collateral.",
      icon: "palette",
      items: [
        "Brand Identity & Logo Design",
        "Social Media Creatives Across All Major Platforms",
        "Ad Banners & Promotional Graphics",
        "Marketing Collateral Design: Flyers, Brochures, Posters & Business Cards",
      ],
      links: [
        { label: "Branding", href: "/branding/" },
        { label: "Graphic Design", href: "/graphic-design/" },
      ],
    },
    {
      title: "IT Consulting, Cloud/Hosting & Project Support",
      text: "Provide end-to-end technology consulting, API and third-party integrations, domain/hosting/server management, and IT project execution.",
      icon: "cloud",
      items: [
        "API Integration & Third-Party Services",
        "IT Project Planning & Implementation",
        "Disaster Recovery & Backup Solutions",
        "Software Installation & Configuration",
        "IT Technical Support with Minimal Downtime",
        "Domain Registration, Renewal & Transfer",
        "Shared & Dedicated Hosting Plans",
        "Cloud Hosting & Management",
        "DNS Management & Technical Support",
        "SSL Certificate & CMS Installation",
        "Server Monitoring & Maintenance",
      ],
      links: [{ label: "Talk to us", href: "/contact/" }],
    },
  ] satisfies Service[],
};

// Spotlight 1: AI & Human Call Center (copy supplied by GMF).
export const callCenter = {
  id: "call-center",
  eyebrow: "Featured service",
  title: "AI & Human Call Center Solutions",
  text: "Deliver 24/7 customer support, inbound/outbound communication, and lead handling powered by intelligent AI voice/chat workflows alongside trained human agents. Seamlessly blend speed, automation, and empathetic human resolution so no inquiry or customer call is missed.",
  points: [
    { title: "24/7 Customer Support", text: "Round-the-clock cover so no inquiry or customer call is missed." },
    { title: "Inbound & Outbound Communication", text: "Incoming queries and outbound calls handled by one team." },
    { title: "AI Voice & Chat Workflows", text: "Intelligent automation for speed and consistency." },
    { title: "Trained Human Agents", text: "Empathetic human resolution when a person is needed." },
    { title: "Lead Handling", text: "Every enquiry captured and passed on without delay." },
  ],
  cta: { label: "Talk to us about your call center", href: "/contact/" },
};

// Spotlight 2: Taxi & Minicab. Intro copy supplied by GMF; the six features are the
// original "Taxi Dispatching Services" homepage section.
export const taxi = {
  id: "taxi-dispatch",
  eyebrow: "Featured service",
  title: "Taxi & Minicab Operations, Dispatching & Dashboards",
  text: "Provide 24/7 live dispatch support, trained call handlers, and real-time booking management across phone, WhatsApp, web, and mobile apps. Integrate directly with dispatch systems and operational dashboards (such as Autocab, iCabbi, and Cordic) with live tracking and scalable dispatch teams.",
  featuresTitle: "Taxi Dispatching Services",
  features: [
    { title: "24/7 Live Dispatch Support", text: "Round the clock booking and dispatching to ensure no ride is ever missed." },
    { title: "Experienced Call Handlers", text: "Trained agents with excellent communication skills and knowledge of local areas and traffic." },
    { title: "Real-Time Booking & Tracking", text: "Instant booking confirmations with real-time driver tracking and updates." },
    { title: "Multi-Channel Booking Support", text: "Accept bookings via phone, WhatsApp, web, and mobile app all managed in one system." },
    { title: "CRM & Dispatch Software Integration", text: "Seamless integration with your dispatch system (e.g., Autocab, iCabbi, Cordic)." },
    { title: "Scalable Dispatching Teams", text: "Grow your fleet or customer base: our team scales with your business needs." },
  ],
  integrations: ["Autocab", "iCabbi", "Cordic"],
  channels: ["Phone", "WhatsApp", "Web", "Mobile app"],
  cta: { label: "Explore Minicabs Solutions", href: "/minicabs-solutions/" },
};

export const commitments = {
  title: "Our commitments",
  items: [
    {
      title: "Client-Centric Approach",
      text: "Listen, understand, and deliver solutions that truly align with your goals.",
      image: { src: "/images/home/commitments/commit-1.png", width: 208, height: 158 },
    },
    {
      title: "On-Time Delivery",
      text: "Every project is managed with clear timelines and delivered without delays.",
      image: { src: "/images/home/commitments/commit-2.png", width: 152, height: 158 },
    },
    {
      title: "Standard & Quality",
      text: "Maintain high standards in design, code, and communication always.",
      image: { src: "/images/home/commitments/commit-3.png", width: 208, height: 148 },
    },
    {
      title: "Support & Transparency",
      text: "From start to finish, we offer clear communication and reliable support.",
      image: { src: "/images/home/commitments/commit-4.png", width: 128, height: 156 },
    },
  ],
};

// Other sector pages (taxi/minicab also has its own spotlight above).
export const industries = {
  eyebrow: "Industries",
  title: "Industry solutions",
  items: [
    {
      title: "Law Firm SEO",
      text: "We help lawyers rank higher, get more calls, and attract quality cases with proven attorney SEO strategies.",
      href: "/law-firm-seo/",
    },
    {
      title: "Travel SEO Services",
      text: "Boost Google rankings, increase organic traffic, and drive more bookings with proven strategies for travel businesses.",
      href: "/travel-seo-services/",
    },
    {
      title: "Dry Cleaning Solutions",
      text: "Marketing agency and web development specialising in dry cleaners.",
      href: "/dry-cleaning-solutions/",
    },
  ],
};

export const process = {
  title: "Our working process",
  intro:
    "You might think it is a daunting task to change digital marketing companies but we have one of the smoothest transition processes in the industry. We start off with a free consultation where we can introduce ourselves and get to know you and your business.",
  outro:
    "The next step is careful analysis and planning by our experienced team. Your project is then delivered and then we provide your reports on completion as well as monthly reporting. We are so confident you will be pleased with what we have to offer, so book your free consultation today.",
  steps: [
    { title: "Free Consultation", icon: "/images/home/process/free-consultation.png" },
    { title: "Analysis", icon: "/images/home/process/analysis.png" },
    { title: "Planning", icon: "/images/home/process/planning.png" },
    { title: "Delivery", icon: "/images/home/process/delivery.png" },
    { title: "Result", icon: "/images/home/process/result.png" },
  ],
};

export const competitive = {
  title: "If you want to remain competitive online, you have to keep up with the latest techniques.",
  paragraphs: [
    "Our knowledgeable and experienced team remains up to date with the latest social media and search engine techniques. We follow these latest trends and techniques to get the best result for you.",
    "To achieve your goal we utilise a variety of paid and unpaid marketing strategies such as Pay Per Click (PPC), create SEO-optimised content to increase organic traffic and build a strong social media presence for your business. With over 10 years of experience running a variety of marketing activities, our clients have been amazed with our services and results.",
    "So whether your goal is to grow your presence on Google or fine-tune your email marketing, we offer a complete digital solution.",
  ],
  cta: { label: "Free consultation", href: "/booking/" },
  image: { src: "/images/home/competitive.jpg", width: 800, height: 449 },
};

// "Our Marketing Specialities" and "Design and Marketing Impact" had near-identical
// copy on the old site; they are merged into one section.
export const specialities = {
  title: "Our marketing specialities",
  text: "We have used a variety of tools to bring many clients to the first page of Google search results on a national scale. Our SEO team utilises both paid and non-paid services to grow your business online and boost your sales.",
  impactTitle: "Design and marketing impact on your business",
  platforms: [
    { name: "Bing", src: "/images/home/platforms/bing.png" },
    { name: "Trustpilot", src: "/images/home/platforms/trustpilot.png" },
    { name: "Yell Business", src: "/images/home/platforms/yell.png" },
    { name: "Trip Advisor", src: "/images/home/platforms/trip-advisor.png" },
    { name: "Yelp", src: "/images/home/platforms/yelp.png" },
    { name: "Instagram", src: "/images/home/platforms/instagram.png" },
    { name: "Facebook", src: "/images/home/platforms/facebook.png" },
    { name: "YouTube", src: "/images/home/platforms/youtube.png" },
  ],
  images: [
    { src: "/images/home/impact-1.jpg", alt: "Team planning a marketing strategy on a whiteboard", width: 445, height: 381 },
    { src: "/images/home/impact-2.jpg", alt: "Smiling professional holding a laptop", width: 751, height: 498 },
  ],
};

// Google reviews. Text is verbatim; only scraping damage was repaired (see notes in README).
export const testimonials = {
  title: "Testimonials",
  items: [
    { name: "Ducane Richmond", text: "We are beyond thrilled with the web development services provided by the team at Global Marketing Firm! From start to finish, the entire experience has been nothing short of exceptional. The team not only met but exceeded our expectations in every way." },
    { name: "Minicabs London", text: "Global Marketing Firm Uk, did a great job on web and app design & development! Customer and driver apps were quite complicated but they came up with great ideas. They are professional and finished on time. I'd recommend them for design, development and SEO." },
    { name: "Minicab forlondon", text: "We would highly recommend Global Marketing Firm, especially in the taxi industry and they have done an amazing SEO work for us." },
    { name: "Umar Ansari", text: "Excellent services. Super efficient staff. Convenient consultation appointments. Would definitely like to work with them again." },
    { name: "Ch. Javed", text: "I highly admire their services. The quick delivery and quick resolution to my feedbacks were very much appreciated by them." },
    { name: "Arsal Humayun", text: "I highly recommend this Global Marketing Firm in the UK if you're looking for a reliable search engine marketing consultant. Their SEM ad optimization helped my business get better results with more traffic and higher ROI. They're professional, easy to work with and deliver what they promise. Go for them!" },
    { name: "Faiza Khan", text: "I've worked with a few digital marketing agencies in the past, but Global Marketing Firm truly stands out. After a couple of disappointing experiences from some well known companies in London, I finally found a team that understood my vision and delivered exceptional results for social media marketing of my small BnB business in the UK." },
    { name: "Talha saleem", text: "I am beyond impressed with the SEO services provided by Global Marketing Firm UK! Their in-depth understanding of SEO strategies and attention to detail was evident from the start. The results we've seen are phenomenal, and our business has grown thanks to their expertise. I highly recommend them to anyone looking for the best SEO services in the UK!" },
    { name: "Qasim Khan", text: "TRULY IMPRESSED!!!! I had an amazing experience working with this Team on my website design! Their attention to detail, creativity, and professionalism truly stood out. They took the time to understand my vision and brought it to life with a sleek, modern design." },
    { name: "Tehreem Umar", text: "BEST Web development services ever. Their team is highly professional and cooperative. Highly recommended 👍🏻" },
  ],
};

// Latest posts (from the WordPress REST API on 2026-11-25). Replaced by the
// migrated MDX posts once the blog is rebuilt.
export const latestPosts = {
  title: "Latest from the blog",
  cta: { label: "View all articles", href: "/blog/" },
  items: [
    {
      title: "Why Every Small Business Needs a Professional Website in 2026",
      href: "/why-every-small-business-needs-a-professional-website-in-2026/",
      date: "2026-11-23",
      excerpt: "A prospective customer may hear about your café from a neighbour, spot your taxi firm on the road or find your salon through a social post. Before they call, book or visit, many will check you online.",
    },
    {
      title: "Social Media Marketing Strategies to Grow Your Business",
      href: "/social-media-marketing-strategies-to-grow-your-business/",
      date: "2026-11-19",
      excerpt: "Social media is not simply a broadcast channel. For many customers, it is the first place they meet a business, assess its credibility and decide whether to take the next step.",
    },
    {
      title: "How to Optimise Your Website for ChatGPT and Google AI Search",
      href: "/how-to-optimise-your-website-for-chatgpt-and-google-ai-search/",
      date: "2026-11-17",
      excerpt: "Customers increasingly ask ChatGPT, Gemini or Google a question before they visit a website. For a small business, that creates a new challenge: your services may be exactly what someone needs, but your business may not appear in the AI-generated answer.",
    },
  ],
};

export const finalCta = {
  title: "Book your free consultation today.",
  text: "We start off with a free consultation where we can introduce ourselves and get to know you and your business.",
};
