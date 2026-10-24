"use client";

import React from "react";
import type { LanguageMode } from "../types/curriculum";

// Shared English / Hindi switch. The app's dark pages use the default pill
// style; light pages pass their own group class (for example "ak-lang").
export default function LanguageToggle({
  lang,
  onChange,
  className
}: {
  lang: LanguageMode;
  onChange: (next: LanguageMode) => void;
  className?: string;
}) {
  const pill = (active: boolean) => (className ? undefined : `control-pill ${active ? "active" : ""}`);
  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className={className}
      style={className ? undefined : { display: "inline-flex", gap: "0.4rem" }}
    >
      <button type="button" lang="en" className={pill(lang === "en")} aria-pressed={lang === "en"} onClick={() => onChange("en")}>
        English
      </button>
      <button type="button" lang="hi" className={pill(lang === "hi")} aria-pressed={lang === "hi"} onClick={() => onChange("hi")}>
        हिंदी
      </button>
    </div>
  );
}
