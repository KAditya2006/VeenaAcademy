/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#08265c",
          hover: "#061f4c",
          light: "#eaf3ff",
        },
        secondary: "#112f6a",
        accent: {
          DEFAULT: "#ff7a1a",
          hover: "#f26507",
          light: "#fff0e5",
        },
        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",
        info: "#2563eb",
        background: "#ffffff",
        surface: "#f7fbff",
        card: "#ffffff",
        border: "#dbe7f7",
        divider: "#e7eef8",
        overlay: "rgba(6, 26, 63, 0.56)",
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.78)",
          border: "rgba(8, 38, 92, 0.12)",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#64748b",
          inverse: "#ffffff",
        },
        academy: {
          blue: "#08265c",
          navy: "#061a3f",
          orange: "#ff7a1a",
          sky: "#eaf3ff",
          ink: "#0f172a",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #08265c 0%, #112f6a 58%, #061a3f 100%)",
        "gradient-secondary": "linear-gradient(135deg, #eaf3ff 0%, #ffffff 52%, #fff0e5 100%)",
        "hero-radial": "radial-gradient(circle at top right, rgba(255, 122, 26, 0.18), transparent 32%), radial-gradient(circle at top left, rgba(8, 38, 92, 0.12), transparent 30%)",
      },
      borderRadius: {
        tokenSm: "0.5rem",
        tokenMd: "0.75rem",
        tokenLg: "1rem",
        tokenXl: "1.5rem",
        token2xl: "2rem",
        tokenPill: "9999px",
        tokenCircle: "50%",
      },
      boxShadow: {
        level1: "0 8px 24px rgba(8, 38, 92, 0.08)",
        level2: "0 18px 48px rgba(8, 38, 92, 0.12)",
        level3: "0 24px 80px rgba(8, 38, 92, 0.14)",
        level4: "0 36px 110px rgba(8, 38, 92, 0.18)",
        glow: "0 18px 60px rgba(255, 122, 26, 0.22)",
        premium: "0 24px 80px rgba(8, 38, 92, 0.14)",
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionDuration: {
        fast: "160ms",
        normal: "280ms",
        slow: "520ms",
      },
    },
  },
  plugins: [],
};
