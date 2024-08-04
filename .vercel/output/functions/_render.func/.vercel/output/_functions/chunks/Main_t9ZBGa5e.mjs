import { p as createAstro, k as createComponent, l as renderTemplate, n as maybeRenderHead, s as addAttribute, o as renderSlot } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://webtales-eight.vercel.app");
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Main;
  const { props } = Astro2;
  return renderTemplate`${maybeRenderHead()}<main id="main-content" data-astro-cid-hsp6otuf> ${"titleTransition" in props ? renderTemplate`<h1 data-astro-cid-hsp6otuf> ${props.pageTitle.split("").map((char, index) => renderTemplate`<span class="title-char"${addAttribute(`transition-delay: ${index * 50}ms;`, "style")} data-astro-cid-hsp6otuf> ${char} </span>`)} </h1>` : renderTemplate`<h1 data-astro-cid-hsp6otuf>${props.pageTitle}</h1>`} <p data-astro-cid-hsp6otuf>${props.pageDesc}</p> ${renderSlot($$result, $$slots["default"])} </main> `;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/layouts/Main.astro", void 0);

export { $$Main as $ };
