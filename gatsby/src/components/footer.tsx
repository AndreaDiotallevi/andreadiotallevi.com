import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import * as footerStyles from "./footer.module.scss"

const Footer = () => {
    const data = useStaticQuery(query)

    return (
        <footer className={footerStyles.footer}>
            <p>© 2023, {data.site.siteMetadata.author}</p>
            <ul>
                <li>
                    <a
                        href={`https://twitter.com/${data.site.siteMetadata.twitterUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <span>Twitter</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            viewBox="0 0 28 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M27.946 3.33a11.667 11.667 0 01-3.296.904 5.784 5.784 0 002.524-3.176 11.857 11.857 0 01-3.648 1.381 5.74 5.74 0 00-9.93 3.918c0 .455.053.892.149 1.311-4.772-.225-9.001-2.517-11.832-5.98a5.626 5.626 0 00-.777 2.887A5.74 5.74 0 003.69 9.354a5.722 5.722 0 01-2.6-.719v.071a5.743 5.743 0 004.604 5.632 5.829 5.829 0 01-2.58.099 5.76 5.76 0 005.371 3.987 11.513 11.513 0 01-7.119 2.455c-.455 0-.909-.027-1.365-.078a16.327 16.327 0 008.816 2.577c10.563 0 16.333-8.745 16.333-16.317 0-.244 0-.49-.018-.735 1.121-.804 2.1-1.82 2.87-2.972l-.055-.024z" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href={`https://github.com/AndreaDiotallevi/andreadiotallevi.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Github"
                    >
                        <span>Github</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            viewBox="0 0 98 96"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href={`https://www.linkedin.com/in/andrea-diotallevi/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Linkedin"
                    >
                        <span>Linkedin</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer

const query = graphql`
    query {
        site {
            siteMetadata {
                author
                twitterUsername
            }
        }
    }
`
