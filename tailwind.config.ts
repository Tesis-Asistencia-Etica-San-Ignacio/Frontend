import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					grey: {
						25: "hsl(var(--primary-grey-25))",
						50: "hsl(var(--primary-grey-50))",
						100: "hsl(var(--primary-grey-100))",
						200: "hsl(var(--primary-grey-200))",
						300: "hsl(var(--primary-grey-300))",
						400: "hsl(var(--primary-grey-400))",
						500: "hsl(var(--primary-grey-500))",
						600: "hsl(var(--primary-grey-600))",
						700: "hsl(var(--primary-grey-700))",
						800: "hsl(var(--primary-grey-800))",
						900: "hsl(var(--primary-grey-900))",
						1000: "hsl(var(--primary-grey-1000))",
						1100: "hsl(var(--primary-grey-1100))",
						1200: "hsl(var(--primary-grey-1200))",
						1300: "hsl(var(--primary-grey-1300))",
						1400: "hsl(var(--primary-grey-1400))",
						1500: "hsl(var(--primary-grey-1500))",
						1600: "hsl(var(--primary-grey-1600))",
						1700: "hsl(var(--primary-grey-1700))",
						1800: "hsl(var(--primary-grey-1800))",
						1900: "hsl(var(--primary-grey-1900))",
						2000: "hsl(var(--primary-grey-2000))",
						2100: "hsl(var(--primary-grey-2100))",
						2200: "hsl(var(--primary-grey-2200))",
					},
					green: {
						50: "hsl(var(--primary-green-50))",
						100: "hsl(var(--primary-green-100))",
						200: "hsl(var(--primary-green-200))",
						300: "hsl(var(--primary-green-300))",
						400: "hsl(var(--primary-green-400))",
						500: "hsl(var(--primary-green-500))",
						600: "hsl(var(--primary-green-600))",
						700: "hsl(var(--primary-green-700))",
						800: "hsl(var(--primary-green-800))",
						900: "hsl(var(--primary-green-900))",
						1000: "hsl(var(--primary-green-1000))",
						1100: "hsl(var(--primary-green-1100))",
						1200: "hsl(var(--primary-green-1200))",
						1300: "hsl(var(--primary-green-1300))",
						1400: "hsl(var(--primary-green-1400))",
						1500: "hsl(var(--primary-green-1500))",
						1600: "hsl(var(--primary-green-1600))",
						1700: "hsl(var(--primary-green-1700))",
						1800: "hsl(var(--primary-green-1800))",
						1900: "hsl(var(--primary-green-1900))",
						2000: "hsl(var(--primary-green-2000))",
						2100: "hsl(var(--primary-green-2100))",
						2200: "hsl(var(--primary-green-2200))",
						2300: "hsl(var(--primary-green-2300))",
					},
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
					orange: {
						50: "hsl(var(--secondary-orange-50))",
						100: "hsl(var(--secondary-orange-100))",
						200: "hsl(var(--secondary-orange-200))",
						300: "hsl(var(--secondary-orange-300))",
						400: "hsl(var(--secondary-orange-400))",
						500: "hsl(var(--secondary-orange-500))",
						600: "hsl(var(--secondary-orange-600))",
						700: "hsl(var(--secondary-orange-700))",
						800: "hsl(var(--secondary-orange-800))",
						900: "hsl(var(--secondary-orange-900))",
						1000: "hsl(var(--secondary-orange-1000))",
						1100: "hsl(var(--secondary-orange-1100))",
						1200: "hsl(var(--secondary-orange-1200))",
						1300: "hsl(var(--secondary-orange-1300))",
						1400: "hsl(var(--secondary-orange-1400))",
						1500: "hsl(var(--secondary-orange-1500))",
						1600: "hsl(var(--secondary-orange-1600))",
						1700: "hsl(var(--secondary-orange-1700))",
						1800: "hsl(var(--secondary-orange-1800))",
						1900: "hsl(var(--secondary-orange-1900))",
						2000: "hsl(var(--secondary-orange-2000))",
						2100: "hsl(var(--secondary-orange-2100))",
						2200: "hsl(var(--secondary-orange-2200))",
						2300: "hsl(var(--secondary-orange-2300))",
					},
					blue: {
						50: "hsl(var(--secondary-blue-50))",
						100: "hsl(var(--secondary-blue-100))",
						200: "hsl(var(--secondary-blue-200))",
						300: "hsl(var(--secondary-blue-300))",
						400: "hsl(var(--secondary-blue-400))",
						500: "hsl(var(--secondary-blue-500))",
						600: "hsl(var(--secondary-blue-600))",
						700: "hsl(var(--secondary-blue-700))",
						800: "hsl(var(--secondary-blue-800))",
						900: "hsl(var(--secondary-blue-900))",
						1000: "hsl(var(--secondary-blue-1000))",
						1100: "hsl(var(--secondary-blue-1100))",
						1200: "hsl(var(--secondary-blue-1200))",
						1300: "hsl(var(--secondary-blue-1300))",
						1400: "hsl(var(--secondary-blue-1400))",
						1500: "hsl(var(--secondary-blue-1500))",
						1600: "hsl(var(--secondary-blue-1600))",
						1700: "hsl(var(--secondary-blue-1700))",
						1800: "hsl(var(--secondary-blue-1800))",
						1900: "hsl(var(--secondary-blue-1900))",
						2000: "hsl(var(--secondary-blue-2000))",
						2100: "hsl(var(--secondary-blue-2100))",
						2200: "hsl(var(--secondary-blue-2200))",
						2300: "hsl(var(--secondary-blue-2300))",
					},
					violet: {
						50: "hsl(var(--secondary-violet-50))",
						100: "hsl(var(--secondary-violet-100))",
						200: "hsl(var(--secondary-violet-200))",
						300: "hsl(var(--secondary-violet-300))",
						400: "hsl(var(--secondary-violet-400))",
						500: "hsl(var(--secondary-violet-500))",
						600: "hsl(var(--secondary-violet-600))",
						700: "hsl(var(--secondary-violet-700))",
						800: "hsl(var(--secondary-violet-800))",
						900: "hsl(var(--secondary-violet-900))",
						1000: "hsl(var(--secondary-violet-1000))",
						1100: "hsl(var(--secondary-violet-1100))",
						1200: "hsl(var(--secondary-violet-1200))",
						1300: "hsl(var(--secondary-violet-1300))",
						1400: "hsl(var(--secondary-violet-1400))",
						1500: "hsl(var(--secondary-violet-1500))",
						1600: "hsl(var(--secondary-violet-1600))",
						1700: "hsl(var(--secondary-violet-1700))",
						1800: "hsl(var(--secondary-violet-1800))",
						1900: "hsl(var(--secondary-violet-1900))",
						2000: "hsl(var(--secondary-violet-2000))",
						2100: "hsl(var(--secondary-violet-2100))",
						2200: "hsl(var(--secondary-violet-2200))",
						2300: "hsl(var(--secondary-violet-2300))",
					},
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
				sidebar: {
					"DEFAULT": "hsl(var(--sidebar-background))",
					"foreground": "hsl(var(--sidebar-foreground))",
					"primary": "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					"accent": "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					"border": "hsl(var(--sidebar-border))",
					"ring": "hsl(var(--sidebar-ring))",
				},
				tertiary: {
					mint: {
						50: "hsl(var(--tertiary-mint-50))",
						100: "hsl(var(--tertiary-mint-100))",
						200: "hsl(var(--tertiary-mint-200))",
						300: "hsl(var(--tertiary-mint-300))",
						400: "hsl(var(--tertiary-mint-400))",
						500: "hsl(var(--tertiary-mint-500))",
						600: "hsl(var(--tertiary-mint-600))",
						700: "hsl(var(--tertiary-mint-700))",
						800: "hsl(var(--tertiary-mint-800))",
						900: "hsl(var(--tertiary-mint-900))",
						1000: "hsl(var(--tertiary-mint-1000))",
						1100: "hsl(var(--tertiary-mint-1100))",
						1200: "hsl(var(--tertiary-mint-1200))",
						1300: "hsl(var(--tertiary-mint-1300))",
						1400: "hsl(var(--tertiary-mint-1400))",
						1500: "hsl(var(--tertiary-mint-1500))",
						1600: "hsl(var(--tertiary-mint-1600))",
						1700: "hsl(var(--tertiary-mint-1700))",
						1800: "hsl(var(--tertiary-mint-1800))",
						1900: "hsl(var(--tertiary-mint-1900))",
						2000: "hsl(var(--tertiary-mint-2000))",
						2100: "hsl(var(--tertiary-mint-2100))",
						2200: "hsl(var(--tertiary-mint-2200))",
						2300: "hsl(var(--tertiary-mint-2300))",
					},
				},
				semantic: {
					lime: {
						50: "hsl(var(--semantic-lime-50))",
						100: "hsl(var(--semantic-lime-100))",
						200: "hsl(var(--semantic-lime-200))",
						300: "hsl(var(--semantic-lime-300))",
						400: "hsl(var(--semantic-lime-400))",
						500: "hsl(var(--semantic-lime-500))",
						600: "hsl(var(--semantic-lime-600))",
						700: "hsl(var(--semantic-lime-700))",
						800: "hsl(var(--semantic-lime-800))",
						900: "hsl(var(--semantic-lime-900))",
						1000: "hsl(var(--semantic-lime-1000))",
						1100: "hsl(var(--semantic-lime-1100))",
						1200: "hsl(var(--semantic-lime-1200))",
						1300: "hsl(var(--semantic-lime-1300))",
						1400: "hsl(var(--semantic-lime-1400))",
						1500: "hsl(var(--semantic-lime-1500))",
						1600: "hsl(var(--semantic-lime-1600))",
						1700: "hsl(var(--semantic-lime-1700))",
						1800: "hsl(var(--semantic-lime-1800))",
						1900: "hsl(var(--semantic-lime-1900))",
						2000: "hsl(var(--semantic-lime-2000))",
						2100: "hsl(var(--semantic-lime-2100))",
						2200: "hsl(var(--semantic-lime-2200))",
						2300: "hsl(var(--semantic-lime-2300))",
					},
					red: {
						50: "hsl(var(--semantic-red-50))",
						100: "hsl(var(--semantic-red-100))",
						200: "hsl(var(--semantic-red-200))",
						300: "hsl(var(--semantic-red-300))",
						400: "hsl(var(--semantic-red-400))",
						500: "hsl(var(--semantic-red-500))",
						600: "hsl(var(--semantic-red-600))",
						700: "hsl(var(--semantic-red-700))",
						800: "hsl(var(--semantic-red-800))",
						900: "hsl(var(--semantic-red-900))",
						1000: "hsl(var(--semantic-red-1000))",
						1100: "hsl(var(--semantic-red-1100))",
						1200: "hsl(var(--semantic-red-1200))",
						1300: "hsl(var(--semantic-red-1300))",
						1400: "hsl(var(--semantic-red-1400))",
						1500: "hsl(var(--semantic-red-1500))",
						1600: "hsl(var(--semantic-red-1600))",
						1700: "hsl(var(--semantic-red-1700))",
						1800: "hsl(var(--semantic-red-1800))",
						1900: "hsl(var(--semantic-red-1900))",
						2000: "hsl(var(--semantic-red-2000))",
						2100: "hsl(var(--semantic-red-2100))",
						2200: "hsl(var(--semantic-red-2200))",
						2300: "hsl(var(--semantic-red-2300))",
					},
					yellow: {
						50: "hsl(var(--semantic-yellow-50))",
						100: "hsl(var(--semantic-yellow-100))",
						200: "hsl(var(--semantic-yellow-200))",
						300: "hsl(var(--semantic-yellow-300))",
						400: "hsl(var(--semantic-yellow-400))",
						500: "hsl(var(--semantic-yellow-500))",
						600: "hsl(var(--semantic-yellow-600))",
						700: "hsl(var(--semantic-yellow-700))",
						800: "hsl(var(--semantic-yellow-800))",
						900: "hsl(var(--semantic-yellow-900))",
						1000: "hsl(var(--semantic-yellow-1000))",
						1100: "hsl(var(--semantic-yellow-1100))",
						1200: "hsl(var(--semantic-yellow-1200))",
						1300: "hsl(var(--semantic-yellow-1300))",
						1400: "hsl(var(--semantic-yellow-1400))",
						1500: "hsl(var(--semantic-yellow-1500))",
						1600: "hsl(var(--semantic-yellow-1600))",
						1700: "hsl(var(--semantic-yellow-1700))",
						1800: "hsl(var(--semantic-yellow-1800))",
						1900: "hsl(var(--semantic-yellow-1900))",
						2000: "hsl(var(--semantic-yellow-2000))",
						2100: "hsl(var(--semantic-yellow-2100))",
						2200: "hsl(var(--semantic-yellow-2200))",
						2300: "hsl(var(--semantic-yellow-2300))",
					},
				},
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [tailwindcssAnimate],
	safelist: ["-translate-x-1/3", "-translate-x-2/3"],
}
