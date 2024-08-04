import { p as createAstro, k as createComponent, l as renderTemplate, n as maybeRenderHead, s as addAttribute, m as renderComponent } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import { b as $$Hr } from './Header_WfgkCO_a.mjs';

const $$Astro = createAstro("https://webtales-eight.vercel.app");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const { noMarginTop = false } = Astro2.props;
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute(`w-full ${noMarginTop ? "" : "mt-auto"}`, "class")}> ${renderComponent($$result, "Hr", $$Hr, { "noPadding": true })} <div class="max-w-6xl mx-auto px-4 py-8"> <div class="flex flex-col md:flex-row justify-between items-center mb-4"> <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0"> ${footerLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}> ${link.label} </a>`)} </div> </div> <div class="text-center text-sm"> <span>&copy; ${currentYear} WebTales. All rights reserved.</span> </div> </div> </footer>`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/components/Footer.astro", void 0);

export { $$Footer as $ };
