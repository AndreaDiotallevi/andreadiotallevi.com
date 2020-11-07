module.exports = {
	siteMetadata: {
		title: "Andrea Diotallevi | Software Developer",
		author: "Andrea Diotallevi",
		description: "Andrea Diotallevi's personal website",
		url: "https://www.andreadiotallevi.com",
		image: "/images/andrea-diotallevi.jpg",
		twitterUsername: "@a_diotallevi_"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sass",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "src",
				path: `${__dirname}/src/`,
			}
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					"gatsby-remark-relative-images",
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 750,
							linkImagesToOriginal: false
						}
					}
				]
			}
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [
					'lora',
				],
				display: 'swap'
			}
		}
	]
}
