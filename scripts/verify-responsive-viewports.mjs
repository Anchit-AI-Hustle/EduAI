import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const VIEWPORTS = [
  { width: 390, height: 844, label: "390px-mobile" },
  { width: 820, height: 1180, label: "820px-tablet" },
  { width: 1440, height: 900, label: "1440px-desktop" }
];

function loadBuiltHtml(relativePath) {
  const htmlPath = path.join(ROOT, ".next/server/app", relativePath);
  const cssPath = path.join(ROOT, "app/globals.css");
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing prerendered build artifact at ${htmlPath}. Run 'next build' first.`);
  }
  const rawHtml = fs.readFileSync(htmlPath, "utf8");
  const css = fs.readFileSync(cssPath, "utf8");
  return { rawHtml: rawHtml.replace("</head>", `<style>${css}</style></head>`), css };
}

function findExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    "/opt/pw-browsers/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return undefined;
}

async function run() {
  const pagesToTest = [
    {
      file: "index.html",
      name: "Workspace Home (/)",
      headingMatch: "EveryYear",
      requiredMarkers: [
        "EveryYear",
        "16/16",
        "59",
        "26",
        "1. Year, Week &amp; Day Planner",
        "2. Adaptive Diagnostic",
        "3. Middle Stage Deep Dive",
        "4. Daily Lesson Loop",
        "5. Mock Exam Engine",
        "6. Competitive &amp; Global Tracks",
        "7. Self-Evolving Engine (L1-L5)",
        "8. Parent View &amp; Legal Risks",
        "9. Venture Thesis &amp; 6 Q&amp;A",
        "हिन्दी"
      ]
    },
    {
      file: "justification.html",
      name: "Venture Justification (/justification)",
      headingMatch: "Venture Justification",
      requiredMarkers: [
        "Venture Justification",
        "Reality Check",
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
        "Question 6",
        "Venture Brand Names",
        "about 20 lakh",
        "INR 199 or 499 / month"
      ]
    },
    {
      file: "pariksha-saathi.html",
      name: "Pariksha Saathi (/pariksha-saathi)",
      headingMatch: "Pariksha Saathi",
      requiredMarkers: [
        "Pariksha Saathi",
        "Independent pitch, not affiliated with Amar Ujala",
        "~54 lakh",
        "छात्र अनुभव",
        "Revenue model",
        "Why it fits Amar Ujala"
      ]
    }
  ];

  const executablePath = findExecutable();
  let browserLaunched = false;

  try {
    const browser = await chromium.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {})
    });
    browserLaunched = true;

    for (const testTarget of pagesToTest) {
      const { rawHtml, css } = loadBuiltHtml(testTarget.file);
      const normalizedHtml = rawHtml.replace(/<!--\s*-->/g, "");

      for (const marker of testTarget.requiredMarkers) {
        if (!normalizedHtml.includes(marker)) {
          throw new Error(`${testTarget.name} missing required UI marker: ${marker}`);
        }
      }

      for (const vp of VIEWPORTS) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];

        page.on("console", (msg) => {
          if (msg.type() === "error" && !msg.text().includes("ERR_FILE_NOT_FOUND")) {
            consoleErrors.push(msg.text());
          }
        });
        page.on("pageerror", (err) => {
          pageErrors.push(err.message);
        });

        await page.setContent(rawHtml, { waitUntil: "domcontentloaded" });

        const heading = await page.locator("h1").textContent();
        if (!heading || !heading.includes(testTarget.headingMatch)) {
          throw new Error(`${testTarget.name}: Missing expected heading (${testTarget.headingMatch}) at viewport ${vp.label}`);
        }

        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth + 2;
        });
        if (overflow) {
          throw new Error(`${testTarget.name}: Horizontal overflow detected at viewport ${vp.label}`);
        }
        if (consoleErrors.length > 0 || pageErrors.length > 0) {
          throw new Error(
            `${testTarget.name}: Console/Page errors at ${vp.label}: ${JSON.stringify({ consoleErrors, pageErrors })}`
          );
        }

        console.log(
          `${testTarget.name} @ ${vp.label} (${vp.width}x${vp.height}): PASS (0 console errors, 0 page errors, 0 overflow)`
        );
        await context.close();
      }
    }

    await browser.close();
  } catch (err) {
    if (!browserLaunched && !executablePath) {
      // No browser binary found: still verify the prerendered markers, but report
      // the viewport checks as skipped rather than passed. A binary that exists
      // but fails to launch falls through and fails the run.
      for (const testTarget of pagesToTest) {
        const { rawHtml } = loadBuiltHtml(testTarget.file);
        const normalizedHtml = rawHtml.replace(/<!--\s*-->/g, "");
        for (const marker of testTarget.requiredMarkers) {
          if (!normalizedHtml.includes(marker)) {
            throw new Error(`${testTarget.name} missing required UI marker: ${marker}`);
          }
        }
        console.log(
          `${testTarget.name}: markers PASS; viewport checks SKIPPED (no Chromium found, set CHROME_PATH)`
        );
      }
    } else {
      throw err;
    }
  }
}

run().catch((err) => {
  console.error("Viewport verification failed:", err);
  process.exit(1);
});
