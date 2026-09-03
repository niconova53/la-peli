module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        raleway: ["Raleway"],
        major: ["Major Mono Display"],
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
        primary: "#533afd",
        "deep-navy": "#061b31",
        "brand-dark": "#1c1e54",
        "shadow-blue": "rgba(50,50,93,0.25)",
        "shadow-black": "rgba(0,0,0,0.1)",
        success: "#15be53",
        ruby: "#ea2261",
        magenta: "#f96bee",
        grayBorder: "#e5edf5",
      },
      boxShadow: {
        "stripe-standard":
          "0 30px 45px -30px var(--shadow-blue), 0 18px 36px -18px var(--shadow-black)",
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