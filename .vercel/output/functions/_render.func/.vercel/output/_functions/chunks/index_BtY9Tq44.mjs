/* empty css                         */
import { p as createAstro, k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead, s as addAttribute } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import { a as $$Layout, $ as $$Header, b as $$Hr } from './Header_WfgkCO_a.mjs';
import { $ as $$Image } from './_astro_assets_CoDYjaa7.mjs';
/* empty css                         */

const $$Astro = createAstro("https://webtales-eight.vercel.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { id } = Astro2.params;
  const API_URL = "http://128.199.208.160:8080";
  const getNovelData = async (id2) => {
    const res = await fetch(`${API_URL}/novels/${id2}`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  };
  const novel = await getNovelData(id);
  if (!novel) {
    return Astro2.redirect("/404");
  }
  const getChaptersData = async (id2) => {
    const res = await fetch(`${API_URL}/novels/${id2}/chapters`);
    if (!res.ok) {
      return [];
    }
    return await res.json();
  };
  const chapters = await getChaptersData(id);
  novel.description.split("\n\n").filter((p) => p.trim() !== "");
  const title = `${novel.title} | Webtales`;
  const description = novel.description.slice(0, 160);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "image": novel.thumbnail, "data-astro-cid-qw433bsx": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "novels", "data-astro-cid-qw433bsx": true })} ${maybeRenderHead()}<div class="container mx-auto max-w-3xl px-4 py-8" data-astro-cid-qw433bsx> <div class="lg:grid-cols-3 grid grid-cols-1 gap-8" data-astro-cid-qw433bsx> <div class="lg:col-span-2" data-astro-cid-qw433bsx> ${novel.thumbnail && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "mx-auto w-52 max-w-sm rounded-lg object-cover shadow-lg sm:h-auto sm:w-full", "width": 200, "height": 200, "src": novel.thumbnail, "alt": novel.title, "data-astro-cid-qw433bsx": true })}`} <h1 class="mb-2 mt-6 text-2xl font-bold text-skin-base sm:text-4xl" data-astro-cid-qw433bsx> ${novel.title} </h1> <p class="mb-2 sm:text-2xl" data-astro-cid-qw433bsx>${novel.raw_title}</p> <p class="mb-4 text-lg text-skin-base opacity-80 sm:text-xl" data-astro-cid-qw433bsx>
Author: ${novel.author} </p> <div class="rounded-lg bg-skin-card p-4 shadow-md sm:p-6" data-astro-cid-qw433bsx> <h2 class="mb-4 text-xl font-semibold text-skin-base sm:text-2xl" data-astro-cid-qw433bsx>
Description
</h2> <div id="descriptionContainer" class="text-sm text-skin-base sm:text-base" data-astro-cid-qw433bsx> <p id="shortDescription" class="overflow-x-hidden text-pretty leading-relaxed" data-astro-cid-qw433bsx> ${novel.description.split(" ").slice(0, 50).join(" ")}...
</p> <p id="fullDescription" class="hidden overflow-x-hidden text-pretty leading-relaxed" data-astro-cid-qw433bsx> ${novel.description} </p> <button id="toggleDescription" class="mt-2 text-skin-accent hover:underline" data-astro-cid-qw433bsx>
Read more
</button> </div> </div> </div> <div class="rounded-lg bg-skin-card p-4 shadow-md sm:p-6" data-astro-cid-qw433bsx> <h2 class="mb-4 text-xl font-semibold text-skin-base sm:text-2xl" data-astro-cid-qw433bsx>
Chapters
</h2> <div class="h-[500px] overflow-y-auto sm:h-96" data-astro-cid-qw433bsx> <ul class="space-y-2" data-astro-cid-qw433bsx> ${chapters.map(
    (chapter) => renderTemplate`<li class="w-full" data-astro-cid-qw433bsx> <a${addAttribute(`/novel/${id}/chapter/${chapter.Number}/`, "href")} class="block rounded-md p-1 py-2 transition duration-150 ease-in-out hover:bg-skin-accent sm:p-3" data-astro-cid-qw433bsx> <span class="text-sm text-skin-base opacity-80 sm:text-base" data-astro-cid-qw433bsx> ${chapter.translated_title} </span> </a> <div class="pt-2 sm:px-3" data-astro-cid-qw433bsx> ${renderComponent($$result2, "Hr", $$Hr, { "noPadding": true, "data-astro-cid-qw433bsx": true })} </div> </li>`
  )} </ul> </div> </div> </div> </div> ` })}  `;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/novel/[id]/index.astro", void 0);
const $$file = "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/novel/[id]/index.astro";
const $$url = "/novel/[id]/";

export { $$Index as default, $$file as file, $$url as url };
