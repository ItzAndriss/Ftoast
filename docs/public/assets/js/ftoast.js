(() => {
  const esc = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const normLang = (l) => String(l || "").toLowerCase().split("-")[0].trim();
  const normTheme = (t) => String(t || "").toLowerCase().trim();

  const deepMerge = (target, src) => {
    if (!src || typeof src !== "object") return target;
    for (const k of Object.keys(src)) {
      const v = src[k];
      if (v && typeof v === "object" && !Array.isArray(v)) {
        target[k] = deepMerge({ ...(target[k] || {}) }, v);
      } else {
        target[k] = v;
      }
    }
    return target;
  };

  const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

  const ICONS = {
    success: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M5 13l4 4L19 7"/>
      </svg>
    `,
    info: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    `,
    warning: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    `,
    error: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    `,
    close: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M5 13l4 4L19 7"/>
      </svg>
    `,
  };

  const DEFAULTS = {
    position: "top-right",
    duration: 4200,
    maxToasts: 5,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnHover: true,
    showProgress: true,
    preventDuplicates: true,
    duplicateWindowMs: 1200,
    storage: { type: "local", key: "site_lang" },
    lang: "auto",
    fallbackLang: "en",
    themeStorage: { type: "local", key: "site_theme" },
    theme: "auto",

    i18n: {
      hu: {
        "title.success": "Siker",
        "title.info": "Infó",
        "title.warning": "Figyelmeztetés",
        "title.error": "Hiba",
        "action.default": "Megnyitás",
        "close.aria": "Bezárás",
        "dialog.ok": "OK",
        "dialog.cancel": "Mégse",
        "dialog.yes": "Igen",
        "dialog.no": "Nem",
        "prompt.placeholder": "",
      },
      en: {
        "title.success": "Success",
        "title.info": "Info",
        "title.warning": "Warning",
        "title.error": "Error",
        "action.default": "Open",
        "close.aria": "Close",
        "dialog.ok": "OK",
        "dialog.cancel": "Cancel",
        "dialog.yes": "Yes",
        "dialog.no": "No",
        "prompt.placeholder": "",
      },
    },

    positions: {
      "top-right": "top-4 right-4 items-end",
      "top-left": "top-4 left-4 items-start",
      "bottom-right": "bottom-4 right-4 items-end",
      "bottom-left": "bottom-4 left-4 items-start",
      "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
    },

    classes: {
      wrapBase: "fixed z-[9999] flex flex-col gap-3 pointer-events-none",
      toastBase: [
        "pointer-events-auto w-[min(420px,calc(100vw-2rem))]",
        "rounded-2xl border shadow-2xl overflow-hidden",
        "bg-white/95 backdrop-blur dark:bg-dark-800/95",
        "border-gray-200 dark:border-dark-700",
        "opacity-0 translate-y-2 transition-all duration-200 ease-out",
        "ring-1",
      ].join(" "),

      modalWrap: "fixed inset-0 z-[10000] flex items-center justify-center p-4",
      modalBackdrop: "absolute inset-0 bg-black/60",
      modalCard: [
        "relative pointer-events-auto w-full max-w-lg",
        "rounded-2xl border shadow-2xl overflow-hidden",
        "bg-white dark:bg-dark-800",
        "border-gray-200 dark:border-dark-700",
      ].join(" "),
      modalHeader:
        "p-4 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800/50",
      modalBody: "p-4",
      modalTitle: "font-extrabold text-gray-900 dark:text-white",
      modalText: "mt-1 text-sm text-gray-600 dark:text-gray-300",
      modalFooter: "p-4 pt-0 flex flex-wrap justify-end gap-2",

      body: "p-4",
      row: "flex items-start gap-3",
      iconBoxBase: "w-10 h-10 rounded-xl border flex items-center justify-center",
      content: "min-w-0 flex-1",
      title: "font-extrabold text-sm text-gray-900 dark:text-white leading-5",
      message: "mt-0.5 text-sm text-gray-600 dark:text-gray-300 leading-5 break-words",

      closeBtn:
        "w-9 h-9 rounded-xl grid place-items-center " +
        "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white " +
        "bg-gray-100/0 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors",

      btnBase:
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-colors",
      btn: {
        neutral:
          "bg-gray-100 hover:bg-gray-200 dark:bg-dark-700 dark:hover:bg-dark-600 border-gray-200 dark:border-dark-700 text-gray-800 dark:text-gray-100",
        outline:
          "bg-transparent hover:bg-gray-100 dark:hover:bg-dark-700 border-gray-200 dark:border-dark-700 text-gray-800 dark:text-gray-100",
        info: "bg-blurple-500 hover:bg-blurple-600 border-blurple-500/30 text-white",
        success: "bg-emerald-500 hover:bg-emerald-600 border-emerald-500/30 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 border-yellow-500/30 text-white",
        danger: "bg-red-500 hover:bg-red-600 border-red-500/30 text-white",
      },

      progressTrack: "h-1 bg-gray-200 dark:bg-dark-700",
      progressBarBase: "h-full w-full origin-left",

      in: "opacity-100 translate-y-0",
      out: "opacity-0 translate-y-2",
    },

    types: {
      success: {
        iconHtml: ICONS.success,
        iconBox: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
        ring: "ring-emerald-500/20",
        progress: "bg-emerald-500",
        titleKey: "title.success",
      },
      info: {
        iconHtml: ICONS.info,
        iconBox: "bg-blurple-500/10 border-blurple-500/20 text-blurple-500",
        ring: "ring-blurple-500/20",
        progress: "bg-blurple-500",
        titleKey: "title.info",
      },
      warning: {
        iconHtml: ICONS.warning,
        iconBox: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
        ring: "ring-yellow-500/20",
        progress: "bg-yellow-500",
        titleKey: "title.warning",
      },
      error: {
        iconHtml: ICONS.error,
        iconBox: "bg-red-500/10 border-red-500/20 text-red-500",
        ring: "ring-red-500/20",
        progress: "bg-red-500",
        titleKey: "title.error",
      },
    },

    template: null,

    hooks: {
      onShow: null,
      onClose: null,
      onClick: null,
      onAction: null,
    },
  };

  function getStore(opt) {
    const t = (opt.storage?.type || "local").toLowerCase();
    if (t === "session") return window.sessionStorage;
    if (t === "local") return window.localStorage;
    return null;
  }
  function getLang(opt) {
    if (opt.lang && opt.lang !== "auto") return normLang(opt.lang);

    const store = getStore(opt);
    const key = opt.storage?.key || "site_lang";
    const stored = store ? store.getItem(key) : null;
    if (stored) return normLang(stored);

    const htmlLang = document.documentElement?.getAttribute("lang");
    if (htmlLang) return normLang(htmlLang);

    return normLang(navigator.language || opt.fallbackLang || "en");
  }
  function setLang(opt, code) {
    const l = normLang(code);
    const store = getStore(opt);
    const key = opt.storage?.key || "site_lang";
    if (store) store.setItem(key, l);
    opt.lang = l;
    return l;
  }

  function getThemeStore(opt) {
    const t = (opt.themeStorage?.type || "local").toLowerCase();
    if (t === "session") return window.sessionStorage;
    if (t === "local") return window.localStorage;
    return null;
  }

  function prefersDark() {
    return !!window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  }

  function getTheme(opt) {
    if (opt.theme && opt.theme !== "auto") return normTheme(opt.theme);
    const store = getThemeStore(opt);
    const key = opt.themeStorage?.key || "site_theme";
    const stored = store ? store.getItem(key) : null;
    if (stored) return normTheme(stored);

    return prefersDark() ? "dark" : "light";
  }

  function setTheme(opt, theme) {
    const tval = normTheme(theme);
    const store = getThemeStore(opt);
    const key = opt.themeStorage?.key || "site_theme";

    if (store) {
      if (tval === "auto") store.removeItem(key);
      else store.setItem(key, tval);
    }

    opt.theme = tval;
    return tval;
  }

  function applyTheme(opt) {
    const theme = getTheme(opt);
    const root = document.documentElement;
    if (!root) return theme;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    return theme;
  }

  function t(opt, key, vars = null) {
    const lang = getLang(opt);
    const dict = opt.i18n?.[lang] || opt.i18n?.[opt.fallbackLang] || {};
    let out = dict[key] ?? opt.i18n?.[opt.fallbackLang]?.[key] ?? key;
    if (vars && typeof vars === "object") {
      for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
    }
    return out;
  }

  function ensureWrap(opt, position) {
    const posCls = opt.positions?.[position] || opt.positions?.["top-right"] || "";
    const key = `ftw-${position}`;
    let wrap = document.querySelector(`[data-ftwrap="${key}"]`);
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.dataset.ftwrap = key;
      wrap.className = `${opt.classes.wrapBase} ${posCls}`;
      document.body.appendChild(wrap);
    } else {
      wrap.className = `${opt.classes.wrapBase} ${posCls}`;
    }
    return wrap;
  }

  let OPT =
    typeof structuredClone === "function"
      ? structuredClone(DEFAULTS)
      : JSON.parse(JSON.stringify(DEFAULTS));
  applyTheme(OPT);

  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (mq?.addEventListener) {
    mq.addEventListener("change", () => {
      const store = getThemeStore(OPT);
      const key = OPT.themeStorage?.key || "site_theme";
      const hasStored = !!(store && store.getItem(key));
      if ((OPT.theme || "auto") === "auto" && !hasStored) applyTheme(OPT);
    });
  }

  let lastKey = null;
  let lastAt = 0;

  function btnClass(classes, variant) {
    const base = classes.btnBase || "";
    const v = (variant || "neutral").toLowerCase();
    const add = classes.btn?.[v] || classes.btn?.neutral || "";
    return `${base} ${add}`.trim();
  }

  function renderDefault(ctx) {
    const { classes, typeCfg } = ctx;
    const closeAria = esc(ctx.t("close.aria"));

    const iconHtml = typeCfg.iconHtml || "";
    const actions = Array.isArray(ctx.opt.actions) ? ctx.opt.actions : [];

    const actionsHtml = actions.length
      ? `
        <div class="mt-3 flex flex-wrap gap-2">
          ${actions
            .map((a, i) => {
              const text = esc(a?.text ?? ctx.t("action.default"));
              const cls = a?.className ? a.className : btnClass(classes, a?.variant);
              const aIcon = a?.iconHtml ? a.iconHtml : "";
              return `<button type="button" data-ftaction="${i}" class="${cls}">
                        ${aIcon ? `<span class="inline-flex">${aIcon}</span>` : ``}
                        <span>${text}</span>
                      </button>`;
            })
            .join("")}
        </div>
      `
      : "";

    return `
      <div class="${classes.body}">
        <div class="${classes.row}">
          <div class="${classes.iconBoxBase} ${typeCfg.iconBox}">
            ${iconHtml}
          </div>

          <div class="${classes.content}">
            <div class="${classes.title}">${esc(ctx.title)}</div>
            <div class="${classes.message}">${esc(ctx.message)}</div>
            ${actionsHtml}
          </div>

          <button type="button" data-ftclose aria-label="${closeAria}" class="${classes.closeBtn}">
            ${ICONS.close}
          </button>
        </div>
      </div>

      ${
        ctx.opt.showProgress && ctx.opt.duration > 0
          ? `
        <div class="${classes.progressTrack}">
          <div data-ftbar class="${classes.progressBarBase} ${typeCfg.progress || ""}"></div>
        </div>
      `
          : ``
      }
    `;
  }

  function makeToast(type, message, options = {}) {
    applyTheme(OPT);

    const opt = deepMerge(deepMerge({}, OPT), options);
    const typeCfg = deepMerge(deepMerge({}, opt.types?.[type] || opt.types.info), options.typeCfg || {});
    const classes = deepMerge(deepMerge({}, opt.classes), options.classes || {});

    const title = options.title ?? opt.title ?? t(opt, typeCfg.titleKey || `title.${type}`);
    const msg = message ?? "";

    const dupeKey = `${type}:${title}:${msg}`;
    const now = Date.now();
    if (opt.preventDuplicates) {
      if (dupeKey === lastKey && now - lastAt < opt.duplicateWindowMs) return null;
      lastKey = dupeKey;
      lastAt = now;
    }

    const wrap = ensureWrap(opt, opt.position);

    const existing = Array.from(wrap.querySelectorAll("[data-ftoast]"));
    if (existing.length >= opt.maxToasts) {
      const victim = opt.newestOnTop ? existing[existing.length - 1] : existing[0];
      victim?.dispatchEvent(new CustomEvent("ft:kill"));
    }

    const id = uid();
    const el = document.createElement("div");
    el.dataset.ftoast = "1";
    el.dataset.ftid = id;
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");

    el.className = `${classes.toastBase} ${typeCfg.ring || ""} ${opt.toastClass || ""}`.trim();

    const ctx = {
      id,
      type,
      title,
      message: msg,
      opt,
      classes,
      typeCfg,
      t: (key, vars) => t(opt, key, vars),
      el,
      close: () => el.dispatchEvent(new CustomEvent("ft:kill")),
    };

    el.innerHTML = typeof opt.template === "function" ? opt.template(ctx) : renderDefault(ctx);

    if (opt.newestOnTop) wrap.prepend(el);
    else wrap.appendChild(el);

    requestAnimationFrame(() => el.classList.add(...classes.in.split(" ")));

    try { opt.hooks?.onShow?.(ctx); } catch {}

    let killed = false;
    let start = performance.now();
    let remaining = opt.duration;
    let raf = null;
    const bar = el.querySelector("[data-ftbar]");

    function kill(reason = "close") {
      if (killed) return;
      killed = true;
      if (raf) cancelAnimationFrame(raf);

      el.classList.remove(...classes.in.split(" "));
      el.classList.add(...classes.out.split(" "));

      setTimeout(() => el.remove(), 200);

      try { opt.hooks?.onClose?.({ ...ctx, reason }); } catch {}
    }

    function tick(tnow) {
      if (killed) return;
      const elapsed = tnow - start;
      const left = Math.max(0, remaining - elapsed);

      if (bar) {
        const ratio = opt.duration ? left / opt.duration : 0;
        bar.style.transform = `scaleX(${ratio})`;
      }

      if (left <= 0) return kill("timeout");
      raf = requestAnimationFrame(tick);
    }

    function pause() {
      if (!opt.duration || opt.duration <= 0 || !raf) return;
      cancelAnimationFrame(raf);
      raf = null;
      remaining = Math.max(0, remaining - (performance.now() - start));
    }

    function resume() {
      if (!opt.duration || opt.duration <= 0 || raf) return;
      start = performance.now();
      raf = requestAnimationFrame(tick);
    }

    el.addEventListener("ft:kill", () => kill("manual"));

    el.querySelector("[data-ftclose]")?.addEventListener("click", (e) => {
      e.stopPropagation();
      kill("close_btn");
    });

    el.querySelectorAll("[data-ftaction]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute("data-ftaction"));
        const actions = Array.isArray(opt.actions) ? opt.actions : [];
        const a = actions[idx];

        try {
          a?.onClick?.(ctx);
          opt.hooks?.onAction?.({ ...ctx, action: a, actionIndex: idx }, e);
        } catch {}

        const shouldClose = (a?.close !== false) && (opt.closeOnAction !== false);
        if (shouldClose) kill("action");
      });
    });

    if (opt.closeOnClick) {
      el.addEventListener("click", (e) => {
        try { opt.hooks?.onClick?.(ctx, e); } catch {}
        kill("click");
      });
    }

    if (opt.pauseOnHover && opt.duration > 0) {
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
    }

    if (opt.duration > 0) raf = requestAnimationFrame(tick);

    return { id, el, close: () => kill("api") };
  }

  function closeModal(modalEl) {
    modalEl?.remove?.();
  }

  function createModalShell(opt, { type = "info", title, message }) {
    applyTheme(opt);

    const classes = opt.classes;
    const typeCfg = opt.types?.[type] || opt.types.info;

    const root = document.createElement("div");
    root.className = classes.modalWrap;
    root.dataset.ftmodal = "1";

    root.innerHTML = `
      <div class="${classes.modalBackdrop}" data-ftmodal-backdrop></div>
      <div class="${classes.modalCard}">
        <div class="${classes.modalHeader}">
          <div class="flex items-center gap-3">
            <div class="${classes.iconBoxBase} ${typeCfg.iconBox}">
              ${typeCfg.iconHtml || ""}
            </div>

            <div class="min-w-0">
              <div class="${classes.modalTitle}">${esc(title)}</div>
              <div class="${classes.modalText}">${esc(message)}</div>
            </div>

            <button class="ml-auto ${classes.closeBtn}" data-ftmodal-close aria-label="${esc(t(opt, "close.aria"))}">
              ${ICONS.close}
            </button>
          </div>
        </div>

        <div class="${classes.modalBody}" data-ftmodal-body></div>
        <div class="${classes.modalFooter}" data-ftmodal-footer></div>
      </div>
    `;

    document.body.appendChild(root);
    return root;
  }

  window.FToast = {
    config(newDefaults = {}) {
      OPT = deepMerge(OPT, newDefaults);
      applyTheme(OPT);
      return OPT;
    },
    setLang(code) { return setLang(OPT, code); },
    getLang() { return getLang(OPT); },
    setTheme(theme) {
      const tval = setTheme(OPT, theme);
      applyTheme(OPT);
      return tval;
    },
    getTheme() { return getTheme(OPT); },
    applyTheme() { return applyTheme(OPT); },
    addTranslations(lang, map) {
      const l = normLang(lang);
      OPT.i18n[l] = { ...(OPT.i18n[l] || {}), ...(map || {}) };
    },
    setType(type, cfg) { OPT.types[type] = deepMerge(OPT.types[type] || {}, cfg || {}); },
    setClasses(map) { OPT.classes = deepMerge(OPT.classes || {}, map || {}); },
    setTemplate(fn) { OPT.template = fn; },
    show(type, message, opts) { return makeToast(type, message, opts); },
    success(message, opts) { return makeToast("success", message, opts); },
    info(message, opts) { return makeToast("info", message, opts); },
    warning(message, opts) { return makeToast("warning", message, opts); },
    error(message, opts) { return makeToast("error", message, opts); },
    alert(message, opts = {}) {
      const opt = deepMerge(deepMerge({}, OPT), opts);
      const type = opts.type || "info";
      const typeCfg = opt.types?.[type] || opt.types.info;

      const title = opts.title ?? t(opt, typeCfg.titleKey || `title.${type}`);
      const okText = opts.okText || t(opt, "dialog.ok");
      const okVariant =
        opts.okVariant || (type === "error" ? "danger" : type === "warning" ? "warning" : type);

      return new Promise((resolve) => {
        const modal = createModalShell(opt, { type, title, message });

        const footer = modal.querySelector("[data-ftmodal-footer]");
        const closeBtn = modal.querySelector("[data-ftmodal-close]");
        const backdrop = modal.querySelector("[data-ftmodal-backdrop]");

        const okBtn = document.createElement("button");
        okBtn.className = `${opt.classes.btnBase} ${(opt.classes.btn?.[okVariant] || opt.classes.btn.info)}`;
        okBtn.innerHTML = `${ICONS.check} <span>${esc(okText)}</span>`;
        footer.appendChild(okBtn);

        const done = () => {
          closeModal(modal);
          resolve(true);
        };

        okBtn.addEventListener("click", done);
        closeBtn.addEventListener("click", done);
        backdrop.addEventListener("click", done);

        window.addEventListener("keydown", (e) => { if (e.key === "Escape") done(); }, { once: true });
      });
    },

    confirm(message, opts = {}) {
      const opt = deepMerge(deepMerge({}, OPT), opts);
      const type = opts.type || "warning";
      const typeCfg = opt.types?.[type] || opt.types.warning || opt.types.info;

      const title = opts.title ?? t(opt, typeCfg.titleKey || `title.${type}`);
      const okText = opts.okText || t(opt, "dialog.yes");
      const cancelText = opts.cancelText || t(opt, "dialog.cancel");

      const okVariant = opts.okVariant || "danger";
      const cancelVariant = opts.cancelVariant || "outline";

      return new Promise((resolve) => {
        let decided = false;
        const modal = createModalShell(opt, { type, title, message });

        const footer = modal.querySelector("[data-ftmodal-footer]");
        const closeBtn = modal.querySelector("[data-ftmodal-close]");
        const backdrop = modal.querySelector("[data-ftmodal-backdrop]");

        const cancelBtn = document.createElement("button");
        cancelBtn.className = `${opt.classes.btnBase} ${(opt.classes.btn?.[cancelVariant] || opt.classes.btn.outline)}`;
        cancelBtn.innerHTML = `<span>${esc(cancelText)}</span>`;

        const okBtn = document.createElement("button");
        okBtn.className = `${opt.classes.btnBase} ${(opt.classes.btn?.[okVariant] || opt.classes.btn.danger)}`;
        okBtn.innerHTML = `${ICONS.check} <span>${esc(okText)}</span>`;

        footer.appendChild(cancelBtn);
        footer.appendChild(okBtn);

        const finish = (v) => {
          decided = true;
          closeModal(modal);
          resolve(v);
        };

        cancelBtn.addEventListener("click", () => finish(false));
        okBtn.addEventListener("click", () => finish(true));

        const cancelLike = () => { if (!decided) finish(false); };
        closeBtn.addEventListener("click", cancelLike);
        backdrop.addEventListener("click", cancelLike);

        window.addEventListener("keydown", (e) => { if (e.key === "Escape") cancelLike(); }, { once: true });
      });
    },

    prompt(message, opts = {}) {
      const opt = deepMerge(deepMerge({}, OPT), opts);
      const type = opts.type || "info";
      const typeCfg = opt.types?.[type] || opt.types.info;

      const title = opts.title ?? t(opt, typeCfg.titleKey || `title.${type}`);
      const okText = opts.okText || t(opt, "dialog.ok");
      const cancelText = opts.cancelText || t(opt, "dialog.cancel");

      const okVariant = opts.okVariant || "info";
      const cancelVariant = opts.cancelVariant || "outline";

      const placeholder = opts.placeholder ?? t(opt, "prompt.placeholder");
      const initialValue = opts.initialValue ?? "";

      return new Promise((resolve) => {
        let decided = false;
        const modal = createModalShell(opt, { type, title, message });

        const body = modal.querySelector("[data-ftmodal-body]");
        const footer = modal.querySelector("[data-ftmodal-footer]");
        const closeBtn = modal.querySelector("[data-ftmodal-close]");
        const backdrop = modal.querySelector("[data-ftmodal-backdrop]");

        const inputId = `ftinp-${uid()}`;
        body.innerHTML = `
          <input id="${inputId}" value="${esc(initialValue)}" placeholder="${esc(placeholder)}"
            class="w-full px-3 py-2 rounded-xl
                   bg-gray-100 dark:bg-dark-700
                   border border-gray-200 dark:border-dark-700
                   outline-none focus:border-blurple-500
                   text-sm text-gray-900 dark:text-gray-100" />
        `;

        const cancelBtn = document.createElement("button");
        cancelBtn.className = `${opt.classes.btnBase} ${(opt.classes.btn?.[cancelVariant] || opt.classes.btn.outline)}`;
        cancelBtn.innerHTML = `<span>${esc(cancelText)}</span>`;

        const okBtn = document.createElement("button");
        okBtn.className = `${opt.classes.btnBase} ${(opt.classes.btn?.[okVariant] || opt.classes.btn.info)}`;
        okBtn.innerHTML = `${ICONS.check} <span>${esc(okText)}</span>`;

        footer.appendChild(cancelBtn);
        footer.appendChild(okBtn);

        const inp = () => document.getElementById(inputId);

        const finish = (v) => {
          decided = true;
          closeModal(modal);
          resolve(v);
        };

        cancelBtn.addEventListener("click", () => finish(null));
        okBtn.addEventListener("click", () => finish(inp()?.value ?? ""));

        setTimeout(() => {
          const el = inp();
          el?.focus();
          el?.addEventListener("keydown", (e) => {
            if (e.key === "Enter") finish(el.value ?? "");
          });
        }, 0);

        const cancelLike = () => { if (!decided) finish(null); };
        closeBtn.addEventListener("click", cancelLike);
        backdrop.addEventListener("click", cancelLike);

        window.addEventListener("keydown", (e) => { if (e.key === "Escape") cancelLike(); }, { once: true });
      });
    },

    enableDialogHijack({ alert = true, confirm = true, prompt = true } = {}) {
      if (alert) window.alert = (msg) => { this.alert(String(msg)); };
      if (confirm) window.confirm = (msg) => { return this.confirm(String(msg)); };
      if (prompt) window.prompt = async (msg, def = "") => {
        const v = await this.prompt(String(msg), { initialValue: String(def ?? "") });
        return v;
      };
    },

    clear(position = null) {
      const wraps = position ? [ensureWrap(OPT, position)] : Array.from(document.querySelectorAll("[data-ftwrap]"));
      wraps.forEach((w) =>
        w.querySelectorAll("[data-ftoast]").forEach((t) => t.dispatchEvent(new CustomEvent("ft:kill")))
      );
    },
  };
})();
