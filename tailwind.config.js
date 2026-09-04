module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
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
        // Cinema Noir palette (from Stitch "La Peli v2" design system)
        primary: "#8b5cf6",
        "primary-hover": "#7c3aed",
        "primary-container": "#a078ff",
        "primary-fixed": "#e9ddff",
        secondary: "#94a3b8",
        tertiary: "#f43f5e",
        background: "#0f172a",
        surface: "#0b1326",
        "surface-card": "#1e293b",
        "surface-bright": "#31394d",
        "surface-dim": "#0b1326",
        "surface-variant": "#2d3449",
        "surface-container": "#171f33",
        "surface-container-low": "#131b2e",
        "surface-container-lowest": "#060e20",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "text-primary": "#e2e8f0",
        "text-secondary": "#94a3b8",
        "border-subtle": "#334155",
        outline: "#958ea0",
        "outline-variant": "#494454",
        // legacy aliases (kept for any remaining references)
        "deep-navy": "#0f172a",
        "brand-dark": "#0f172a",
        success: "#15be53",
        ruby: "#f43f5e",
        magenta: "#f43f5e",
        grayBorder: "#334155",
      },
      boxShadow: {
        "card-soft": "0 1px 3px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 30px rgba(139, 92, 246, 0.15)",
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