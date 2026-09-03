module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        raleway: ["Raleway"],
        major: ["Major Mono Display"],
        headline: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
        mono: [
          "Source Code Pro",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        // Cinema Mode — exact tokens from Stitch "Inicio Modo Cine"
        primary: "#8b5cf6",
        "primary-dim": "#7c3aed",
        "primary-container": "#a78bfa",
        "primary-fixed": "#ae8dff",
        secondary: "#94a3b8",
        tertiary: "#ff6f7e",
        "tertiary-container": "#fc4563",
        // surfaces
        background: "#0f172a",
        surface: "#0f172a",
        "surface-dim": "#060e20",
        "surface-bright": "#1f2b49",
        "surface-container": "#1e293b",
        "surface-container-low": "#091328",
        "surface-container-lowest": "#000000",
        "surface-container-high": "#141f38",
        "surface-container-highest": "#192540",
        "surface-variant": "#1e293b",
        // text
        "on-surface": "#e2e8f0",
        "on-surface-variant": "#cbd5e1",
        "on-background": "#e2e8f0",
        "on-primary": "#ffffff",
        "on-secondary": "#4c5259",
        // borders/outlines
        outline: "#334155",
        "outline-variant": "#40485d",
        // legacy aliases (kept for compatibility)
        "deep-navy": "#0f172a",
        "brand-dark": "#0f172a",
        success: "#15be53",
        ruby: "#f43f5e",
        magenta: "#f43f5e",
        grayBorder: "#334155",
      },
      boxShadow: {
        "card-soft":
          "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(139,92,246,0.25)",
        "glow-violet": "0 0 0 3px rgba(139,92,246,0.25)",
      },
      zIndex: {
        "-1": "-1",
        "-2": "-2",
      },
      animation: {
        "pulse-10": "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      minWidth: {
        160: "160px",
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      translate: ["group-hover"],
      opacity: ["group-focus", "disabled"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};