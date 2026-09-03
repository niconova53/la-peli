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
        primary: "#8b5cf6",
        "primary-dim": "#7c3aed",
        secondary: "#e2e8f0",
        tertiary: "#f43f5e",
        // cinema dark surfaces
        surface: "#0f172a",
        "surface-dim": "#0b1120",
        "surface-bright": "#1e293b",
        "surface-container": "#1e293b",
        "surface-container-low": "#16213a",
        "surface-container-lowest": "#0b1120",
        "on-surface": "#e2e8f0",
        "on-surface-variant": "#94a3b8",
        outline: "#334155",
        "outline-variant": "#1e293b",
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