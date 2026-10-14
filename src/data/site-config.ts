export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    eyebrow?: string;
    title?: string;
    highlight?: string;
    text?: string;
    image?: Image;
    images?: Image[];
    actions?: Link[];
    stats?: { value: string; label: string }[];
};

export type Highlight = {
    label: string;
    title: string;
    text: string;
    image?: Image;
    link?: Link;
    note?: string;
};

export type Cta = {
    title: string;
    text?: string;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    highlights?: Highlight[];
    cta?: Cta;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
    talksPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Tara Gurung',
    subtitle: 'Co-founder, Jyaba · Data Engineering · Pokhara, Nepal',
    description: 'Tara Gurung, co-founder of Jyaba, a data engineering company in Pokhara, Nepal. 12+ years in software and DevOps, TEDx speaker and tech community builder.',
    image: {
        src: '/tara-gurung.png',
        alt: 'Tara Gurung, co-founder of Jyaba, Pokhara, Nepal'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: 'https://linkedin.com/in/taragurung/'
        },
        {
            text: 'Jyaba',
            href: 'https://jyaba.com'
        },
        {
            text: 'Developers Community Pokhara',
            href: 'https://www.linkedin.com/company/developers-community-pokhara/'
        }
    ],
    hero: {
        eyebrow: '// Co-founder, Jyaba · Pokhara, Nepal',
        title: "Turning the web's product data into",
        highlight: 'decisions.',
        text: "I'm Tara Gurung, co-founder of Jyaba, a data engineering company that collects prices, catalogs and reviews from online stores and delivers clean, ready-to-use datasets. I bring 12+ years of building and running software (much of it as a DevOps engineer), and I put just as much energy into growing the tech community in Pokhara.",
        image: {
            src: '/tara-gurung.png',
            alt: 'Tara Gurung, co-founder of Jyaba, speaking at an event'
        },
        images: [
            {
                src: '/jyaba-team-early-days.png',
                alt: 'Jyaba founding team of four in the early days',
                caption: 'The early days — started with 4 on the team'
            },
            {
                src: '/jyaba-team-2026.png',
                alt: 'Jyaba team of fifteen in 2026',
                caption: 'Jyaba today — 15 people strong in 2026 and growing'
            }
        ],
        actions: [
            {
                text: 'Explore Jyaba',
                href: 'https://jyaba.com'
            },
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ],
        stats: [
            { value: '12+', label: 'Years in tech' },
            { value: 'TEDx', label: 'Chipledhunga speaker' },
            { value: 'Community builder', label: 'Developers Community Pokhara' }
        ]
    },
    highlights: [
        {
            label: 'Speaking',
            title: 'TEDx Chipledhunga',
            text: 'I shared my journey and ideas on the TEDx Chipledhunga stage. The talk video will be published soon.',
            note: 'Video coming soon'
        },
        {
            label: 'Community',
            title: 'Developers Community Pokhara',
            text: 'Building a tech community in Pokhara where developers learn, share and grow together through meetups and events.',
            image: {
                src: '/developers-community-in-pokhara.jpg',
                alt: 'Developers Community Pokhara meetup'
            },
            link: {
                text: 'Follow the community',
                href: 'https://www.linkedin.com/company/developers-community-pokhara/'
            }
        }
    ],
    cta: {
        title: 'Need reliable product data from the web?',
        text: "Whether it's daily price monitoring or a one-off catalog dataset, Jyaba handles the scraping so your team can focus on the insights. Happy to chat about data engineering, DevOps or the Pokhara tech scene too.",
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            },
            {
                text: 'Visit jyaba.com',
                href: 'https://jyaba.com'
            }
        ]
    },
    postsPerPage: 8,
    projectsPerPage: 8,
    talksPerPage: 8
};

export default siteConfig;
