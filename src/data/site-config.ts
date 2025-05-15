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
};

const siteConfig: SiteConfig = {
    title: 'Tara Gurung',
    subtitle: 'DevOps Engineer @ Jyaba ',
    description: 'Experienced Software Engineer and DevOps Engineer with 12 years of hands-on experience in diverse technology companies. Proficient in designing and maintaining scalable infrastructure using tools and platforms such as Docker, Kubernetes, Jenkins, Terraform, and AWS. Strong background in CI/CD automation, cloud-native application deployment, and system reliability engineering..',
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
        title: 'DevOps Engineer | Data Engineering Practitioner',
        text: "I'm Tara Gurung, I do DevOps for my customers to bring change in their software engineering process. I am driven by a passion for automation, scalability, and seamless collaboration. My approach combines strategic intuition, thoughtful research, and a focus on efficiency to build resilient infrastructure and optimize workflows. I have a deep appreciation for cutting-edge technologies, robust software design, and the transformative power of DevOps culture. Connect with me on <a href='https://linkedin.com/in/taragurung'>Linkedin</a>.",
        image: {
            src: '/tara-gurung-senior-devops-engineer-nepal.PNG',
            alt: 'Tara Gurung DevOps engineer profile pic'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
