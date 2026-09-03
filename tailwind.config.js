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
        primary: "#7c3aed",
        "primary-dim": "#6d28d9",
        secondary: "#0f172a",
        tertiary: "#f43f5e",
        // lavender-tinted surfaces
        surface: "#f7f5ff",
        "surface-dim": "#d4d3e4",
        "surface-bright": "#f7f5ff",
        "surface-container": "#e8e7f5",
        "surface-container-low": "#f1effc",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#2d2e37",
        "on-surface-variant": "#5b5b64",
        outline: "#767680",
        "outline-variant": "#adacb7",
        // legacy aliases (kept for compatibility)
        "deep-navy": "#0f172a",
        "brand-dark": "#0f172a",
        success: "#15be53",
        ruby: "#f43f5e",
        magenta: "#f43f5e",
        grayBorder: "#e5edf5",
      },
      boxShadow: {
        "card-soft":
          "0 1px 3px rgba(16,24,40,0.06), 0 8px 24px -12px rgba(124,58,237,0.18)",
        "glow-violet": "0 0 0 3px rgba(124,58,237,0.15)",
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