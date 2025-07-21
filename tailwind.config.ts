// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                humae: {
                    violet: '#6A4087',
                    orange: '#F18F01',
                    'gris-texte': '#4A4A4A',
                },
                background: 'var(--background)', // #1A1A1A
                foreground: 'var(--foreground)', // #FFFFFF
            },
        },
    },
    plugins: [],
};
export default config;