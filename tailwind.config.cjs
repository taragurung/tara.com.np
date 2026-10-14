const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
            serif: ['Newsreader', ...defaultTheme.fontFamily.serif],
            mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono]
        },
        extend: {
            colors: {
                accent: 'rgb(var(--color-accent) / <alpha-value>)'
            },
            textColor: {
                main: 'rgb(var(--color-text-main) / <alpha-value>)',
                muted: 'rgb(var(--color-text-muted) / <alpha-value>)'
            },
            backgroundColor: {
                main: 'rgb(var(--color-bg-main) / <alpha-value>)',
                muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)'
            },
            borderColor: {
                main: 'rgb(var(--color-border-main) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)'
            },
            typography: (theme) => ({
                dante: {
                    css: {
                        '--tw-prose-body': theme('textColor.main / 90%'),
                        '--tw-prose-headings': theme('textColor.main / 100%'),
                        '--tw-prose-lead': theme('textColor.main / 100%'),
                        '--tw-prose-links': theme('colors.accent / 100%'),
                        '--tw-prose-bold': theme('textColor.main / 100%'),
                        '--tw-prose-counters': theme('textColor.muted / 100%'),
                        '--tw-prose-bullets': theme('colors.accent / 100%'),
                        '--tw-prose-hr': theme('borderColor.main / 100%'),
                        '--tw-prose-quotes': theme('textColor.main / 100%'),
                        '--tw-prose-quote-borders': theme('colors.accent / 100%'),
                        '--tw-prose-captions': theme('textColor.muted / 100%'),
                        '--tw-prose-code': theme('colors.accent / 100%'),
                        '--tw-prose-pre-code': theme('colors.slate.200'),
                        '--tw-prose-pre-bg': theme('colors.slate.900'),
                        '--tw-prose-th-borders': theme('borderColor.main / 100%'),
                        '--tw-prose-td-borders': theme('borderColor.main / 100%')
                    }
                },
                DEFAULT: {
                    css: {
                        a: {
                            fontWeight: '500',
                            textDecoration: 'underline',
                            textDecorationThickness: '1px',
                            textUnderlineOffset: '3px',
                            '&:hover': {
                                textDecorationThickness: '2px'
                            }
                        },
                        'h1,h2,h3,h4,h5,h6': {
                            fontWeight: 700,
                            letterSpacing: '-0.015em'
                        },
                        pre: {
                            border: '1px solid rgb(var(--color-border-main))',
                            borderRadius: theme('borderRadius.xl')
                        },
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                        blockquote: {
                            fontStyle: 'italic',
                            fontWeight: 'normal',
                            borderLeftWidth: '3px'
                        }
                    }
                }
            })
        }
    },
    plugins: [require('@tailwindcss/typography')]
};
