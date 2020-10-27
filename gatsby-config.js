module.exports = {
	siteMetadata: {
		title: "Andrea Diotallevi | Software Developer",
		author: "Andrea Diotallevi"
	},
	plugins: [
		"gatsby-plugin-sass",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "src",
				path: `${__dirname}/src/`,
			}
		},
		"gatsby-plugin-sharp",
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
