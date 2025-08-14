// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Solution Architect\'s Handbook',
  tagline: 'Build something cool with Rossum.ai and @mrtnzlml',
  favicon: 'img/128-blue-crunch.png',

  // Set the production url of your site here
  url: 'https://mrtnzlml.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/rossum-sa-handbook/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mrtnzlml', // Usually your GitHub org/user name.
  projectName: 'rossum-sa-handbook', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // plugins: [['@docusaurus/plugin-client-redirects', redirectsConfig]],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Will be passed to @docusaurus/plugin-content-docs (false to disable)
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/mrtnzlml/rossum-sa-handbook/tree/master/',
        },
        blog: {
          // Will be passed to @docusaurus/plugin-content-blog (false to disable)
          path: 'cookbook',
          routeBasePath: 'cookbook',
          blogTitle: 'Cookbook',
          blogDescription: 'Cookbook',
          blogSidebarCount: 0,
          showReadingTime: false,
        },
        theme: {
          // Will be passed to @docusaurus/theme-classic.
          customCss: './src/css/custom.css',
        },
        gtag: {
          // Will be passed to @docusaurus/plugin-google-gtag (only enabled when explicitly specified)
          trackingID: 'G-2DBTH3BGYK',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og_image.png',
      navbar: {
        title: 'The Solution Architect\'s Handbook',
        logo: {
          alt: 'Rossum.ai Logo',
          src: 'img/128-blue-crunch.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'learnSidebar',
            position: 'left',
            label: 'Learn',
          },

          // See: http://localhost:3000/docs/docusaurus/intro
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'docusaurusSidebar',
          //   position: 'left',
          //   label: 'Docusaurus',
          // },

          // http://localhost:3000/blog
          {
            to: '/cookbook',
            label: 'Cookbook',
            position: 'left',
          },

          {
            href: 'https://elis.rossum.ai/api/docs/',
            label: 'API',
            position: 'right',
          },
          {
            href: 'https://rossum.ai/',
            label: 'Rossum.ai',
            position: 'right',
          },
          {
            href: 'https://status.rossum.ai/',
            label: 'Status page',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Integrations',
          //   items: [
          //     {
          //       label: 'NetSuite',
          //       to: '/docs/category/netsuite',
          //     },
          //   ],
          // },
          // {
          //   title: 'Extensions',
          //   items: [
          //     {
          //       label: 'Master Data Hub',
          //       to: '/docs/category/master-data-hub',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/rossumai/university',
          //     },
          //   ],
          // },
        ],
        copyright: `By @mrtnzlml with ❤️`,
      },
      announcementBar: {
        content: 'Looking for an official documentation of the Rossum.ai platform? Try this: <a href="https://knowledge-base.rossum.ai/">https://knowledge-base.rossum.ai/</a>',
        backgroundColor: '#e6a700',
        isCloseable: false,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'python'],
      },
      algolia: {
        // See: https://docusaurus.io/docs/search#using-algolia-docsearch
        appId: 'KUCN9RVGHJ',
        apiKey: '6e2abd4bca7442bb8e7bce44cee801ec', // Public API key: it is safe to commit it
        indexName: 'rossum-university',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search',
        insights: false,
      },
    }),
};

export default config;
