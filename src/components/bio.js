import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
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
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(1 / 2),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRiht: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%',
        }}
        imgStyle={{
          borderRadius: '50%',
        }}
      />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio

