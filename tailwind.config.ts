import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		colors: {
			black: '#000000',
			charcoal: '#000019',
			dimgray: '#555555',
			lightgray: '#CCCCCC',
			white: '#FFFFFF',
			ash: '#B0B0B0',
			silver: '#D3D3D3',

		  },

  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
