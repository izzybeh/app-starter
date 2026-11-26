import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

// Tailwind's built-in color names. Screens use theme colors instead
// (bg-primary, text-ink, text-muted, bg-surface…), so the theme stays consistent.
const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const RAW_COLOR = `(^|\\s|:)(bg|text|border|ring|outline|fill|stroke|from|to|via|divide|accent|caret|decoration|shadow)-((${PALETTE})-\\d{2,3}|\\[(#|rgb|hsl|oklch))`;
const themeColorMessage =
  "Use the theme's colors (like bg-primary, text-ink, text-muted, bg-surface, border-border) instead of fixed colors, so every screen matches the theme.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Full accessibility checks (the Next.js preset only turns on a few).
  { rules: jsxA11y.flatConfigs.recommended.rules },

  // Screens must use the shared building blocks (heuristic 4: consistency).
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: "JSXOpeningElement[name.name='button']", message: "Use <Button> from @/components/ui/button." },
        { selector: "JSXOpeningElement[name.name='input']", message: "Use <Input> or <Checkbox> from @/components/ui/inputs, inside <Field>." },
        { selector: "JSXOpeningElement[name.name='textarea']", message: "Use <Textarea> from @/components/ui/inputs, inside <Field>." },
        { selector: "JSXOpeningElement[name.name='select']", message: "Use <Select> from @/components/ui/inputs, inside <Field>." },
        { selector: `Literal[value=/${RAW_COLOR}/]`, message: themeColorMessage },
        { selector: `TemplateElement[value.raw=/${RAW_COLOR}/]`, message: themeColorMessage },
      ],
      "no-restricted-globals": [
        "error",
        { name: "alert", message: "Use notify from @/lib/notify instead of pop-up alerts." },
        { name: "confirm", message: "Use <ConfirmDialog> from @/components/ui/dialog instead." },
      ],
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: `Literal[value=/${RAW_COLOR}/]`, message: themeColorMessage },
        { selector: `TemplateElement[value.raw=/${RAW_COLOR}/]`, message: themeColorMessage },
      ],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".usability-tmp/**", "playwright-report/**", "test-results/**"]),
]);

export default eslintConfig;
