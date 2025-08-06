/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      mob: { max: "639px" }, // applies to screens less than 640px
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      "2xl": { min: "1536px" },
    },
    extend: {
      // ✅ Font Families
      fontFamily: {
        heading: ['"Archivo"', "sans-serif"], // Usage: class="font-sans"
        sans: ['"Onest"', "sans-serif"], // Usage: class="font-heading"
        mono: ['"Fira Code"', "monospace"], // Usage: class="font-mono"
      },

      // ✅ Font Weights
      fontWeight: {
        regular: "400", // Usage: class="font-regular"
        medium: "500", // Usage: class="font-medium"
        semibold: "600", // Usage: class="font-semibold"
        bold: "700", // Usage: class="font-bold"
      },

      // ✅ Letter Spacing
      letterSpacing: {
        tightest: "-0.02em", // ~-0.5px @25px – Usage: class="tracking-tightest"
        tighter: "-0.01em", // ~-0.25px @25px – Usage: class="tracking-tighter"
      },

      // ✅ Font Sizes
      fontSize: {
        "text-xs": ["0.75rem", { lineHeight: "1rem" }], // 12px – Usage: class="text-xs"
        "text-sm": ["0.875rem", { lineHeight: "1.25rem" }], // 14px – Usage: class="text-sm"
        "text-base": ["1rem", { lineHeight: "1.5rem" }], // 16px – Usage: class="text-base"
        "text-lg": ["1.125rem", { lineHeight: "1.75rem" }], // 18px – Usage: class="text-lg"
        "text-xl": ["1.25rem", { lineHeight: "1.75rem" }], // 20px – Usage: class="text-xl"
        "text-2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px – Usage: class="text-2xl"
        "text-3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px – Usage: class="text-3xl"
        "text-4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px – Usage: class="text-4xl"
        "text-5xl": ["3rem", { lineHeight: "1" }], // 48px – Usage: class="text-5xl"
        "text-6xl": ["3.75rem", { lineHeight: "1" }], // 60px – Usage: class="text-6xl"
        "text-7xl": ["4.5rem", { lineHeight: "1" }], // 72px – Usage: class="text-7xl"
        "text-8xl": ["6rem", { lineHeight: "1" }], // 96px – Usage: class="text-8xl"
        "text-9xl": ["8rem", { lineHeight: "1" }], // 128px – Usage: class="text-9xl"

        // ✅ Custom Display Sizes
        "display-xs": [
          "1.5rem", // 24px
          {
            lineHeight: "2rem", // 32px
            letterSpacing: "-0.02em",
          },
        ], // Usage: class="text-display-xs"

        "display-sm": [
          "1.875rem", // 30px
          {
            lineHeight: "2.375rem", // 38px
            letterSpacing: "-0.02em",
          },
        ], // Usage: class="text-display-sm"

        "display-md": [
          "2rem", // 32px
          {
            lineHeight: "2.4375rem", // 39px
            letterSpacing: "-0.02em",
          },
        ], // Usage: class="text-display-md"

        "display-lg": [
          "2.25rem", // 36px
          {
            lineHeight: "2.75rem", // 44px
            letterSpacing: "-0.02em",
          },
        ], // Usage: class="text-display-lg"
      },

      // ✅ Colors (Custom palette)
      colors: {
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#161616",
        },
        cool: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D2D6DB",
          400: "#9DA4AE",
          500: "#6C737F",
          600: "#4D5761",
          700: "#384250",
          800: "#1F2A37",
          900: "#111927",
        },
        warm: {
          25: "#FDFDFC",
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D7D3D0",
          400: "#A9A29D",
          500: "#79716B",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#171412",
        },
        blue: {
          25: "#F5FAFF",
          50: "#EFF8FF",
          100: "#D1E9FF",
          200: "#B2DDFF",
          300: "#84CAFF",
          400: "#53B1FD",
          500: "#2E90FA",
          600: "#1570EF",
          700: "#175CD3",
          800: "#1849A9",
          900: "#194185",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
        },
        warning: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".btn-standard": {
          width: "151px",
          height: "48px",
          borderRadius: "2px",
          paddingTop: "12px",
          paddingRight: "32px",
          paddingBottom: "12px",
          paddingLeft: "32px",
        },
      });
    },
  ],
};
