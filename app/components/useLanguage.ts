"use client";

import { useCallback, useEffect, useState } from "react";
import type { LanguageMode } from "../types/curriculum";

// One language choice shared by every page. Priority: ?lang= in the URL (so a
// link can open straight in Hindi), then the saved choice, then English.
// Server render is always English so hydration matches; the saved choice
// applies right after mount.
const STORAGE_KEY = "everyyear-lang";

const isLang = (v: unknown): v is LanguageMode => v === "en" || v === "hi";

export function useLanguage(): [LanguageMode, (next: LanguageMode) => void] {
  const [lang, setLangState] = useState<LanguageMode>("en");

  useEffect(() => {
    let initial: LanguageMode | null = null;
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (isLang(fromUrl)) initial = fromUrl;
    } catch {
      // URL unavailable: fall through to the saved choice.
    }
    if (!initial) {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (isLang(saved)) initial = saved;
      } catch {
        // Storage blocked (private mode): stay on English.
      }
    }
    if (initial) setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: LanguageMode) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice still applies for this page view.
    }
  }, []);

  return [lang, setLang];
}
