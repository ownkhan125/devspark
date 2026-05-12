/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B10",
          900: "#0B0B10",
          800: "#13121B",
          700: "#1A1822",
          600: "#26243A",
          500: "#3A3754",
        },
        bone: {
          DEFAULT: "#F4EFE6",
          50: "#FBF8F1",
          100: "#F4EFE6",
          200: "#E7DFD0",
          300: "#C9C0AE",
        },
        ember: {
          DEFAULT: "#FF5A1F",
          400: "#FF7A45",
          500: "#FF5A1F",
          600: "#E84A12",
        },
        iris: {
          DEFAULT: "#7C5CFF",
          400: "#9F86FF",
          500: "#7C5CFF",
          600: "#5E3CF0",
        },
        lime: {
          DEFAULT: "#C7FF3D",
          400: "#D9FF6E",
          500: "#C7FF3D",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: [
          "var(--font-inter-tight)",
          "var(--font-geist-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { transform: "translateX(-110%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shine: "shine 1.2s ease-out",
        float: "float 6s ease-in-out infinite",
        gradientShift: "gradientShift 8s ease infinite",
      },
    },
  },
  plugins: [],
};
