/* empty css                         */
import { p as createAstro, k as createComponent, l as renderTemplate, n as maybeRenderHead, t as spreadAttributes, s as addAttribute, m as renderComponent, u as unescapeHTML, F as Fragment } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import { $ as $$Footer } from './Footer_0UX-Omiu.mjs';
import { $ as $$Header, a as $$Layout } from './Header_WfgkCO_a.mjs';
import { $ as $$Image } from './_astro_assets_CoDYjaa7.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';
import { $ as $$Main } from './Main_t9ZBGa5e.mjs';
import { $ as $$LinkButton } from './LinkButton_B2Dh1wFB.mjs';
/* empty css                         */

const icons = {"local":{"prefix":"local","lastModified":1722780988,"icons":{"book":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"4\"><path fill=\"currentColor\" d=\"M8 40V10c0-3.314 2.865-6 6.4-6H40v32H14.4c-5.038 0-6.4.684-6.4 4Z\"/><path stroke-linecap=\"round\" d=\"M12 44h28v-8H12a4 4 0 0 0 0 8\" clip-rule=\"evenodd\"/></g>","width":48,"height":48}}}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$3 = createAstro("https://webtales-eight.vercel.app");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$2 = createAstro("https://webtales-eight.vercel.app");
const $$NovelCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NovelCard;
  const novels = Array.isArray(Astro2.props.novels) ? Astro2.props.novels : [];
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6"> ${novels.map((novel) => renderTemplate`<a${addAttribute(`/novel/${novel.ID}/`, "href")} class="relative block overflow-hidden rounded-xl bg-skin-card shadow-lg transition-all duration-300 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"> <div class="flex flex-col sm:flex-row"> ${novel.thumbnail && renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "h-48 w-full min-w-48 object-contain sm:h-auto sm:w-48", "src": novel.thumbnail, "alt": novel.title, "width": 200, "height": 200 })}`} <div class="flex flex-grow flex-col justify-between p-4"> <div class="flex-grow"> <h2 class="mb-2 font-bold text-skin-base sm:text-xl"> ${novel.title} </h2> <div class="relative"> <p class="line-clamp-3 text-sm text-skin-base sm:line-clamp-4"> ${novel.description} </p> </div> </div> ${novel.status.status === "in_progress" ? renderTemplate`<p class="text-xs max-sm:pt-4">Translation Status: In Progress</p>` : null} <p class="items-center text-xs text-skin-base opacity-80 max-sm:pt-4 sm:pb-2"> ${renderComponent($$result, "Icon", $$Icon, { "name": "book", "class": "size-5" })} ${novel.total_chapters_count}${" "}
Chapters
</p> <p class="text-sm text-skin-base opacity-80 sm:mt-auto">
Author: ${novel.author} </p> </div> </div> </a>`)} </div>`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/components/NovelCard.astro", void 0);

const $$Astro$1 = createAstro("https://webtales-eight.vercel.app");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, prevUrl, nextUrl } = Astro2.props;
  const prev = currentPage > 1 ? "" : "disabled";
  const next = currentPage < totalPages ? "" : "disabled";
  const isPrevDisabled = prev === "disabled";
  const isNextDisabled = next === "disabled";
  return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead()}<nav class="pagination-wrapper" aria-label="Pagination" data-astro-cid-d776pwuy>${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": isPrevDisabled, "href": prevUrl, "className": `mr-4 flex select-none items-center justify-center ${prev}`, "ariaLabel": "Previous", "data-astro-cid-d776pwuy": true }, { "default": ($$result2) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg"${addAttribute([{ "disabled-svg": isPrevDisabled }], "class:list")} data-astro-cid-d776pwuy><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" data-astro-cid-d776pwuy></path></svg>
Prev
` })}<p class="sm:hidden" data-astro-cid-d776pwuy>${currentPage} / ${totalPages}</p><div class="page-numbers" data-astro-cid-d776pwuy>${Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => renderTemplate`<a${addAttribute(`?page=${page}`, "href")}${addAttribute(`page-number ${currentPage === page ? "current" : ""}`, "class")} data-astro-cid-d776pwuy>${page}</a>`)}</div>${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": isNextDisabled, "href": nextUrl, "className": `ml-4 flex select-none items-center justify-center ${next}`, "ariaLabel": "Next", "data-astro-cid-d776pwuy": true }, { "default": ($$result2) => renderTemplate`
Next
<svg xmlns="http://www.w3.org/2000/svg"${addAttribute([{ "disabled-svg": isNextDisabled }], "class:list")} data-astro-cid-d776pwuy><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" data-astro-cid-d776pwuy></path></svg>` })}</nav>`}`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/components/Pagination.astro", void 0);

const $$Astro = createAstro("https://webtales-eight.vercel.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const API_URL = "http://128.199.208.160:8080";
  const currentPage = parseInt(Astro2.url.searchParams.get("page") || "1");
  const limit = 15;
  async function fetchNovels(page, limit2) {
    const response = await fetch(`${API_URL}/novels?page=${page}&limit=${limit2}`);
    return response.json();
  }
  const { novels, totalPages } = await fetchNovels(currentPage, limit);
  for (const novel of novels) {
    const status = await fetchNovelStatus(novel);
    novel.status = status;
  }
  async function fetchNovelStatus(novel) {
    const response = await fetch(`${API_URL}/novels/chapters-stats/${novel.ID}`);
    const status = await response.json();
    return status;
  }
  const prevUrl = currentPage > 1 ? `?page=${currentPage - 1}` : "";
  const nextUrl = currentPage < totalPages ? `?page=${currentPage + 1}` : "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "novels" })} ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mt-4 border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"> <p class="font-bold">Work in Progress</p> <p>
Note: This site is currently under development and may contain errors or
        inconsistencies between novels.
</p> </div> <div class="flex flex-col py-8"> ${renderComponent($$result3, "NovelCard", $$NovelCard, { "novels": novels })} </div> ${renderComponent($$result3, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "prevUrl": prevUrl, "nextUrl": nextUrl })} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/index.astro", void 0);
const $$file = "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
