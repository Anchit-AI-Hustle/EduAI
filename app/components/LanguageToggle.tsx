"use client";

import React from "react";
import type { LanguageMode } from "../types/curriculum";

export default function LanguageToggle({
  lang,
  onChange
}: {
  lang: LanguageMode;
  onChange: (next: LanguageMode) => void;
}) {
  return (
    <div role="group" aria-label="Language / भाषा" style={{ display: "inline-flex", gap: "0.4rem" }}>
      <button
        type="button"
        lang="en"
        className={`control-pill ${lang === "en" ? "active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => onChange("en")}
      >
        English
      </button>
      <button
        type="button"
        lang="hi"
        className={`control-pill ${lang === "hi" ? "active" : ""}`}
        aria-pressed={lang === "hi"}
        onClick={() => onChange("hi")}
      >
        हिंदी
      </button>
    </div>
  );
}
