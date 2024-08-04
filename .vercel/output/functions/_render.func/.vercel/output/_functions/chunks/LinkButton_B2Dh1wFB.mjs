import { p as createAstro, k as createComponent, l as renderTemplate, n as maybeRenderHead, s as addAttribute, o as renderSlot } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://webtales-eight.vercel.app");
const $$LinkButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LinkButton;
  const { href, className, ariaLabel, title, disabled = false } = Astro2.props;
  return renderTemplate`${disabled ? renderTemplate`${maybeRenderHead()}<span${addAttribute(`group inline-block ${className}`, "class")}${addAttribute(ariaLabel, "aria-label")}${addAttribute(title, "title")}${addAttribute(disabled, "aria-disabled")}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`group inline-block hover:text-skin-accent ${className}`, "class")}${addAttribute(ariaLabel, "aria-label")}${addAttribute(title, "title")}>${renderSlot($$result, $$slots["default"])}</a>`}`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/components/LinkButton.astro", void 0);

export { $$LinkButton as $ };
