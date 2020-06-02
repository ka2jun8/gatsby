import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { SeoQuery } from "../types/graphqlTypes"

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

const SEO = ({ description, lang = 'ja', meta = [], title }: SeoProps) => {
  const { site }: SeoQuery = useStaticQuery(seoQuery)

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

const seoQuery = graphql`
  query Seo {
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

export default SEO
