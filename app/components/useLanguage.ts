"use client";

import { useCallback, useEffect, useState } from "react";
import type { LanguageMode } from "../types/curriculum";

// One language choice shared by every page. Priority: ?lang= in the URL (so a
// link can open straight in Hindi), then the saved choice, then English.
// A ?lang= value is also saved, so it sticks when the reader clicks through to
// other pages. Server render is always English so hydration matches; the
// chosen language applies right after mount.
const STORAGE_KEY = "everyyear-lang";

const isLang = (v: unknown): v is LanguageMode => v === "en" || v === "hi";

function save(lang: LanguageMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage blocked (private mode): the choice still applies for this page view.
  }
}

export function useLanguage(): [LanguageMode, (next: LanguageMode) => void] {
  const [lang, setLangState] = useState<LanguageMode>("en");

  useEffect(() => {
    let initial: LanguageMode | null = null;
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (isLang(fromUrl)) {
        initial = fromUrl;
        save(fromUrl);
      }
    } catch {
      // URL unavailable: fall through to the saved choice.
    }
    if (!initial) {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (isLang(saved)) initial = saved;
      } catch {
        // Storage blocked: stay on English.
      }
    }
    if (initial) setLangState(initial);

    // Keep other open tabs in step with a change made here.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && isLang(e.newValue)) setLangState(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: LanguageMode) => {
    setLangState(next);
    save(next);
    // If the page was opened with ?lang=, keep the URL in step so a reload or
    // a copied link shows what the reader now sees.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", next);
        window.history.replaceState(window.history.state, "", url);
      }
    } catch {
      // History API unavailable: the saved choice still applies.
    }
  }, []);

  return [lang, setLang];
}
