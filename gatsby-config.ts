import type { GatsbyConfig } from "gatsby"
import path from "path"

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Andrea Diotallevi | Software Developer`,
        author: `Andrea Diotallevi`,
        description: `Andrea Diotallevi's personal website`,
        siteUrl: `https://www.andreadiotallevi.com`,
        image: `/andrea-diotallevi.jpg`,
        twitterUsername: `@a_diotallevi_`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: path.resolve("src"),
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-relative-images`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            noInlineHighlight: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false,
                        },
                    },
                    {
                        resolve: "gatsby-remark-external-links",
                        // options: {
                        //   target: "_blank",
                        //   rel: "nofollow"
                        // }
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    process.env.GA_TRACKING_ID,
                    process.env.GA4_TRACKING_ID,
                ],
                pluginConfig: {
                    head: true,
                },
            },
        },
        {
            resolve: `gatsby-plugin-mailchimp`,
            options: {
                endpoint:
                    "https://andreadiotallevi.us7.list-manage.com/subscribe/post?u=7c92ef9d4158e1b488e3c25bf&amp;id=ab152c5061",
                timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
            },
        },
    ],
}

export default config
