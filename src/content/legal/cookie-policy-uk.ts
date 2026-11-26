import type { HtmlPage } from "@/lib/content";
import { site } from "@/content/site";

/*
 * Cookie Policy (UK). The WordPress version (Complianz) was never archived, so this text was
 * written for the rebuilt site and describes what it actually does: one consent cookie
 * (gmf_consent, src/lib/consent.ts), no analytics, advertising or tracking cookies, no local
 * storage, fonts and images self-hosted, and one third-party embed (Google Maps on /contact/),
 * loaded only after consent. Update it before adding analytics, chat widgets or other embeds.
 */

const URL = "https://globalmarketingfirm.co.uk/cookie-policy-uk/";
const TITLE = "Cookie Policy (UK) - Global Marketing Firm";
const UPDATED = "2026-11-26T00:00:00+00:00";

const html = `
<p>This Cookie Policy explains how ${site.name} uses cookies and similar technologies on this website, <a href="/">globalmarketingfirm.co.uk</a>. It should be read together with our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms/">Terms and Conditions</a>.</p>

<h3 id="what-are-cookies">What are cookies?</h3>
<p>Cookies are small text files that a website stores on your computer, phone or tablet when you visit it. They are widely used to make websites work, to remember your preferences and to give the website owner information about how the site is used. Similar technologies include local storage, pixels and device fingerprinting.</p>

<h3 id="how-we-use-cookies">How we use cookies</h3>
<p>We keep the use of cookies on this website to a minimum:</p>
<ul>
<li>We do <strong>not</strong> use analytics, advertising, social media or other tracking cookies.</li>
<li>The only cookie we set ourselves remembers your cookie choice. Browsing the website or sending us an enquiry through the quote, contact or comment forms does not set any other cookies.</li>
<li>Optional third-party cookies (Google Maps) are only allowed if you choose “Accept all” in our cookie banner.</li>
<li>Our fonts and images are served from our own website, so loading a page does not send your details to font or image providers.</li>
<li>We do not use local storage, tracking pixels or fingerprinting to identify you.</li>
</ul>

<h3 id="strictly-necessary-cookies">Strictly necessary cookies</h3>
<p>Strictly necessary cookies are needed for a website to work securely and to remember the choices you make. They do not require your consent.</p>
<table>
<thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead>
<tbody><tr><td><code>gmf_consent</code></td><td>Remembers whether you accepted or rejected optional cookies, so the cookie banner is not shown on every page.</td><td>6 months</td></tr></tbody>
</table>
<p>If our hosting or security provider sets a strictly necessary cookie, for example to protect the website from automated attacks, it is used only for that purpose and never for marketing.</p>

<h3 id="third-party-cookies">Third-party cookies</h3>
<p>Our <a href="/contact/">Contact</a> page can show an embedded Google Maps map so that you can find our office. The map only loads if you accept optional cookies, either in the cookie banner or with the “Accept cookies and show map” button on the Contact page. When the map loads, Google may set or read cookies on your device and collect information such as your IP address. Google controls these cookies, not us. You can find out more in Google’s <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">cookie information</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
<p>Links on this website to other websites, such as our social media pages, are not covered by this policy. Those websites have their own cookie and privacy policies.</p>

<h3 id="managing-cookies">Managing cookies</h3>
<p>You can change your choice at any time with the “Cookie settings” link at the bottom of every page. If you withdraw your consent, the map will no longer load, but cookies Google has already set stay in your browser until they expire or you delete them.</p>
<p>You can also choose to block or delete cookies through your browser settings. Most browsers let you:</p>
<ul>
<li>see which cookies are stored and delete them individually or all at once</li>
<li>block third-party cookies</li>
<li>block cookies from particular websites</li>
<li>block all cookies</li>
<li>delete all cookies when you close the browser</li>
</ul>
<p>The help pages of your browser (for example Chrome, Safari, Firefox or Edge) explain how to change these settings. Blocking cookies may stop the map on our Contact page from loading, and the cookie banner will be shown again on your next visit, but the rest of the website will continue to work.</p>

<h3 id="changes-to-this-policy">Changes to this policy</h3>
<p>If we change how we use cookies, for example by adding analytics, we will update this policy and ask for your consent through the cookie banner before setting any non-essential cookies. The date at the top of this page shows when it was last updated.</p>

<h3 id="contact-us">Contact us</h3>
<p>If you have any questions about this Cookie Policy, please email us at <a href="mailto:${site.email}">${site.email}</a> or call us on <a href="${site.phone.tel}">${site.phone.display}</a>.</p>
`.trim();

export const cookiePolicyPage: HtmlPage = {
  path: "/cookie-policy-uk/",
  h1: "Cookie Policy (UK)",
  html,
  seo: {
    title: TITLE,
    description: null,
    canonical: "/cookie-policy-uk/",
    ogType: "article",
    ogImage: { url: "/wp-content/uploads/2024/05/global-marketing-firm.png", width: 1200, height: 675, type: "image/png" },
    published: null,
    modified: UPDATED,
    twitter: {},
    schema: [
      {
        "@type": "WebPage",
        "@id": URL,
        url: URL,
        name: TITLE,
        isPartOf: { "@id": "https://globalmarketingfirm.co.uk/#website" },
        dateModified: UPDATED,
        breadcrumb: { "@id": `${URL}#breadcrumb` },
        inLanguage: "en-US",
        potentialAction: [{ "@type": "ReadAction", target: [URL] }],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://globalmarketingfirm.co.uk/" },
          { "@type": "ListItem", position: 2, name: "Cookie Policy (UK)" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://globalmarketingfirm.co.uk/#website",
        url: "https://globalmarketingfirm.co.uk/",
        name: "Global Marketing Firm",
        description: "Complete digital solution",
        inLanguage: "en-US",
      },
    ],
  },
};
