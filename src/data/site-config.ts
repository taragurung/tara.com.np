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
    title?: string;
    text?: string;
    image?: Image;
    images?: Image[];
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
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
    talksPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Tara Gurung',
    subtitle: 'Co-Founder & CEO @ Jyaba — DevOps Engineer, Building Scalable Data Solutions',
    description: 'I help teams solve software engineering challenges by automating processes, improving scalability, and making collaboration seamless—so everything runs smoother and everyone’s happier. I do this through smart planning, efficient systems, and a focus on what works. I am a DevOps engineer.',
    image: {
        src: '/tara-gurung-senior-devops-engineer-nepal.PNG',
        alt: 'DevOps Engineer in Pokhara, Nepal'
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
            text: 'Linkedin',
            href: 'https://linkedin.com/in/taragurung/'
        },
    ],
    hero: {
        title: 'Co-Founder, CEO @ Jyaba | DevOps Engineer | Building Scalable Data Solutions',
        text: "I'm Tara Gurung. I started out as a software developer, and once I discovered DevOps, I never looked back. Over the years I've worked across infrastructure automation, CI/CD pipelines, cloud networking, and observability. Getting involved in Nepal's tech community turned out to be one of the best decisions I made: it's where I met my co-founder, and together we built Jyaba from scratch, where I now lead DevOps and data engineering work that helps teams ship faster and scale with confidence. I care as much about the culture side of DevOps as the tooling: breaking down silos, building ownership, and helping teams collaborate better. It was a humble beginning: just the four of us figuring things out together. In 2026, that team has grown to 15 people, and we're still building. Connect with me on [Linkedin](https://linkedin.com/in/taragurung).",
        image: {
            src: '/tara-gurung-senior-devops-engineer-nepal.PNG',
            alt: 'Tara Gurung DevOps engineer profile pic'
        },
        images: [
            {
                src: '/jyaba-team-early-days.png',
                alt: 'Jyaba founding team of four in the early days',
                caption: 'The early days — just the four of us'
            },
            {
                src: '/jyaba-team-2026.png',
                alt: 'Jyaba team of fifteen in 2026',
                caption: 'Jyaba today — 15 people strong in 2026'
            }
        ],
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    postsPerPage: 8,
    projectsPerPage: 8,
    talksPerPage: 8
};

export default siteConfig;
