(() => {
  const $ = (sel) => document.querySelector(sel);
  const html = document.documentElement;

  const ICONS = {
    sun: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    `,
    moon: `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    `,
  };

  function updateThemeIcon(isDark) {
    const slot = $("#themeIcon") || $("#toggleTheme");
    if (!slot) return;
    slot.innerHTML = isDark ? ICONS.moon : ICONS.sun;
  }

  function systemPrefersDark() {
    return !!window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  }

  /**
   * Theme mode:
   * - "dark"  => force dark
   * - "light" => force light
   * - "auto"  => follow OS preference
   */
  function applyPageTheme(mode = "auto") {
    const m = String(mode || "auto").toLowerCase();
    const isDark = (m === "dark") || (m === "auto" && systemPrefersDark());
    html.classList.toggle("dark", isDark);
    updateThemeIcon(isDark);
    return isDark;
  }

  function getStoredTheme() {
    const v = localStorage.getItem("theme");
    if (v === "dark" || v === "light") return v;
    return "auto";
  }

  function setStoredTheme(mode) {
    const m = String(mode || "auto").toLowerCase();
    if (m === "auto") localStorage.removeItem("theme");
    else localStorage.setItem("theme", m);
    return m;
  }

  applyPageTheme(getStoredTheme());

  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (mq?.addEventListener) {
    mq.addEventListener("change", () => {
      if (getStoredTheme() === "auto") applyPageTheme("auto");
    });
  }

  $("#toggleTheme")?.addEventListener("click", () => {
    const current = getStoredTheme();
    const next = current === "dark" ? "light" : current === "light" ? "auto" : "dark";
    setStoredTheme(next);
    const isDark = applyPageTheme(next);

    if (window.FToast?.setTheme) {
      FToast.setTheme(next);
    } else if (window.FToast?.applyTheme) {
      FToast.applyTheme();
    }
  });

  function readConfigFromUI() {
    const getVal = (sel, def) => ($(sel) ? $(sel).value : def);
    const getNum = (sel, def) => ($(sel) ? Number($(sel).value) : def);
    const getChk = (sel) => ($(sel) ? $(sel).checked : true);

    const theme = getVal("#theme", null);
    const themeStorageType = getVal("#themeStorageType", null);
    const themeStorageKey = getVal("#themeStorageKey", null);

    const cfg = {
      position: getVal("#position", "top-right"),
      duration: getNum("#duration", 4200),
      maxToasts: getNum("#maxToasts", 5),
      newestOnTop: getChk("#newestOnTop"),
      showProgress: getChk("#showProgress"),
      pauseOnHover: getChk("#pauseOnHover"),
      closeOnClick: getChk("#closeOnClick"),
      preventDuplicates: getChk("#preventDuplicates"),
      duplicateWindowMs: getNum("#dupeMs", 1200),

      lang: getVal("#lang", "auto"),
      storage: {
        type: getVal("#storageType", "none"),
        key: getVal("#storageKey", "site_lang"),
      },
    };

    if (theme) cfg.theme = theme;
    if (themeStorageType || themeStorageKey) {
      cfg.themeStorage = {
        type: themeStorageType || "none",
        key: themeStorageKey || "site_theme",
      };
    }

    return cfg;
  }

  function applyConfig() {
    if (!window.FToast) {
      console.error("FToast not loaded. Check script path.");
      return;
    }
    const cfg = readConfigFromUI();
    FToast.config(cfg);

    if (cfg?.lang && cfg.lang !== "auto") FToast.setLang(cfg.lang);

    if (cfg?.theme && window.FToast?.setTheme) {
      FToast.setTheme(cfg.theme);
    } else if (window.FToast?.applyTheme) {
      FToast.applyTheme();
    }

    return cfg;
  }

  applyConfig();

  const inputs = [
    "#position", "#duration", "#maxToasts", "#newestOnTop",
    "#showProgress", "#pauseOnHover", "#closeOnClick",
    "#preventDuplicates", "#dupeMs", "#lang", "#storageType", "#storageKey",
    "#theme", "#themeStorageType", "#themeStorageKey",
  ];
  inputs.forEach((sel) => $(sel)?.addEventListener("change", applyConfig));

  FToast.addTranslations("hu", {
    "title.success": "Siker",
    "title.info": "Infó",
    "title.warning": "Figyelem",
    "title.error": "Hiba",
    "dialog.ok": "Rendben",
    "dialog.cancel": "Mégse",
    "close.aria": "Bezárás",
  });

  FToast.addTranslations("en", {
    "title.success": "Success",
    "title.info": "Info",
    "title.warning": "Warning",
    "title.error": "Error",
    "dialog.ok": "OK",
    "dialog.cancel": "Cancel",
    "close.aria": "Close",
  });

  $("#applyLang")?.addEventListener("click", () => {
    const cfg = applyConfig();
    if (cfg?.lang && cfg.lang !== "auto") FToast.setLang(cfg.lang);
    FToast.success(`Language set to: ${String(FToast.getLang()).toUpperCase()}`, { title: "System" });
  });

  $("#showLang")?.addEventListener("click", () => {
    FToast.info(`Current language: ${FToast.getLang()}`, { title: "System" });
  });

  $("#btnSuccess")?.addEventListener("click", () => {
    applyConfig();
    FToast.success("Operation completed successfully.");
  });

  $("#btnInfo")?.addEventListener("click", () => {
    applyConfig();
    FToast.info("This is a general information message.");
  });

  $("#btnWarn")?.addEventListener("click", () => {
    applyConfig();
    FToast.warning("Connection is unstable, please wait.");
  });

  $("#btnError")?.addEventListener("click", () => {
    applyConfig();
    FToast.error("Critical error occurred while saving.");
  });

  $("#btnActions")?.addEventListener("click", () => {
    applyConfig();
    FToast.info("Update available. Install now?", {
      duration: 0,
      title: "System Update",
      actions: [
        {
          text: "Install",
          variant: "info",
          onClick: () => FToast.success("Installation started..."),
        },
        {
          text: "Later",
          variant: "outline",
          onClick: () => FToast.info("Reminder set"),
        },
      ],
    });
  });

  $("#btnSticky")?.addEventListener("click", () => {
    applyConfig();
    FToast.warning("This message will not disappear automatically.", {
      duration: 0,
      closeOnClick: false,
      title: "Sticky Mode",
      actions: [{ text: "Got it", variant: "warning" }],
    });
  });

  $("#btnSpam")?.addEventListener("click", () => {
    applyConfig();
    for (let i = 0; i < 5; i++) {
      FToast.info("Filtering duplicate messages...", { title: "Dedupe" });
    }
  });

  $("#btnAlert")?.addEventListener("click", async () => {
    applyConfig();
    await FToast.alert("The system is currently under maintenance.", {
      title: "Maintenance",
      okText: "Acknowledge",
    });
  });

  $("#btnConfirm")?.addEventListener("click", async () => {
    applyConfig();
    const ok = await FToast.confirm("Are you sure you want to delete this item?", {
      title: "Confirm Deletion",
      type: "warning",
      okText: "Yes, delete",
      okVariant: "danger",
      cancelText: "Cancel",
    });
    if (ok) FToast.success("Item deleted.");
    else FToast.info("Deletion cancelled.");
  });

  $("#btnPrompt")?.addEventListener("click", async () => {
    applyConfig();
    const name = await FToast.prompt("Please enter the project name:", {
      title: "New Project",
      placeholder: "e.g. My Awesome App",
    });
    if (name) FToast.success(`Created: ${name}`);
  });

  $("#presetGlass")?.addEventListener("click", () => {
    FToast.setClasses({
      toastBase: [
        "pointer-events-auto w-[min(400px,calc(100vw-2rem))]",
        "rounded-lg border shadow-lg overflow-hidden mb-3",
        "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
        "border-zinc-200/50 dark:border-zinc-700/50",
        "text-zinc-900 dark:text-zinc-100",
        "transition-all duration-300 ease-out transform",
      ].join(" "),
      title: "font-bold text-sm text-zinc-900 dark:text-zinc-100",
      message: "text-xs text-zinc-600 dark:text-zinc-400 mt-1",
    });
    FToast.success("Glass preset applied", { title: "Theme" });
  });

  $("#presetSolid")?.addEventListener("click", () => {
    FToast.setClasses({
      toastBase: [
        "pointer-events-auto w-[min(400px,calc(100vw-2rem))]",
        "rounded-lg border shadow-sm overflow-hidden mb-3",
        "bg-white dark:bg-zinc-900",
        "border-zinc-200 dark:border-zinc-800",
        "text-zinc-900 dark:text-zinc-100",
        "transition-all duration-200",
      ].join(" "),
      title: "font-bold text-sm text-zinc-900 dark:text-zinc-100",
      message: "text-sm text-zinc-600 dark:text-zinc-400 mt-0.5",
    });
    FToast.info("Solid preset applied", { title: "Theme" });
  });

  $("#presetReset")?.addEventListener("click", () => {
    if (window.location.reload) window.location.reload();
  });
})();