module.exports = {
  siteMetadata: {
    title: 'Fair Oaks Cellars',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/util/typography.js`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#098721',
        theme_color: '#098721',
        display: 'minimal-ui',
        icon: 'src/images/FairOaksLogoTree.png',
      },
    },
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/public/pages`,
      },
    },
    'gatsby-transformer-remark',
  ],
}
