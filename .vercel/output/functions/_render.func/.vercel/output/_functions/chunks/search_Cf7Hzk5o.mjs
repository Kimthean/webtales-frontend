/* empty css                         */
import { k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead } from './astro/server_BWQdw0gc.mjs';
import 'kleur/colors';
import { $ as $$Header, a as $$Layout } from './Header_WfgkCO_a.mjs';
import { $ as $$Footer } from './Footer_0UX-Omiu.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useRef, useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { $ as $$Main } from './Main_t9ZBGa5e.mjs';

const NovelCard = ({ novel }) => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: `/novel/${novel.ID}/`,
      className: "relative block overflow-hidden rounded-xl bg-skin-card shadow-lg transition-all duration-300 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]",
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row", children: [
        novel.thumbnail && /* @__PURE__ */ jsx(
          "img",
          {
            className: "h-48 w-full min-w-48 object-contain sm:h-auto sm:w-48",
            src: novel.thumbnail,
            alt: novel.title,
            width: 200,
            height: 200
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col justify-between p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-2 font-bold text-skin-base sm:text-xl", children: novel.title }),
            /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-3 text-sm text-skin-base sm:line-clamp-4", children: novel.description }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "items-center text-xs text-skin-base opacity-80 max-sm:pt-4 sm:pb-2", children: [
            novel.total_chapters_count,
            " Chapters"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-skin-base opacity-80 sm:mt-auto", children: [
            "Author: ",
            novel.author
          ] })
        ] })
      ] })
    }
  );
};

function SearchBar({ NovelList }) {
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState(
    null
  );
  const handleChange = (e) => {
    setInputVal(e.currentTarget.value);
  };
  const fuse = useMemo(
    () => new Fuse(NovelList, {
      keys: ["title"],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.5
    }),
    [NovelList]
  );
  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);
    setTimeout(function() {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = searchStr?.length || 0;
      }
    }, 50);
  }, []);
  useEffect(() => {
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("label", { className: "relative block", children: [
      /* @__PURE__ */ jsxs("span", { className: "absolute inset-y-0 left-0 flex items-center pl-2 opacity-75", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" }) }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "block w-full rounded border border-skin-fill border-opacity-40 bg-skin-fill py-3 pl-10 pr-3 placeholder:italic placeholder:text-opacity-75 focus:border-skin-accent focus:outline-none",
          placeholder: "Search for anything...",
          type: "text",
          name: "search",
          value: inputVal,
          onChange: handleChange,
          autoComplete: "off",
          ref: inputRef
        }
      )
    ] }),
    inputVal.length > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      "Found ",
      searchResults?.length,
      searchResults?.length && searchResults?.length === 1 ? " result" : " results",
      " ",
      "for '",
      inputVal,
      "'"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 pt-4 max-sm:px-4", children: searchResults?.map(({ item: novel }) => /* @__PURE__ */ jsx(NovelCard, { novel }, novel.ID)) })
  ] });
}

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const API_URL = "http://128.199.208.160:8080";
  async function fetchNovels() {
    return await fetch(`${API_URL}/novels/all`).then((res) => res.json());
  }
  const novels = await fetchNovels();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Search | Webtales" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "search" })} ${maybeRenderHead()}<div class="pt-4 sm:pt-10"> ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Search", "pageDesc": "Search for novels..." }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SearchBar", SearchBar, { "client:load": true, "NovelList": novels, "client:component-hydration": "load", "client:component-path": "@components/Search.tsx", "client:component-export": "default" })} ` })} </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/search.astro", void 0);
const $$file = "/Users/thean/Desktop/Coding/webtales-frontend/src/pages/search.astro";
const $$url = "/search/";

export { $$Search as default, $$file as file, $$url as url };
