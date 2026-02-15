/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./client/index.html",
        "./client/src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
             animation: {
        'bounce': 'bounce 1s infinite',
      },
            colors: {
                 cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
                /* Libertas Alpha custom colors */
                primary: {
                    DEFAULT: "#8236FD",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#0E0741",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#ABABB9",
                    foreground: "#000000",
                },
                accent: {
                    DEFAULT: "#8236FD",
                    foreground: "#FFFFFF",
                },
                background: "#FFFFFF",
                foreground: "#000000",
                card: {
                    DEFAULT: "#F5F5F7",
                    foreground: "#000000",
                },
                popover: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#000000",
                },
                border: "#ABABB9",
                input: "#F5F5F7",
                ring: "#8236FD",
                chart: {
                    1: "#8236FD",
                    2: "#0E0741",
                    3: "#ABABB9",
                    4: "#8236FD",
                    5: "#0E0741",
                },
                sidebar: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#000000",
                    primary: "#8236FD",
                    "primary-foreground": "#FFFFFF",
                    accent: "#8236FD",
                    "accent-foreground": "#FFFFFF",
                    border: "#ABABB9",
                    ring: "#8236FD",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
