/* empty css                         */
import { k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import { $ as $$Header, a as $$Layout } from './Header_WfgkCO_a.mjs';
import { $ as $$LinkButton } from './LinkButton_B2Dh1wFB.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 Not Found" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" class="mx-auto flex max-w-3xl flex-1 items-center justify-center"> <div class="mb-14 flex flex-col items-center justify-center"> <h1 aria-label="404 Not Found" class="text-9xl font-bold text-skin-accent">404</h1> <span aria-hidden="true">¯\\_(ツ)_/¯</span> <p class="mt-4 text-2xl sm:text-3xl">Page Not Found</p> ${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": "/", "className": "my-6 text-lg underline decoration-dashed underline-offset-8" }, { "default": ($$result3) => renderTemplate`
Go back home
` })} </div> </main> ` })}`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/404.astro", void 0);

const $$file = "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/404.astro";
const $$url = "/404/";

export { $$404 as default, $$file as file, $$url as url };
