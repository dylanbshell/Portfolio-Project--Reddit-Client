/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom breakpoint
      screens: {
        'xs': '360px',
      },
      // Colors from design tokens
      colors: {
        'bg-primary': '#3b2b26',
        'bg-dark': '#171212',
        'bg-transparent': 'transparent',
        'text-primary': '#ffffff',
        'text-secondary': '#baa39c',
        'border-primary': '#54403b',
        'border-accent': '#e5e8eb',
      },
      // Background gradients
      backgroundImage: {
        'gradient-image-card': 'linear-gradient(130deg, #171212 55.96%, #413333 116.73%)',
        'gradient-text-card': 'linear-gradient(154deg, #413333 -83.09%, #171212 57.07%)',
      },
      // Font families
      fontFamily: {
        'primary': ['Spline Sans', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      // Font sizes
      fontSize: {
        'xs': '13px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '22px',
      },
      // Font weights
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'bold': '700',
      },
      // Line heights
      lineHeight: {
        'tight': '20px',
        'base': '21px',
        'relaxed': '23px',
        'loose': '24px',
        'xl': '28px',
      },
      // Spacing (gaps and padding)
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'base': '16px',
        'lg': '32px',
        'xl': '36px',
        'xxl': '77px',
        'padding-xs': '6px',
        'padding-sm': '8px',
        'padding-md': '12px',
        'padding-sort': '13px',
        'padding-base': '16px',
        'padding-lg': '19px',
        'padding-xl': '50px',
        'padding-xxl': '68px',
      },
      // Gap values
      gap: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'base': '16px',
        'lg': '32px',
        'xl': '36px',
        'xxl': '77px',
      },
      // Border radius
      borderRadius: {
        'sm': '8px',
        'base': '15px',
        'lg': '20px',
        'md': '21px',
        'pill': '45px',
      },
      // Border width
      borderWidth: {
        'thin': '1px',
        'thick': '3px',
      },
      // Box shadows
      boxShadow: {
        'soft': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      // Component-specific heights
      height: {
        'nav': '65px',
        'nav-compact': '48px',
      },
      // Component-specific widths
      width: {
        'sidebar': '320px',
        'main-feed': '908px',
      },
      // Max widths
      maxWidth: {
        'container': '1280px',
        'modal': '960px',
      },
    },
  },
  plugins: [],
}
