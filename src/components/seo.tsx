import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type SeoProps = {
  title: string
  lang?: string
  meta?: {
    name: string;
    content: any;
    property?: undefined;
  } | {
    property: string;
    content: any;
    name?: undefined;
  }[]
  description?: string
}

type Site = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: {
        name: string
        summary: string
      }
      social: {
        twitter: string
      }
    }
  }
}

const SEO = ({ description, lang = 'ja', meta = [], title }: SeoProps) => {
  const { site }: Site = useStaticQuery(
    graphql`
      query Site {
        site {
          siteMetadata {
            title
            description
            author {
              name
              summary
            }
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author.name,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
