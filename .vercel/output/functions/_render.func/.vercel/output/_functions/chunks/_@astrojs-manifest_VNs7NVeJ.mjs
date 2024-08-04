import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './astro/server_BWQdw0gc.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BldDT0Hc.js"}],"styles":[{"type":"external","src":"/_astro/index.Bxdi6Cnz.css"},{"type":"external","src":"/_astro/index.DZP4Uz86.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BldDT0Hc.js"}],"styles":[{"type":"external","src":"/_astro/index.Bxdi6Cnz.css"},{"type":"external","src":"/_astro/index.DZP4Uz86.css"},{"type":"inline","content":":root{--font-size: 16px;--font-family: \"IBM Plex Mono\", monospace}.chapter-content{font-size:var(--font-size);font-family:var(--font-family)}\n"}],"routeData":{"route":"/novel/[id]/chapter/[number]","isIndex":true,"type":"page","pattern":"^\\/novel\\/([^/]+?)\\/chapter\\/([^/]+?)\\/$","segments":[[{"content":"novel","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"chapter","dynamic":false,"spread":false}],[{"content":"number","dynamic":true,"spread":false}]],"params":["id","number"],"component":"src/pages/novel/[id]/chapter/[number]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CkT1aTmw.js"}],"styles":[{"type":"external","src":"/_astro/index.Bxdi6Cnz.css"},{"type":"external","src":"/_astro/index.DZP4Uz86.css"},{"type":"inline","content":".overflow-y-auto[data-astro-cid-qw433bsx]::-webkit-scrollbar{width:6px}.overflow-y-auto[data-astro-cid-qw433bsx]::-webkit-scrollbar-track{background:var(--color-fill)}.overflow-y-auto[data-astro-cid-qw433bsx]::-webkit-scrollbar-thumb{background-color:var(--color-accent);border-radius:20px}@media (min-width: 640px){.overflow-y-auto[data-astro-cid-qw433bsx]::-webkit-scrollbar{width:8px}}\n"}],"routeData":{"route":"/novel/[id]","isIndex":true,"type":"page","pattern":"^\\/novel\\/([^/]+?)\\/$","segments":[[{"content":"novel","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/novel/[id]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BldDT0Hc.js"}],"styles":[{"type":"external","src":"/_astro/index.Bxdi6Cnz.css"},{"type":"external","src":"/_astro/index.DZP4Uz86.css"},{"type":"inline","content":"#main-content[data-astro-cid-hsp6otuf]{margin-left:auto;margin-right:auto;width:100%;max-width:48rem;padding-left:1rem;padding-right:1rem;padding-bottom:1rem}#main-content[data-astro-cid-hsp6otuf] h1[data-astro-cid-hsp6otuf]{font-size:1.5rem;line-height:2rem;font-weight:600}@media (min-width: 640px){#main-content[data-astro-cid-hsp6otuf] h1[data-astro-cid-hsp6otuf]{font-size:1.875rem;line-height:2.25rem}}#main-content[data-astro-cid-hsp6otuf] p[data-astro-cid-hsp6otuf]{margin-bottom:1.5rem;margin-top:.5rem;font-style:italic}.title-char[data-astro-cid-hsp6otuf]{display:inline-block;opacity:0;transform:translateY(20px);transition:opacity .3s ease,transform .3s ease}.title-char[data-astro-cid-hsp6otuf]:hover{opacity:1;transform:translateY(0)}\n"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BldDT0Hc.js"}],"styles":[{"type":"external","src":"/_astro/index.Bxdi6Cnz.css"},{"type":"external","src":"/_astro/index.DZP4Uz86.css"},{"type":"inline","content":"#main-content[data-astro-cid-hsp6otuf]{margin-left:auto;margin-right:auto;width:100%;max-width:48rem;padding-left:1rem;padding-right:1rem;padding-bottom:1rem}#main-content[data-astro-cid-hsp6otuf] h1[data-astro-cid-hsp6otuf]{font-size:1.5rem;line-height:2rem;font-weight:600}@media (min-width: 640px){#main-content[data-astro-cid-hsp6otuf] h1[data-astro-cid-hsp6otuf]{font-size:1.875rem;line-height:2.25rem}}#main-content[data-astro-cid-hsp6otuf] p[data-astro-cid-hsp6otuf]{margin-bottom:1.5rem;margin-top:.5rem;font-style:italic}.title-char[data-astro-cid-hsp6otuf]{display:inline-block;opacity:0;transform:translateY(20px);transition:opacity .3s ease,transform .3s ease}.title-char[data-astro-cid-hsp6otuf]:hover{opacity:1;transform:translateY(0)}\n.pagination-wrapper[data-astro-cid-d776pwuy]{margin-bottom:2rem;margin-top:auto;display:flex;align-items:center;justify-content:center}.disabled[data-astro-cid-d776pwuy]{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:.5}.disabled[data-astro-cid-d776pwuy]:hover{--tw-text-opacity: 1;color:rgba(var(--color-text-base),var(--tw-text-opacity))}.group[data-astro-cid-d776pwuy]:hover .disabled[data-astro-cid-d776pwuy]{fill:rgb(var(--color-text-base))}.group[data-astro-cid-d776pwuy]:hover .disabled-svg[data-astro-cid-d776pwuy]{fill:rgb(var(--color-text-base))!important}.page-numbers[data-astro-cid-d776pwuy]{display:flex}.page-numbers[data-astro-cid-d776pwuy]>:not([hidden])[data-astro-cid-d776pwuy]~:not([hidden])[data-astro-cid-d776pwuy]{--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.page-number[data-astro-cid-d776pwuy]{border-radius:.25rem;padding:.25rem .75rem}.page-number[data-astro-cid-d776pwuy].current{--tw-bg-opacity: 1;background-color:rgba(var(--color-accent),var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgba(var(--color-fill),var(--tw-text-opacity))}@media (max-width: 640px){.page-numbers[data-astro-cid-d776pwuy]{display:none}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}}],"site":"https://webtales-eight.vercel.app","base":"/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["/Users/thean/Desktop/Coding/webtales-frontend/src/pages/novel/[id]/chapter/[number]/index.astro",{"propagation":"none","containsHead":true}],["/Users/thean/Desktop/Coding/webtales-frontend/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/thean/Desktop/Coding/webtales-frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/thean/Desktop/Coding/webtales-frontend/src/pages/novel/[id]/index.astro",{"propagation":"none","containsHead":true}],["/Users/thean/Desktop/Coding/webtales-frontend/src/pages/search.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/novel/[id]/chapter/[number]/index@_@astro":"pages/novel/_id_/chapter/_number_.astro.mjs","\u0000@astro-page:src/pages/novel/[id]/index@_@astro":"pages/novel/_id_.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/thean/Desktop/Coding/webtales-frontend/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/Users/thean/Desktop/Coding/webtales-frontend/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_BJ1as01v.mjs","/src/pages/404.astro":"chunks/404_E5AlcLSC.mjs","/src/pages/novel/[id]/chapter/[number]/index.astro":"chunks/index_BpFjcSlW.mjs","/src/pages/novel/[id]/index.astro":"chunks/index_BtY9Tq44.mjs","/src/pages/search.astro":"chunks/search_Cf7Hzk5o.mjs","/src/pages/index.astro":"chunks/index_CU8xXdDr.mjs","\u0000@astrojs-manifest":"manifest_CCRgdNu5.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CkT1aTmw.js","/astro/hoisted.js?q=1":"_astro/hoisted.BldDT0Hc.js","@components/Search.tsx":"_astro/Search.BDiaLv09.js","@astrojs/react/client.js":"_astro/client.BIGLHmRd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.Bxdi6Cnz.css","/_astro/index.DZP4Uz86.css","/favicon.svg","/noise.jpeg","/toggle-theme.js","/_astro/Search.BDiaLv09.js","/_astro/client.BIGLHmRd.js","/_astro/hoisted.BldDT0Hc.js","/_astro/hoisted.CkT1aTmw.js","/_astro/index.DhYZZe0J.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
