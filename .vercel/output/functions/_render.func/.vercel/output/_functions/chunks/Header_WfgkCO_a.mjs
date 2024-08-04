import { p as createAstro, k as createComponent, l as renderTemplate, s as addAttribute, o as renderSlot, v as renderHead, m as renderComponent, n as maybeRenderHead } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';

const $$Astro$3 = createAstro("https://webtales-eight.vercel.app");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://webtales-eight.vercel.app");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Webtales",
    description = "Your MTL Novels Sources",
    image = "http://img.9999txt.cc/91/91333/91333s.jpg",
    canonicalURL = Astro2.url.pathname
  } = Astro2.props;
  function getAbsoluteURL(path) {
    const baseURL = "https://webtales-eight.vercel.app";
    return new URL(path, baseURL).toString();
  }
  const pageURL = getAbsoluteURL(canonicalURL);
  const ogImage = image.startsWith("http") ? image : getAbsoluteURL(image);
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>", '</title><meta name="title"', '><meta name="description"', '><link rel="sitemap" href="/sitemap-index.xml"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script defer src="https://cloud.umami.is/script.js" data-website-id="d89b4d7d-c58a-47a1-9ee5-f31621c9a953"></script><meta name="google-site-verification" content="gkr0TD9V6Zui_8BfnEllUPWNH6zuFiyTeZPdP0Wlz90">', '<script src="/toggle-theme.js"></script>', '</head> <body class="mx-auto max-w-4xl"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(pageURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(pageURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro("https://webtales-eight.vercel.app");
const $$Hr = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hr;
  const { noPadding = false, ariaHidden = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`max-w-3xl mx-auto ${noPadding ? "px-0" : "px-4"}`, "class")}> <hr class="border-skin-line"${addAttribute(ariaHidden, "aria-hidden")}> </div>`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/components/Hr.astro", void 0);

const $$Astro = createAstro("https://webtales-eight.vercel.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { activeNav } = Astro2.props;
  const navItems = [
    { href: "/", label: "Novels" },
    // { href: "/bookmark/", label: "Bookmark" },
    // { href: "/acccount/", label: "Account" },
    { href: "/search/", label: "Search", icon: true }
  ];
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <div class="mx-auto flex max-w-3xl flex-col items-center justify-between sm:flex-row" data-astro-cid-3ef6ksr2> <div class="relative flex w-full items-start justify-between p-4 sm:items-center sm:py-8" data-astro-cid-3ef6ksr2> <a href="/" class="absolute py-1 text-xl font-bold sm:static sm:text-3xl" data-astro-cid-3ef6ksr2>WebTales</a> <nav id="nav-menu" class="flex w-full flex-col items-center sm:ml-2 sm:flex-row sm:justify-end sm:space-x-4 sm:py-0" data-astro-cid-3ef6ksr2> <button class="hamburger-menu self-end p-2 focus:outline-none sm:hidden" aria-label="Open Menu" aria-expanded="false" aria-controls="menu-items" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="menu-icon" data-astro-cid-3ef6ksr2> <line x1="7" y1="12" x2="21" y2="12" class="line" data-astro-cid-3ef6ksr2></line> <line x1="3" y1="6" x2="21" y2="6" class="line" data-astro-cid-3ef6ksr2></line> <line x1="12" y1="18" x2="21" y2="18" class="line" data-astro-cid-3ef6ksr2></line> <line x1="18" y1="6" x2="6" y2="18" class="close" data-astro-cid-3ef6ksr2></line> <line x1="6" y1="6" x2="18" y2="18" class="close" data-astro-cid-3ef6ksr2></line> </svg> </button> <ul id="menu-items" class="mt-4 grid w-44 grid-cols-1 gap-x-2 gap-y-2 sm:ml-0 sm:mt-0 sm:flex sm:w-auto sm:gap-x-5 sm:gap-y-0" data-astro-cid-3ef6ksr2> ${navItems.map((item) => renderTemplate`<li${addAttribute(`col-span-2 flex items-center justify-center ${item.icon ? "col-span-1" : ""}`, "class")} data-astro-cid-3ef6ksr2> ${item.icon ? renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`p-3 focus:outline-none sm:p-1 ${activeNav === item.label.toLowerCase() ? "active" : ""} flex`, "class")}${addAttribute(item.label, "title")} data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 scale-125 fill-current sm:scale-100" data-astro-cid-3ef6ksr2> <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" data-astro-cid-3ef6ksr2></path> </svg> <span class="sr-only" data-astro-cid-3ef6ksr2>${item.label}</span> </a>` : renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`w-full px-4 py-3 text-center font-medium hover:text-skin-accent sm:my-0 sm:px-2 sm:py-1 ${activeNav === item.label.toLowerCase() ? "active" : ""}`, "class")} data-astro-cid-3ef6ksr2> ${item.label} </a>`} </li>`)} <li class="flex items-center justify-center" data-astro-cid-3ef6ksr2> <button id="theme-btn" class="p-3 focus:outline-none sm:p-1" title="Toggles light & dark" aria-label="auto" aria-live="polite" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" id="sun-svg" class="hidden h-6 w-6 scale-125 fill-current hover:rotate-12 sm:scale-100" data-astro-cid-3ef6ksr2> <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" data-astro-cid-3ef6ksr2></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" id="moon-svg" class="h-6 w-6 scale-125 fill-current hover:rotate-12 sm:scale-100" data-astro-cid-3ef6ksr2> <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" data-astro-cid-3ef6ksr2></path> </svg> </button> </li> </ul> </nav> </div> </div> ${renderComponent($$result, "Hr", $$Hr, { "data-astro-cid-3ef6ksr2": true })} </header>  `;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/components/Header.astro", void 0);

export { $$Header as $, $$Layout as a, $$Hr as b };
